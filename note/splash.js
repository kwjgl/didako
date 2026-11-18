// ① 따라 하기 연습은 화면 없이 바로 시작한다. 시작 화면을 그리기 전에 <body> 첫머리에서 불러온다.
// ② 새 창으로 노트를 켜면 마지막으로 쓴 공동체·교회에 바로 간다. 초대·로그인 등 특별한 주소는 그대로 둔다.
// ③ 이 창에서 보던 곳에 따라 시작(main)·전환(switch)·조용히(quiet)를 고른다. 관리 화면은 조용히 둔다.
// ④ 노트 첫 시작은 세 겹 책갈피가 엮이고(2초), 전환은 종이 위 책갈피 또는 세 겹 끈(1.5초)이다. 움직임 줄이기는 0.6초다.
//    새 창으로 켤 때(main)만 맨 아래에 만든 곳 코이노비아 로고를 작게 둔다. 전환 화면에는 두지 않는다.
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
/* 시작 화면 맨 아래: 만든 곳 코이노비아 로고(매듭 + KOINOBIA). 보조 글자색 한 가지로 작게, 이름보다 늦게 나타난다 */
.splash-by { position: absolute; left: 0; right: 0; bottom: calc(40px + env(safe-area-inset-bottom, 0px)); display: flex; align-items: center; justify-content: center; gap: 7px; color: var(--ink-2); animation: sp-in .45s cubic-bezier(.2, .7, .3, 1) .35s both; }
.splash-by.late { animation-delay: 1.25s; }
.splash-by svg { display: block; } .splash-by .by-knot { width: 18px; height: 18px; } .splash-by .wm { height: 11px; width: auto; }
@media (max-height: 420px) { .splash-by { display: none; } }
@media (prefers-reduced-motion: reduce) { .splash { transition: none; } .lg-ring, .lg-cord, .lg-band, .lg-sep, .sp-in, .splash-by { animation: none; } }
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
  // 코이노비아 로고(대문 koinobia 저장소의 tabs.js LOGO·WORDMARK를 옮겨 옴. 로고가 바뀌면 코이데 splash.js와 같이 바꾼다).
  // 노트 첫 시작은 이름이 1초 뒤에 나오므로 로고도 그 뒤에(late)
  const by = mode === 'main' ? '<div class="splash-by' + (place === 'note' ? ' late' : '') + '"><svg class="by-knot" viewBox="0 0 100 100" aria-hidden="true"><g fill="none" stroke-width="9.5" stroke-linecap="round" stroke-linejoin="round"><path stroke="currentColor" stroke-opacity="1" d="M77.0 49.7L77.6 50.1L78.2 50.5L78.7 50.9L79.3 51.3L79.8 51.8L80.4 52.2L80.9 52.6L81.4 53.1L81.9 53.5L82.4 53.9L82.8 54.4L83.3 54.9L83.7 55.3L84.2 55.8L84.6 56.3L85.0 56.8L85.4 57.2L85.8 57.7L86.2 58.2L86.5 58.7L86.9 59.2L87.2 59.7L87.5 60.2L87.8 60.7L88.1 61.2L88.4 61.8L88.7 62.3L88.9 62.8L89.2 63.3L89.4 63.8L89.6 64.3L89.8 64.9L90.0 65.4L90.1 65.9L90.3 66.4L90.4 66.9L90.5 67.4L90.6 68.0L90.7 68.5L90.8 69.0L90.9 69.5L90.9 70.0L91.0 70.5L91.0 71.0L91.0 71.5L91.0 72.0L91.0 72.5L90.9 73.0L90.9 73.5L90.8 74.0L90.8 74.5L90.7 74.9L90.6 75.4L90.4 75.9L90.3 76.3L90.2 76.8L90.0 77.2L89.8 77.7L89.6 78.1L89.4 78.5L89.2 79.0L89.0 79.4L88.8 79.8L88.5 80.2L88.3 80.6L88.0 80.9L87.7 81.3L87.4 81.7L87.1 82.0L86.8 82.4L86.4 82.7L86.1 83.1L85.7 83.4L85.4 83.7L85.0 84.0L84.6 84.3L84.2 84.6L83.8 84.8L83.3 85.1L82.9 85.4L82.5 85.6L82.0 85.8L81.6 86.0L81.1 86.3L80.6 86.5L80.1 86.6L79.6 86.8L79.1 87.0L78.6 87.1L78.1 87.3L77.6 87.4L77.0 87.5L76.5 87.6L75.9 87.7L75.4 87.7L74.8 87.8L74.3 87.9L73.7 87.9L73.1 87.9L72.5 87.9L71.9 87.9L71.3 87.9L70.7 87.9L70.1 87.8L69.5 87.8L68.9 87.7L68.3 87.6L67.7 87.6L67.1 87.4L66.4 87.3L65.8 87.2L65.2 87.0L64.6 86.9L63.9 86.7L63.3 86.5L62.7 86.3L62.0 86.1L61.4 85.9L60.8 85.7L60.1 85.4L59.5 85.1L58.9 84.9L58.3 84.6L57.6 84.3L57.0 84.0L56.4 83.6L55.7 83.3L55.1 83.0L54.5 82.6L53.9 82.2L53.3 81.8L52.7 81.4L52.1 81.0L51.5 80.6L50.9 80.2L50.3 79.7L49.7 79.3L49.1 78.8L48.5 78.3L47.9 77.8L47.4 77.3L46.8 76.8L46.3 76.3L45.7 75.8L45.2 75.2L44.6 74.7L44.1 74.1L43.6 73.5L43.1 73.0L42.6 72.4L42.1 71.8L41.6 71.2L41.1 70.6L40.6 70.0L40.2 69.3L39.7 68.7L39.3 68.1L38.8 67.4L38.4 66.7L38.0 66.1L37.6 65.4L37.2 64.7L36.8 64.1L36.4 63.4L36.0 62.7L35.7 62.0L35.3 61.3L35.0 60.6L34.6 59.9L34.3 59.2L34.0 58.4L33.7 57.7L33.4 57.0L33.2 56.3L32.9 55.5L32.6 54.8L32.5 54.3"/><path stroke="currentColor" stroke-opacity=".78" d="M30.2 37.3L30.2 36.6L30.3 35.9L30.4 35.2L30.4 34.5L30.5 33.8L30.6 33.1L30.7 32.5L30.9 31.8L31.0 31.2L31.1 30.5L31.3 29.9L31.5 29.3L31.7 28.6L31.8 28.0L32.0 27.4L32.3 26.8L32.5 26.2L32.7 25.7L33.0 25.1L33.2 24.5L33.5 24.0L33.7 23.5L34.0 22.9L34.3 22.4L34.6 21.9L34.9 21.4L35.2 20.9L35.5 20.4L35.9 20.0L36.2 19.5L36.5 19.1L36.9 18.7L37.3 18.2L37.6 17.8L38.0 17.5L38.4 17.1L38.8 16.7L39.2 16.4L39.6 16.0L40.0 15.7L40.4 15.4L40.8 15.1L41.2 14.8L41.6 14.5L42.1 14.3L42.5 14.0L42.9 13.8L43.4 13.6L43.8 13.4L44.3 13.2L44.7 13.0L45.2 12.9L45.6 12.7L46.1 12.6L46.6 12.5L47.0 12.4L47.5 12.3L48.0 12.2L48.4 12.1L48.9 12.1L49.4 12.1L49.8 12.1L50.3 12.1L50.8 12.1L51.3 12.1L51.7 12.2L52.2 12.2L52.7 12.3L53.1 12.4L53.6 12.5L54.1 12.6L54.5 12.8L55.0 12.9L55.4 13.1L55.9 13.2L56.3 13.4L56.8 13.6L57.2 13.9L57.6 14.1L58.1 14.3L58.5 14.6L58.9 14.9L59.4 15.2L59.8 15.5L60.2 15.8L60.6 16.1L61.0 16.5L61.4 16.8L61.8 17.2L62.1 17.6L62.5 18.0L62.9 18.4L63.2 18.8L63.6 19.2L63.9 19.7L64.3 20.1L64.6 20.6L64.9 21.1L65.2 21.6L65.5 22.1L65.8 22.6L66.1 23.1L66.4 23.6L66.6 24.2L66.9 24.7L67.1 25.3L67.4 25.9L67.6 26.4L67.8 27.0L68.0 27.6L68.2 28.2L68.4 28.9L68.6 29.5L68.7 30.1L68.9 30.7L69.0 31.4L69.2 32.0L69.3 32.7L69.4 33.4L69.5 34.0L69.6 34.7L69.7 35.4L69.7 36.1L69.8 36.8L69.8 37.5L69.9 38.2L69.9 38.9L69.9 39.6L69.9 40.3L69.9 41.1L69.8 41.8L69.8 42.5L69.7 43.2L69.7 44.0L69.6 44.7L69.5 45.4L69.4 46.2L69.3 46.9L69.2 47.7L69.0 48.4L68.9 49.1L68.7 49.9L68.6 50.6L68.4 51.4L68.2 52.1L68.0 52.8L67.7 53.6L67.5 54.3L67.3 55.0L67.0 55.8L66.8 56.5L66.5 57.2L66.2 58.0L65.9 58.7L65.6 59.4L65.3 60.1L64.9 60.8L64.6 61.5L64.2 62.2L63.9 62.9L63.5 63.6L63.1 64.3L62.7 65.0L62.3 65.6L61.9 66.3L61.5 67.0L61.0 67.6L60.6 68.3L60.1 68.9L59.7 69.5L59.2 70.2L58.7 70.8L58.3 71.4L57.8 72.0L57.3 72.6L56.8 73.2L56.4 73.5"/><path stroke="currentColor" stroke-opacity=".56" d="M42.8 84.1L42.2 84.4L41.5 84.7L40.9 85.0L40.3 85.2L39.6 85.5L39.0 85.7L38.4 86.0L37.7 86.2L37.1 86.4L36.5 86.6L35.9 86.8L35.2 86.9L34.6 87.1L34.0 87.2L33.3 87.4L32.7 87.5L32.1 87.6L31.5 87.7L30.9 87.8L30.3 87.8L29.7 87.9L29.1 87.9L28.5 87.9L27.9 87.9L27.3 87.9L26.7 87.9L26.1 87.9L25.6 87.8L25.0 87.8L24.4 87.7L23.9 87.6L23.3 87.6L22.8 87.5L22.3 87.3L21.7 87.2L21.2 87.1L20.7 86.9L20.2 86.8L19.7 86.6L19.2 86.4L18.8 86.2L18.3 86.0L17.8 85.8L17.4 85.5L16.9 85.3L16.5 85.0L16.1 84.8L15.7 84.5L15.3 84.2L14.9 83.9L14.5 83.6L14.2 83.3L13.8 83.0L13.5 82.6L13.1 82.3L12.8 81.9L12.5 81.6L12.2 81.2L11.9 80.8L11.6 80.4L11.4 80.0L11.1 79.6L10.9 79.2L10.7 78.8L10.5 78.4L10.3 78.0L10.1 77.5L9.9 77.1L9.8 76.6L9.6 76.2L9.5 75.7L9.4 75.3L9.3 74.8L9.2 74.3L9.1 73.8L9.1 73.3L9.0 72.9L9.0 72.4L9.0 71.9L9.0 71.4L9.0 70.9L9.0 70.4L9.1 69.8L9.1 69.3L9.2 68.8L9.3 68.3L9.4 67.8L9.5 67.3L9.6 66.8L9.8 66.2L9.9 65.7L10.1 65.2L10.3 64.7L10.5 64.2L10.7 63.6L10.9 63.1L11.2 62.6L11.4 62.1L11.7 61.6L12.0 61.1L12.3 60.6L12.6 60.1L12.9 59.6L13.2 59.0L13.6 58.6L14.0 58.1L14.3 57.6L14.7 57.1L15.1 56.6L15.5 56.1L16.0 55.6L16.4 55.2L16.9 54.7L17.3 54.2L17.8 53.8L18.3 53.3L18.8 52.9L19.3 52.5L19.8 52.0L20.3 51.6L20.9 51.2L21.4 50.8L22.0 50.4L22.6 50.0L23.2 49.6L23.8 49.2L24.4 48.9L25.0 48.5L25.6 48.1L26.2 47.8L26.9 47.5L27.5 47.1L28.2 46.8L28.9 46.5L29.5 46.2L30.2 45.9L30.9 45.6L31.6 45.4L32.3 45.1L33.0 44.8L33.7 44.6L34.5 44.4L35.2 44.2L35.9 43.9L36.7 43.7L37.4 43.6L38.1 43.4L38.9 43.2L39.7 43.1L40.4 42.9L41.2 42.8L41.9 42.7L42.7 42.5L43.5 42.4L44.3 42.3L45.0 42.3L45.8 42.2L46.6 42.1L47.4 42.1L48.2 42.1L49.0 42.0L49.7 42.0L50.5 42.0L51.3 42.1L52.1 42.1L52.9 42.1L53.7 42.2L54.4 42.2L55.2 42.3L56.0 42.4L56.8 42.5L57.5 42.6L58.3 42.7L59.1 42.8L59.8 43.0L60.6 43.1L61.1 43.2"/></g></svg><svg class="wm" viewBox="0 -26 6024 752" aria-hidden="true"><g fill="currentColor" stroke="currentColor" stroke-width="14" stroke-linejoin="round"><path d="M0 700H91V454L204 333L470 700H574L262 271L516 0H466L91 394V0H0Z"/><path d="M1778 0V700H1869V0Z"/><path d="M2823 0V535H2819L2264 -12H2259V700H2305V165H2309L2864 712H2869V0Z"/><path d="M4153 700H4404Q4471 700 4517.0 682.5Q4563 665 4591.0 637.0Q4619 609 4631.5 573.5Q4644 538 4644 502Q4644 445 4619.5 411.0Q4595 377 4561.0 359.0Q4527 341 4491.0 335.0Q4455 329 4433 328V324Q4468 324 4499.0 310.5Q4530 297 4553.5 275.5Q4577 254 4591.0 225.5Q4605 197 4605 165Q4605 137 4593.0 108.0Q4581 79 4556.5 55.0Q4532 31 4493.5 15.5Q4455 0 4403 0H4153ZM4244 656V350H4354Q4403 350 4439.0 363.0Q4475 376 4498.5 398.0Q4522 420 4533.5 449.0Q4545 478 4545 510Q4545 545 4532.5 572.0Q4520 599 4499.0 618.0Q4478 637 4449.5 646.5Q4421 656 4389 656ZM4244 306V44H4366Q4405 44 4432.5 55.0Q4460 66 4477.5 84.0Q4495 102 4503.0 125.0Q4511 148 4511 171Q4511 200 4499.5 225.0Q4488 250 4467.5 268.0Q4447 286 4420.5 296.0Q4394 306 4364 306Z"/><path d="M4964 0V700H5055V0Z"/><path d="M5345 700 L5681 -12 L6017 700 L5921.4 700 L5681 190.6 L5440.6 700Z"/></g><g fill="none" stroke="currentColor" stroke-width="105"><circle cx="1096" cy="350" r="316.5"/><circle cx="3511" cy="350" r="316.5"/></g></svg></div>' : '';
  const inner = (place === 'note' ? (mode === 'main' ? noteFirst : noteSwitch) : joined) + by;
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
