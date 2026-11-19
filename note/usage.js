// 디다코 사용 기록 보내기: 노트(note/)·공동체(community/)·교회(app/)가 함께 쓰는 작은 부품. 공동체와 교회는 ../note/usage.js로 읽는다(places.js·guide.js와 같다).
// 코이데 app/index.html의 track()과 church-api.js의 usage 보내기를 본떴다. 보내는 곳은 코이데와 함께 쓰는 Supabase 사용 기록(usage_event, app = 'didako')이고,
// 서버가 받는 이름은 supabase/016_didako_usage.sql이 등록한 27개뿐이다(NAMES가 같은 목록이다. 모르는 이름은 앱이 먼저 버린다).
//
// 보내는 때는 셋이 모두 맞을 때뿐이다(active):
//   ① 새 길(Supabase)로 로그인해 있다 — 앱이 init의 ok()로 알려 준다(노트 sbMode, 공동체 SB, 교회 CHURCH_ON). 예전 길(Apps Script)·데모·따라 하기(?tutorial)·?demo에서는 거짓이다.
//   ② 앱 설정 "이용 통계 보내기"가 켜져 있다(키 didako-usage-off가 '1'이 아니다). 세 앱이 같은 키를 쓴다. 끄면 모아 둔 줄도 지운다.
//   ③ 서버 스위치(koide_setting 'usage_track')가 'on'이다 — 서버가 정한다. 꺼져 있으면 서버가 아무것도 저장하지 않는다.
// 사건에 담는 것은 행동 이름, 일이 일어난 시각(휴대폰 시계), 숫자 하나(날 수), 기기 폭, 홈 화면 앱 여부, 앱 판뿐이다.
// 글·이름·교회·사랑방·교재 이름은 어느 칸에도 넣지 않는다(이 파일에는 그런 값을 받는 자리가 없다). 숫자는 0~86400 사이 정수일 때만 싣는다.
// 기기에는 아직 못 보낸 사건 줄(didako-usage-q, 상한 200개)과 "처음 한 번만" 표시를 위한 키(didako-usage-seen)만 둔다. 과 번호 같은 값이 들어 있어도 이 기기 밖으로는 나가지 않는다.
// 한 기기를 여러 계정이 쓸 수 있어서, 사건 줄과 표시에는 로그인한 계정의 해시(w, 앱의 who())를 함께 적어 둔다. 보낼 때는 지금 로그인한 계정의 줄만 보내고 다른 계정의 줄은 지운다(서버에는 해시가 가지 않는다).
window.DidakoUsage = (() => {
  const OFF = 'didako-usage-off', QK = 'didako-usage-q', SEEN = 'didako-usage-seen', LOCK = 'didako-usage-lock';
  const NAMES = new Set(['note.open', 'note.answer', 'note.view-past', 'note.view-journal', 'note.view-answers']);
  ['cm', 'church'].forEach(p => ['open', 'first-before', 'first-after', 'keep-before', 'keep-after', 'keep-sentence', 'keep-action', 'reflect', 'record-again', 'view-month', 'view-year']
    .forEach(s => NAMES.add(p + '.' + s)));
  const KEEP = 200, BATCH = 50;   // 쌓아 두는 상한 · 한 번에 보내는 수(서버 한도)
  let cfg = null, busy = false, failAt = 0, timer = 0, ver = '', bound = false;
  const get = k => { try { return localStorage.getItem(k); } catch (e) { return null; } };
  const put = (k, v) => { try { localStorage.setItem(k, v); return true; } catch (e) { return false; } };
  const del = k => { try { localStorage.removeItem(k); } catch (e) { /* 없는 것으로 본다 */ } };
  const readJson = (k, d) => { try { const v = JSON.parse(get(k) || 'null'); return v && typeof v === 'object' ? v : d; } catch (e) { return d; } };
  const off = () => get(OFF) === '1';
  const pad = n => String(n).padStart(2, '0');
  const today = () => { const d = new Date(); return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()); };
  // 보낼 수 있는 때(위 ①②). 앱이 준 ok()가 던져도 거짓으로 본다
  function active() { try { return !!cfg && !off() && !!cfg.ok(); } catch (e) { return false; } }
  const readQ = () => { const v = readJson(QK, []); return Array.isArray(v) ? v : []; };
  const writeQ = q => (q.length ? put(QK, JSON.stringify(q.slice(-KEEP))) : (del(QK), true));
  function clear() { del(QK); }   // 끄기 스위치를 끌 때 앱이 부른다
  const me = () => { try { return String(cfg.who() || ''); } catch (e) { return ''; } };
  // 이 기기에서 이 계정이 이미 한 일인지(처음 한 번만, 하루 한 번만). 했으면 true, 안 했으면 표시하고 false
  function seen(key) {
    key = me() + '|' + key;
    const m = readJson(SEEN, {});
    if (m[key]) return true;
    m[key] = 1;
    const ks = Object.keys(m);
    if (ks.length > 400) ks.slice(0, 100).forEach(k => { delete m[k]; });
    put(SEEN, JSON.stringify(m));
    return false;
  }
  // 날 수: 오늘에서 그 날짜를 뺀 값(달력 날짜로 센다. 그 날보다 앞이면 음수). v는 'YYYY-MM-DD' 또는 '11월 12일 주일' 같은 글(해가 없으면 오늘에 가장 가까운 해로 본다). 못 읽으면 null
  function dayDiff(v) {
    const s = String(v == null ? '' : v), now = new Date(), t0 = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());
    const days = (y, m, d) => Math.round((t0 - Date.UTC(y, m - 1, d)) / 864e5);
    let r = /^(\d{4})-(\d{2})-(\d{2})/.exec(s);
    if (r) return +r[2] >= 1 && +r[2] <= 12 && +r[3] >= 1 && +r[3] <= 31 ? days(+r[1], +r[2], +r[3]) : null;
    r = /(\d{1,2})월\s*(\d{1,2})일/.exec(s);
    if (!r || +r[1] < 1 || +r[1] > 12 || +r[2] < 1 || +r[2] > 31) return null;
    let best = null;
    [now.getFullYear() - 1, now.getFullYear(), now.getFullYear() + 1].forEach(y => { const x = days(y, +r[1], +r[2]); if (best === null || Math.abs(x) < Math.abs(best)) best = x; });
    return best;
  }
  // 사건 하나를 모아 둔다. name은 접두사 없는 이름('open'), o = { n: 날 수, once: '이 기기에서 처음 한 번만' 표시, daily: '하루 한 번만' 표시 }. 모아 두었으면 true
  function track(name, o) {
    o = o || {};
    if (!active() || !me()) return false;
    const ev = cfg.prefix + '.' + name;
    if (!NAMES.has(ev)) return false;
    if (o.once && seen(cfg.prefix + '|' + o.once)) return false;
    if (o.daily && seen(cfg.prefix + '|' + o.daily + '|' + today())) return false;
    const x = { ev, at: new Date().toISOString(), w: me() };
    if (o.n != null) { const v = Math.round(Number(o.n)); if (isFinite(v) && v >= 0 && v <= 86400) x.n = v; }
    const q = readQ(); q.push(x);
    if (!writeQ(q)) return false;   // 저장소를 못 쓰면 앱은 그대로, 기록만 건너뛴다
    later(q.length >= 20 ? 300 : 8000);
    return true;
  }
  const open = () => track('open', { daily: 'open' });   // 앱 열기: 하루 한 번
  // 모임 날 기준 사건: base는 'first'(과를 처음 연 때)나 'keep'(기록을 처음 남긴 때), date는 모임 날(과의 날짜). 모임 날 전이면 -before(n = 남은 날 수), 당일이거나 뒤면 -after(n = 지난 날 수, 당일 0).
  // key(과 하나를 가리키는 값)당 처음 한 번만 모은다. 날짜를 못 읽으면 모으지 않는다
  function timed(base, date, key) {
    if (!active() || !me()) return false;
    const d = dayDiff(date);
    if (d === null || seen(cfg.prefix + '|' + base + ':' + key)) return false;
    return track(d < 0 ? base + '-before' : base + '-after', { n: Math.abs(d) });
  }
  function later(ms) { clearTimeout(timer); timer = setTimeout(flush, ms); }
  function build(part) {
    const w = window.innerWidth || 0, device = w < 640 ? 'phone' : w < 1024 ? 'tablet' : 'pc';
    const standalone = !!((window.matchMedia && matchMedia('(display-mode: standalone)').matches) || navigator.standalone === true);
    return part.map(x => { const o = { app: 'didako', ev: x.ev, device, standalone, client_at: x.at }; if (ver) o.ver = ver; if (x.n != null) o.n = x.n; return o; });
  }
  // 모아 둔 것을 묶어서 보낸다. 서버가 받았을 때만 보낸 만큼 지운다. 못 받으면(네트워크·로그인 풀림) 다음에 다시 보낸다(1분 쉰다)
  async function flush() {
    clearTimeout(timer);
    if (busy || !cfg) return;
    if (off()) { clear(); return; }
    if (!active() || Date.now() - failAt < 60000) return;
    if (Date.now() - Number(get(LOCK) || 0) < 20000) return;   // 다른 창이 보내는 중이면 겹치지 않게 쉰다
    const w = me(); if (!w) return;
    let q = readQ();
    if (q.some(x => x.w !== w)) { q = q.filter(x => x.w === w); writeQ(q); }   // 다른 계정이 모아 둔 줄은 이 계정으로 보내지 않고 지운다
    if (!q.length) return;
    const part = q.slice(0, BATCH);
    busy = true; put(LOCK, String(Date.now()));
    try {
      await cfg.rpc('usage_track', { events: build(part) });
      writeQ(readQ().filter(x => x.w === w).slice(part.length)); failAt = 0;
    } catch (e) {
      if (e && e.code === 'bad') writeQ(readQ().filter(x => x.w === w).slice(part.length));   // 서버가 모양이 틀렸다고 하면 다시 보내도 같다
      else failAt = Date.now();
    }
    del(LOCK); busy = false;
    if (!failAt && readQ().length) later(500);
  }
  // 앱 판: 이 앱의 서비스워커 사본 이름(예: didako-cm-v63 → cm-v63). 못 읽으면 빈 칸
  function findVer(prefix) {
    try { caches.keys().then(ks => { const k = ks.filter(x => x.startsWith(prefix)).sort().pop(); if (k) ver = k.replace(/^didako-/, '').slice(0, 20); }).catch(() => {}); } catch (e) { /* 판은 비워 둔다 */ }
  }
  // 앱이 시작할 때 한 번: { prefix: 'note' | 'cm' | 'church', cache: 서비스워커 사본 이름 앞부분, ok: () => 보낼 수 있는 로그인 상태인가, who: () => 로그인한 계정의 해시, rpc: (함수 이름, 값) => 서버 부르기 }
  function init(o) {
    cfg = o; findVer(o.cache || '');
    if (bound) return; bound = true;
    document.addEventListener('visibilitychange', () => { if (document.hidden) flush(); });
    window.addEventListener('online', () => { failAt = 0; later(1000); });
    later(3000);   // 지난번에 못 보낸 것이 있으면 켜진 뒤 조금 있다 보낸다
  }
  return { init, track, open, timed, dayDiff, flush, clear };
})();
