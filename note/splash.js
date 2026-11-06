// 시작 화면(코이데 splash.js의 "앱을 새로 켰을 때"를 본떴다). <body> 맨 앞에서 불러, 화면이 그려지기 전에 띄운다.
//  이 창에서 처음 켤 때만 보인다(sessionStorage). 새로고침, 카카오 로그인을 다녀올 때는 없다. 첫 화면이 그려지면 index.html이 hide()로 닫는다
(() => {
  const me = document.currentScript, KEY = 'didako-note-splash';
  const get = () => { try { return sessionStorage.getItem(KEY); } catch (e) { return '1'; } };
  const unboot = () => document.documentElement.classList.remove('booting');
  if (get()) { unboot(); window.didakoSplash = { hide() {} }; return; }
  try { sessionStorage.setItem(KEY, '1'); } catch (e) { /* 이번만 */ }
  const css = `.splash { position: fixed; inset: 0; z-index: 60; background: var(--page); display: flex; flex-direction: column; align-items: center; justify-content: center; gap: .5em; padding: 24px; text-align: center; transition: opacity .25s ease-out; }
.splash.out { opacity: 0; pointer-events: none; }
.splash-mark { width: 88px; height: 88px; border-radius: 50%; background: var(--accent); display: grid; place-items: center; margin-bottom: .4em; }
.splash-mark svg { width: 52px; height: 52px; --s1: var(--on-accent); --s2: color-mix(in srgb, var(--on-accent) 72%, var(--accent)); --s3: color-mix(in srgb, var(--on-accent) 48%, var(--accent)); --cord-bg: var(--accent); }
.splash-name { margin: 0; font-family: var(--f-display); font-size: 1.6em; font-weight: 700; color: var(--ink); }
.splash-sub { margin: 0; color: var(--ink-2); font-size: .9em; }
.sp-in { animation: sp-in .45s cubic-bezier(.2, .7, .3, 1) both; }
.sp-in.d1 { animation-delay: .12s; } .sp-in.d2 { animation-delay: .22s; }
@keyframes sp-in { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: none; } }
@media (prefers-reduced-motion: reduce) { .splash { transition: none; } .sp-in { animation: none; } }`;
  const st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);
  me.insertAdjacentHTML('afterend', `<div id="splash" class="splash" aria-hidden="true"><span class="splash-mark sp-in"><svg viewBox="0 0 16 16"><use href="#i-didako"/></svg></span>
  <p class="splash-name sp-in d1">디다코 노트</p><p class="splash-sub sp-in d2">말씀 앞에서 묻고, 품고, 알게 되는 곳</p></div>`);
  const at = performance.now();
  // 1.5초 머문다(움직임 줄이기는 0.6초). 그보다 늦게 불리면 바로 옅어진다
  window.didakoSplash = {
    hide() {
      const s = document.getElementById('splash'); if (!s || s.classList.contains('out')) return unboot();
      const calm = matchMedia('(prefers-reduced-motion: reduce)').matches, stay = calm ? 600 : 1500;
      setTimeout(() => { s.classList.add('out'); unboot(); setTimeout(() => s.remove(), calm ? 0 : 300); }, Math.max(0, stay - (performance.now() - at)));
    }
  };
})();
