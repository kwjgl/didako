// 시작 화면(코이데 splash.js의 "앱을 새로 켰을 때"를 본떴다). <body> 맨 앞에서 불러, 화면이 그려지기 전에 띄운다.
//  이 창에서 처음 켤 때만 보인다(sessionStorage). 새로고침, 카카오 로그인을 다녀올 때는 없다. 첫 화면이 그려지면 index.html이 hide()로 닫는다
//  로고는 그려지며 엮인다(S-35): ① 고리가 그려지고 ② 끈이 내려오고 ③ 세 겹 띠가 하나씩 아래로 풀려 내려오고 ④ 띠 사이 구분선이 나타난다.
//  상단 바의 로고(#i-didako)는 움직이지 않게 그대로 두고, 여기서는 같은 모양을 따로 그린다
(() => {
  const me = document.currentScript, KEY = 'didako-note-splash';
  const get = () => { try { return sessionStorage.getItem(KEY); } catch (e) { return '1'; } };
  const unboot = () => document.documentElement.classList.remove('booting');
  if (get()) { unboot(); window.didakoSplash = { hide() {} }; return; }
  try { sessionStorage.setItem(KEY, '1'); } catch (e) { /* 이번만 */ }
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
@media (prefers-reduced-motion: reduce) { .splash { transition: none; } .lg-ring, .lg-cord, .lg-band, .lg-sep, .sp-in { animation: none; } }`;
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
  me.insertAdjacentHTML('afterend', `<div id="splash" class="splash" aria-hidden="true"><span class="splash-mark">${mark}</span>
  <p class="splash-name sp-in d1">디다코 노트</p><p class="splash-sub sp-in d2">말씀 앞에서 묻고, 품고, 알게 되는 곳</p></div>`);
  const at = performance.now();
  // 2초 머문다(로고가 다 엮인 모습을 잠깐 보고 넘어가게, S-35). 움직임 줄이기는 0.6초. 그보다 늦게 불리면 바로 옅어진다
  window.didakoSplash = {
    hide() {
      const s = document.getElementById('splash'); if (!s || s.classList.contains('out')) return unboot();
      const calm = matchMedia('(prefers-reduced-motion: reduce)').matches, stay = calm ? 600 : 2000;
      setTimeout(() => { s.classList.add('out'); unboot(); setTimeout(() => s.remove(), calm ? 0 : 300); }, Math.max(0, stay - (performance.now() - at)));
    }
  };
})();
