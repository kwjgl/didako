// 디다코 공동체의 Supabase 로그인과 서버 함수 부르기(코이데 app/sb.js를 본떴다). 앱에는 비밀 키를 넣지 않는다.
// 로그인은 디다코 노트와 같은 세션 자리(didako-note-sb)를 함께 쓴다. 노트에서 로그인했으면 공동체에서 다시 로그인하지 않는다.
// 노트의 다른 열쇠(didako-note-sbh, didako-note-sb-go)는 읽지도 쓰지도 않는다.
window.DidakoSb = (() => {
  const C = window.DIDAKO_CONFIG || {};
  const base = () => String(C.SUPABASE_URL || '').replace(/\/+$/, '');
  const ready = () => !!(C.SUPABASE_URL && C.SUPABASE_KEY);
  const BACK = ['code', 'state', 'error', 'error_code', 'error_description'];   // 로그인에서 돌아올 때 주소에 붙는 칸
  let client = null, pending = null, backErr = '';
  const fail = (code, message) => ({ code, message });
  // 로그인에서 돌아온 주소에 오류가 있었는지(취소 등). 주소를 지우기 전에 읽어 둔다
  (() => {
    const q = new URLSearchParams(location.search), h = new URLSearchParams(location.hash.replace(/^#/, ''));
    const e = q.get('error_code') || q.get('error') || h.get('error_code') || h.get('error') || '';
    if (e) backErr = /access_denied|cancel/i.test(e) ? 'cancel' : 'fail';
  })();
  // 주소에서 로그인 칸(code·state·error…)만 지운다. ?join=…처럼 다른 칸은 남긴다
  function cleanUrl() {
    const q = new URLSearchParams(location.search);
    if (!BACK.some(k => q.has(k))) return;
    BACK.forEach(k => q.delete(k));
    const qs = q.toString();
    history.replaceState(null, '', location.pathname + (qs ? '?' + qs : '') + location.hash);
  }
  async function instance() {
    if (client) return client;
    if (!ready()) throw fail('net', '로그인 설정이 없어요.');
    if (!pending) pending = new Promise((resolve, reject) => {
      const boot = () => {
        try {
          client = window.supabase.createClient(base(), C.SUPABASE_KEY, {
            auth: { flowType: 'pkce', detectSessionInUrl: true, persistSession: true, autoRefreshToken: true, storageKey: 'didako-note-sb' }
          });
          resolve(client);
        } catch (e) { pending = null; reject(fail('net', '로그인 도구를 불러오지 못했어요.')); }
      };
      if (window.supabase && window.supabase.createClient) return boot();
      // supabase-js는 노트의 것을 함께 쓴다(새로 복사하지 않는다)
      const s = document.createElement('script'); s.src = '../note/vendor/supabase.js'; s.onload = boot;
      s.onerror = () => { pending = null; reject(fail('net', '로그인 도구를 불러오지 못했어요. 인터넷을 확인해 주세요.')); };
      document.head.appendChild(s);
    });
    return pending;
  }
  // 지금 로그인된 세션(없으면 null). 네트워크가 막혀 못 읽은 것은 net 오류로 알린다
  async function session() {
    let r;
    try { r = await (await instance()).auth.getSession(); }
    catch (e) { cleanUrl(); if (e && e.code) throw e; throw fail('net', '서버가 답하지 않아요. 잠시 뒤 다시 해 주세요.'); }
    cleanUrl();
    if (r.error && /Retryable|fetch/i.test((r.error.name || '') + (r.error.message || '')))
      throw fail('net', '서버가 답하지 않아요. 잠시 뒤 다시 해 주세요.');
    return r.data && r.data.session || null;
  }
  // 서버 함수 부르기. 오류 모양은 {code: 'login'|'bad'|'busy'|'net', message}
  async function rpc(name, args = {}) {
    const s = await session();
    if (!s) throw fail('login', '로그인이 필요해요.');
    const ctl = new AbortController(), stop = setTimeout(() => ctl.abort(), 60000);
    let res, body;
    try {
      res = await fetch(base() + '/rest/v1/rpc/' + encodeURIComponent(name), {
        method: 'POST', signal: ctl.signal,
        headers: { apikey: C.SUPABASE_KEY, Authorization: 'Bearer ' + s.access_token, 'Content-Type': 'application/json' },
        body: JSON.stringify(args || {})
      });
    } catch (e) { throw fail('net', '서버가 답하지 않아요. 잠시 뒤 다시 해 주세요.'); }
    finally { clearTimeout(stop); }
    try { const t = await res.text(); body = t ? JSON.parse(t) : null; } catch (e) { body = null; }
    if (res.status === 401 || res.status === 403 || (body && (String(body.code) === '28000' || body.message === 'login')))
      throw fail('login', '로그인이 필요해요.');
    const m = body && typeof body.message === 'string' && /^(bad|busy): ([\s\S]*)$/.exec(body.message);
    if (m) throw fail(m[1], m[2]);
    if (!res.ok) throw fail('bad', '서버가 받지 못했어요. 잠시 뒤 다시 해 주세요.');
    return body;
  }
  // 로그인 단추에 보일 공급자: Supabase에서 켜 둔 것만. 못 읽으면 카카오만
  async function providers() {
    try {
      const ctl = new AbortController(), stop = setTimeout(() => ctl.abort(), 6000);
      let res;
      try { res = await fetch(base() + '/auth/v1/settings', { headers: { apikey: C.SUPABASE_KEY }, signal: ctl.signal }); }
      finally { clearTimeout(stop); }
      const r = await res.json(), e = r && r.external || {};
      const list = ['kakao', 'google', 'apple'].filter(k => e[k]);
      return list.length ? list : ['kakao'];
    } catch (e) { return ['kakao']; }
  }
  // 로그인 화면으로 보내기. 돌아오는 주소는 지금 주소에서 로그인 칸만 뺀 것(?join=…은 남는다)
  async function oauth(provider) {
    if (!['kakao', 'google', 'apple'].includes(provider)) throw fail('bad', '로그인 방법을 고를 수 없어요.');
    const q = new URLSearchParams(location.search);
    BACK.forEach(k => q.delete(k));
    const qs = q.toString();
    const dest = location.origin + location.pathname + (qs ? '?' + qs : '');
    const r = await (await instance()).auth.signInWithOAuth({ provider, options: { redirectTo: dest } });
    if (r.error) throw fail('bad', '로그인 화면을 열지 못했어요.');
  }
  async function signOut() {
    try { await (await instance()).auth.signOut(); } catch (e) { /* 이 기기의 세션만 지우면 된다 */ }
    try { localStorage.removeItem('didako-note-sb'); } catch (e) { /* 저장소를 못 쓰면 그대로 */ }
  }
  // 사용자 id를 그대로 기기에 두지 않고 SHA-256 앞 16자만 쓴다(노트의 sbHash와 같다)
  async function hash(id) {
    const d = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(String(id)));
    return [...new Uint8Array(d)].map(x => x.toString(16).padStart(2, '0')).join('').slice(0, 16);
  }
  // 로그인에서 돌아올 때 오류가 있었으면 'cancel'(취소) · 'fail'(그 밖), 없으면 ''. 한 번 읽으면 비운다
  function returnError() { const e = backErr; backErr = ''; return e; }
  const logos = {
    kakao: '<svg viewBox="0 0 18 18" width="18" height="18" aria-hidden="true"><path fill="currentColor" d="M9 2.2c-4.1 0-7.4 2.6-7.4 5.8 0 2.1 1.4 3.9 3.5 4.9l-.8 2.9c-.1.3.2.5.4.3l3.4-2.3h.9c4.1 0 7.4-2.6 7.4-5.8S13.1 2.2 9 2.2z"/></svg>',
    google: '<svg viewBox="0 0 48 48" aria-hidden="true"><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/><path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/></svg>',
    apple: '<svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor"><path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"/></svg>'
  };
  return { ready, session, rpc, providers, oauth, signOut, hash, returnError, logos };
})();
