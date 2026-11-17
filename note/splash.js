// ① 따라 하기 연습은 화면 없이 바로 시작한다. 시작 화면을 그리기 전에 <body> 첫머리에서 불러온다.
// ② 새 창으로 노트를 켜면 마지막으로 쓴 공동체·교회에 바로 간다. 초대·로그인 등 특별한 주소는 그대로 둔다.
// ③ 이 창에서 보던 곳에 따라 시작(main)·전환(switch)·조용히(quiet)를 고른다. 관리 화면은 조용히 둔다.
// ④ 노트 첫 시작은 세 겹 책갈피가 엮이고(2초), 전환은 종이 위 책갈피 또는 세 겹 끈(1.5초)이다. 움직임 줄이기는 0.6초다.
// ⑤ hide()는 첫 화면이 다 그려진 뒤 닫고, didakoPlace.used/going은 곳 이름과 공동체 id만 기억한다. 개인 기록은 담지 않는다.
(() => {
  const me = document.currentScript;
  const requested = me && me.dataset.place;
  const place = ['note', 'community', 'church'].includes(requested) ? requested : 'note';
  const demo = new URLSearchParams(location.search).has('demo');
  const prefix = demo ? 'didako-demo-' : 'didako-';
  const validId = id => typeof id === 'string' && /^[\w-]{1,64}$/.test(id);
  const readLocal = key => { try { return localStorage.getItem(key); } catch (e) { return null; } };
  const writeLocal = (key, value) => { try { localStorage.setItem(key, value); } catch (e) { /* 기억하지 못해도 화면은 연다 */ } };
  const readPlace = () => { try { return sessionStorage.getItem('didako-place'); } catch (e) { return null; } };
  const writePlace = value => { try { sessionStorage.setItem('didako-place', value); } catch (e) { /* 이 창에서만 기억한다 */ } };
  const unboot = () => document.documentElement.classList.remove('booting');
  window.didakoPlace = {
    used(value, id) {
      if (!['note', 'community', 'church'].includes(value)) return;
      writeLocal(prefix + 'last-place', value);
      if (value === 'community' && validId(id)) writeLocal(prefix + 'last-circle', id);
    },
    going(value) { if (['note', 'community', 'church'].includes(value)) writePlace(value); }
  };
  if (new URLSearchParams(location.search).has('tutorial')) {
    unboot(); window.didakoSplash = { hide() {} }; window.didakoPlace = { used() {}, going() {} }; return;
  }
  const prev = readPlace();
  // 세 앱의 함께하는 곳 링크는 그대로 둔다. 데모 안에서 링크가 ?demo를 생략해도
  // 같은 출처의 앞 화면이 데모였다면 데모 주소를 이어받는다(개인 기록은 건드리지 않는다).
  if (!demo && location.search === '' && prev && prev !== place) {
    let fromDemo = false;
    try {
      const from = new URL(document.referrer), here = new URL(location.href);
      fromDemo = from.origin === here.origin && from.searchParams.has('demo') &&
        /\/(?:note|community|app)\/(?:index\.html)?$/.test(from.pathname);
    } catch (e) { /* 앞 주소가 없으면 일반 주소 그대로 연다 */ }
    if (fromDemo) {
      try { location.replace(location.pathname + '?demo' + location.hash); return; }
      catch (e) { /* 이동할 수 없으면 이 주소로 연다 */ }
    }
  }
  if (!prev && place === 'note' && (location.search === '' || location.search === '?demo') &&
      (location.hash === '' || location.hash === '#/today')) {
    const last = readLocal(prefix + 'last-place'), id = readLocal(prefix + 'last-circle');
    const cmLogin = !!(readLocal('didako-cm-sbh') || readLocal('didako-note-sb'));
    const churchLogin = !!(readLocal('didako-token') && readLocal('didako-church-url'));
    let to = '';
    if (last === 'community' && validId(id) && (demo || cmLogin))
      to = '../community/' + (demo ? '?demo&c=' : '?c=') + encodeURIComponent(id);
    else if (last === 'church' && (demo || churchLogin)) to = '../app/' + (demo ? '?demo' : '');
    if (to) { try { location.replace(to); return; } catch (e) { /* 열 수 없으면 노트로 */ } }
  }
  let mode = !prev ? 'main' : prev === place ? 'quiet' : 'switch';
  if (place === 'church' && (location.hash.startsWith('#admin') || location.hash.startsWith('#church-admin'))) mode = 'quiet';
  writePlace(place);
  if (mode === 'quiet') { unboot(); window.didakoSplash = { hide() {} }; return; }
  const css = `.splash { position: fixed; inset: 0; z-index: 60; background: var(--page); display: flex; flex-direction: column; align-items: center; justify-content: center; gap: .5em; padding: 24px; text-align: center; transition: opacity .25s ease-out; }
.splash.out { opacity: 0; pointer-events: none; }
.splash-mark { width: 88px; height: 88px; border-radius: 50%; background: var(--accent); display: grid; place-items: center; margin-bottom: .4em; }
.splash-mark svg { width: 56px; height: 56px; overflow: visible; --s1: var(--on-accent); --s2: color-mix(in srgb, var(--on-accent) 72%, var(--accent)); --s3: color-mix(in srgb, var(--on-accent) 48%, var(--accent)); }
.splash-name { margin: 0; font-family: var(--f-display); font-size: 1.6em; font-weight: 700; color: var(--ink); }
.splash-sub { margin: 0; color: var(--ink-2); font-size: .9em; }
.lg-ring, .lg-cord { stroke-dasharray: 1; animation: lg-draw .38s cubic-bezier(.4, 0, .2, 1) both; }
.lg-ring { animation-delay: .1s; }
.lg-cord { animation-duration: .2s; animation-delay: .44s; }
@keyframes lg-draw { 0% { stroke-dashoffset: 1; opacity: 0; } 1% { opacity: 1; } 100% { stroke-dashoffset: 0; opacity: 1; } }
.lg-band { transform-box: fill-box; transform-origin: top; animation: lg-drop .46s cubic-bezier(.2, .7, .3, 1) both; }
.lg-band.b1 { animation-delay: .62s; } .lg-band.b2 { animation-delay: .74s; } .lg-band.b3 { animation-delay: .86s; }
@keyframes lg-drop { from { transform: scaleY(0); } to { transform: none; } }
.lg-sep { animation: lg-fade .2s ease-out 1.2s both; }
@keyframes lg-fade { from { opacity: 0; } to { opacity: 1; } }
.sp-in { animation: sp-in .45s cubic-bezier(.2, .7, .3, 1) both; }
.sp-in.d1 { animation-delay: 1s; } .sp-in.d2 { animation-delay: 1.12s; }
@keyframes sp-in { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: none; } }
@media (prefers-reduced-motion: reduce) { .splash { transition: none; } .lg-ring, .lg-cord, .lg-band, .lg-sep, .sp-in { animation: none; } }
.sw-in { animation: sp-in .45s cubic-bezier(.2, .7, .3, 1) both; }
.sw-in.d1 { animation-delay: .12s; } .sw-in.d2 { animation-delay: .22s; }
.sw-note { width: 76px; height: 92px; border-radius: 12px; border: 2px solid var(--line-strong); background: var(--surface); display: grid; place-items: center; margin-bottom: .4em; position: relative; }
.sw-note::before, .sw-note::after { content: ''; position: absolute; left: 14px; right: 14px; height: 6px; border-radius: 3px; background: var(--surface-2); }
.sw-note::before { bottom: 22px; } .sw-note::after { bottom: 12px; right: 30px; }
.sw-note svg { width: 34px; height: 34px; margin-bottom: 18px; }
.sw-cord { position: relative; width: 240px; max-width: 100%; height: 64px; margin-bottom: .4em; }
.sw-cord svg { position: absolute; inset: 0; width: 100%; height: 100%; overflow: visible; fill: none; stroke-linecap: round; stroke-linejoin: round; animation: sw-wipe .9s cubic-bezier(.4, 0, .2, 1) both; }
.sw-name { margin: 0; font-family: var(--f-display); font-size: 1.6em; font-weight: 700; color: var(--ink); animation: sw-in .45s cubic-bezier(.2, .7, .3, 1) .12s both; }
.sw-sub { margin: 0; color: var(--ink-2); font-size: .9em; animation: sw-in .45s cubic-bezier(.2, .7, .3, 1) .22s both; }
@keyframes sw-wipe { from { clip-path: inset(-10px 100% -10px -10px); } to { clip-path: inset(-10px); } }
@keyframes sw-in { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: none; } }
@media (prefers-reduced-motion: reduce) { .sw-in, .sw-cord svg, .sw-name, .sw-sub { animation: none; } }`;
  const st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);
  const mark = `<svg viewBox="0 0 16 16"><g fill="none">
    <circle class="lg-ring" pathLength="1" cx="8" cy="2.6" r="1.5" stroke="var(--s1)" stroke-width="1.4" transform="rotate(90 8 2.6)"/>
    <path class="lg-cord" pathLength="1" d="M8 4.2V5.8" stroke="var(--s1)" stroke-width="1.2"/>
    <clipPath id="splash-clip"><path d="M4.2 5.6H11.8V14.8L8 11.8L4.2 14.8Z"/></clipPath>
    <g clip-path="url(#splash-clip)" stroke="none">
      <rect class="lg-band b1" x="4.2" y="4.6" width="2.53" height="12" fill="var(--s1)"/>
      <rect class="lg-band b2" x="6.73" y="4.6" width="2.54" height="12" fill="var(--s2)"/>
      <rect class="lg-band b3" x="9.27" y="4.6" width="2.53" height="12" fill="var(--s3)"/>
      <path class="lg-sep" d="M6.73 4.6V15M9.27 4.6V15" stroke="var(--accent)" stroke-width=".5"/>
    </g></g></svg>`;
  // 앱 관리 전환 화면(showAdSplash)과 같은 세 가닥 엮임. 이 부품은 앱 코드보다 먼저 돈다.
  const STRAND = ['var(--accent)', 'var(--accent-mid)', 'var(--ink-2)'];
  function braidPaths(len, amp, periods, vert, sw, ol, cols, n, sub) {
    ol = ol == null ? 3 : ol; cols = cols || STRAND; n = n || periods * 22; sub = sub || 1;
    const ph = [0, 2 * Math.PI / 3, 4 * Math.PI / 3], out = [], f = v => v.toFixed(2);
    for (let i = 0; i < n; i++) {
      ph.map((p, k) => {
        const pts = [];
        for (let m = 0; m <= sub; m++) { const t = (i + m / sub) / n; pts.push([len * t, amp * Math.sin(t * periods * 2 * Math.PI + p)]); }
        const tm = (i + .5) / n;
        return { k, pts, z: Math.cos(tm * periods * 2 * Math.PI + p) };
      }).sort((a, b) => a.z - b.z).forEach(o => {
        const d = o.pts.map((q, m) => (m ? 'L' : 'M') + (vert ? `${f(q[1])} ${f(q[0])}` : `${f(q[0])} ${f(q[1])}`)).join('');
        out.push(`<path d="${d}" stroke="var(--cord-bg, var(--page))" stroke-width="${sw + ol}" stroke-linecap="butt"/><path d="${d}" stroke="${cols[o.k]}" stroke-width="${sw}" stroke-linecap="round"/>`);
      });
    }
    return out.join('');
  }
  const braidH = (w, h, per, sw) => `<svg viewBox="0 ${-h / 2} ${w} ${h}" aria-hidden="true">${braidPaths(w, h / 2 - sw, per, false, sw)}</svg>`;
  const noteFirst = `<span class="splash-mark">${mark}</span><p class="splash-name sp-in d1">디다코 노트</p><p class="splash-sub sp-in d2">말씀 앞에서 묻고, 품고, 알게 되는 곳</p>`;
  const noteSwitch = `<span class="sw-note sw-in"><svg viewBox="0 0 16 16" aria-hidden="true"><use href="#i-didako"/></svg></span><p class="splash-name sw-in d1">디다코 노트</p><p class="splash-sub sw-in d2">말씀 앞에서 묻고, 품고, 알게 되는 곳</p>`;
  const name = place === 'community' ? '디다코 공동체' : '디다코 교회';
  const sub = place === 'community' ? '공동체와 말씀을 함께 읽어요.' : '말씀을 함께 읽고 나누고 간직해요';
  const joined = `<div class="sw-cord">${braidH(240, 64, 2.5, 5)}</div><p class="sw-name">${name}</p><p class="sw-sub">${sub}</p>`;
  const inner = place === 'note' ? (mode === 'main' ? noteFirst : noteSwitch) : joined;
  me.insertAdjacentHTML('afterend', `<div id="splash" class="splash" aria-hidden="true">${inner}</div>`);
  const at = performance.now();
  // 첫 화면을 다 그린 뒤 불러도 정한 머무는 시간은 시작한 시각부터 센다.
  window.didakoSplash = {
    hide() {
      const s = document.getElementById('splash'); if (!s || s.classList.contains('out')) return unboot();
      const calm = matchMedia('(prefers-reduced-motion: reduce)').matches;
      const stay = calm ? 600 : (place === 'note' && mode === 'main' ? 2000 : 1500);
      setTimeout(() => { s.classList.add('out'); unboot(); setTimeout(() => s.remove(), calm ? 0 : 300); }, Math.max(0, stay - (performance.now() - at)));
    }
  };
})();
