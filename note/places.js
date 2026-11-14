// 세 앱의 '함께하는 곳' 메뉴를 같은 순서로 그린다.
(() => {
  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const here = '지금 보는 곳';
  const divider = '<div class="mdiv"></div>';

  // 공동체 화면에서만 내 공동체 목록을 넘긴다. 이동 주소와 동작은 각 앱이 정한다.
  function html(o) {
    function row(kind, id, name, sub) {
      const current = o.cur === (kind === 'circle' ? id : kind);
      const copy = `<span class="place-copy"><span>${esc(name)}</span>${sub ? `<span class="sm">${sub}</span>` : ''}</span>`;
      if (current) return `<div class="place-row on" role="menuitem" aria-current="page">${copy}</div>`;
      const attr = o.attr(kind, id);
      if (attr.startsWith('href="')) return `<a class="place-row" role="menuitem" ${attr}>${copy}</a>`;
      return `<button type="button" class="place-row" role="menuitem" ${attr}>${copy}</button>`;
    }

    const circles = o.circles === undefined
      ? row('circleOne', '', '디다코 공동체', '작은 모임에서 말씀을 함께 읽어요.')
      : o.circles.map(g => row('circle', g.id, g.name, o.cur === g.id ? here : g.wait ? '승인을 기다려요' : '')).join('');
    return `<p class="mlabel">함께하는 곳</p>
      ${row('note', '', '디다코 노트', o.cur === 'note' ? here : '혼자 묵상하는 노트')}
      ${circles}
      ${o.circleMake ? divider + row('circleMake', '', '+ 공동체 만들기', '') : ''}
      ${divider}${row('church', '', '디다코 교회', o.cur === 'church' ? here : '교회 코드로 들어가기')}`;
  }

  window.didakoPlaces = { html };
})();
