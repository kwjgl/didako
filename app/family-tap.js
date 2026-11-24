/*
 * 누르는 맛(2026-11-24, 사용자: 디다코는 버튼 누를 때 효과가 코이데와 달라). 코이데 `app/index.html`의 "누름 표시"와 "누름 움직임"을 옮겼다.
 *  - 누르는 동안 버튼이 살짝 작아진다(basic·glass. new·classic은 자체 눌림이 있어 건드리지 않는다).
 *  - 스위치는 동그라미가 미끄러지고, 하나만 고르는 줄(.seg)은 선택 표시 판이 옆으로 옮겨 가고, 눌려 켜지는 칩은 톡 튄다.
 * 화면을 통째로 다시 그리는 앱이라 눌린 모습을 기억했다가, 다시 그린 뒤 그 자리에서 움직인다(코이데와 같은 방식).
 * 스타일은 이 파일이 스스로 넣는다. 원본은 gbs shared/family-ui/ 한 곳이고 sync.sh가 디다코 app·community·note에 복사한다.
 */
(() => {
  if (window.FamilyTap) return;
  const PRESS = ':is(.btn, .chip-btn, .mchip, .flt, .seg button, .seg2 button, .tabs :is(button, a), .icon-btn, .badge-btn, .switch, .pss-x, .pss-music, .pss-nav button, .info-i):not(:disabled)';
  const BASE = ':root:not([data-style="neu"]):not([data-style="skeu"]) ';
  const css = `
${BASE}${PRESS} { transition: transform .12s ease, background-color .2s, color .2s, border-color .2s, box-shadow .2s; }
${BASE}${PRESS}:active { transform: scale(.96); }
.switch.sw-to-on { animation: sw-track-on .22s ease both; }
.switch.sw-to-off { animation: sw-track-off .22s ease both; }
.switch.sw-to-on > span { animation: sw-knob-on .26s cubic-bezier(.3, 1.35, .5, 1) both; }
.switch.sw-to-off > span { animation: sw-knob-off .26s cubic-bezier(.3, 1.35, .5, 1) both; }
@keyframes sw-track-on { from { background: var(--line-strong); } }
@keyframes sw-track-off { from { background: var(--accent); } }
@keyframes sw-knob-on { 0% { left: 3px; } 45% { width: 28px; } 100% { left: 23px; width: 22px; } }
@keyframes sw-knob-off { 0% { left: 23px; } 45% { width: 28px; left: 3px; } 100% { left: 3px; width: 22px; } }
.seg-pill { position: absolute; z-index: 0; pointer-events: none; transform-origin: left center; }
.seg > button, .seg2 > button { position: relative; z-index: 1; }
.seg > button.seg-moving, .seg2 > button.seg-moving { background: transparent !important; box-shadow: none !important; transition: none !important; }
.tap-pop { animation: tap-pop .3s cubic-bezier(.3, 1.6, .5, 1); }
@keyframes tap-pop { 40% { transform: scale(1.07); } }
@media (prefers-reduced-motion: reduce) { .switch.sw-to-on, .switch.sw-to-off, .switch > span, .tap-pop { animation: none !important; } ${BASE}${PRESS}:active { transform: none; } }
`;
  const st = document.createElement('style');
  st.setAttribute('data-family-tap', '');
  st.textContent = css;
  document.head.appendChild(st);

  const reduce = () => window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  const keyOf = b => `[data-act="${b.dataset.act}"]` + (b.dataset.v != null ? `[data-v="${CSS.escape(b.dataset.v)}"]` : '');
  let pending = null, obs = null;

  function arm(b) {
    pending = null;
    if (reduce()) return;
    const key = keyOf(b), at = Date.now();
    if (b.classList.contains('switch')) pending = { kind: 'switch', key, on: !b.classList.contains('on'), at };
    else if (b.closest('.seg, .seg2')) {
      const old = b.classList.contains('on') ? null : b.parentElement.querySelector(':scope > button.on');
      pending = old ? { kind: 'slide', key, old: keyOf(old), rect: old.getBoundingClientRect(), at } : { kind: 'pop', key, at };
    } else if (b.hasAttribute('aria-pressed')) pending = { kind: 'pop', key, at };
    if (pending && !obs) {
      obs = new MutationObserver(() => { requestAnimationFrame(play); obs.disconnect(); obs = null; });
      obs.observe(document.body, { childList: true, subtree: true });
      setTimeout(() => { if (obs) { obs.disconnect(); obs = null; } }, 800);
    }
  }

  function play() {
    const P = pending; pending = null;
    if (!P || Date.now() - P.at > 800) return;
    const el = document.querySelector(P.key); if (!el) return;
    const once = (x, cls) => { x.classList.add(cls); x.addEventListener('animationend', () => x.classList.remove(cls), { once: true }); };
    if (P.kind === 'switch') return once(el, P.on ? 'sw-to-on' : 'sw-to-off');
    if (P.kind === 'pop') return once(el, 'tap-pop');
    // 선택 표시 옮기기: 새 버튼의 바탕을 잠깐 비우고, 같은 모양의 판을 지난 자리에서 새 자리로 미끄러뜨린다
    const g = el.parentElement, nr = el.getBoundingClientRect(), gr = g.getBoundingClientRect(), r = P.rect;
    const prev = document.querySelector(P.old);
    if (prev && prev.classList.contains('on')) return once(el, 'tap-pop');   // 여러 개를 고르는 줄이면 옮기지 않고 톡
    if (!el.classList.contains('on') || Math.abs(r.top - nr.top) > 4 || !nr.width) return;
    const cs = getComputedStyle(el), pill = document.createElement('span');
    pill.className = 'seg-pill';
    Object.assign(pill.style, { left: (nr.left - gr.left) + 'px', top: (nr.top - gr.top) + 'px', width: nr.width + 'px', height: nr.height + 'px',
      background: cs.backgroundColor, backgroundImage: cs.backgroundImage, boxShadow: cs.boxShadow, borderRadius: cs.borderRadius });
    if (getComputedStyle(g).position === 'static') g.style.position = 'relative';
    g.prepend(pill); el.classList.add('seg-moving');
    pill.animate([{ transform: `translateX(${r.left - nr.left}px) scaleX(${(r.width / nr.width).toFixed(3)})` }, { transform: 'none' }],
      { duration: 240, easing: 'cubic-bezier(.3, 1.25, .5, 1)' }).onfinish = () => {
        // 판을 치우고 버튼 바탕을 되돌릴 때 바탕색이 서서히 차오르면(.2s) 선택 표시가 잠깐 옅어져 깜빡인다(2026-11-24). 이 순간만 전환을 끈다
        el.style.setProperty('transition', 'none');
        pill.remove(); el.classList.remove('seg-moving');
        void el.offsetWidth;
        el.style.removeProperty('transition');
      };
  }

  // 누른 것을 기억한다(앱의 눌림 처리보다 먼저 보도록 capture)
  document.addEventListener('click', e => {
    const b = e.target.closest && e.target.closest('[data-act]');
    if (b && !b.disabled) arm(b);
  }, true);
  window.FamilyTap = { play };
})();
