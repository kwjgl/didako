// 세 앱의 '함께하는 곳' 메뉴를 같은 순서로 그린다.
(() => {
  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const here = '지금 보는 곳';
  const divider = '<div class="mdiv"></div>';

  // 내 공동체 한 줄의 작은 글(코이데 규칙): 끝난 곳은 '끝난 공동체', 끝나는 날이 30일 안이면 D-숫자(당일은 D-day), 모임장에게는 신청 수.
  //  승인을 기다리는 곳과 닫힌 곳은 그 말만. state · endsOn · asks를 넘기지 않으면 빈 글이다
  function circleSub(g) {
    if (g.wait) return '승인을 기다려요';
    if (g.state === '닫음') return '닫힌 공동체예요';
    const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(g.endsOn || ''), n = new Date();
    const left = m ? Math.round((Date.UTC(+m[1], +m[2] - 1, +m[3]) - Date.UTC(n.getFullYear(), n.getMonth(), n.getDate())) / 864e5) : null;
    return [['끝남', '끝맺음'].includes(g.state) ? '끝난 공동체' : left != null && left <= 30 ? (left <= 0 ? 'D-day' : 'D-' + left) : '', g.asks ? '신청 ' + Number(g.asks) : ''].filter(Boolean).join(', ');
  }
  // 내 공동체 목록(o.circles)을 넘기면 하나씩 그리고, 넘기지 않으면 디다코 공동체 입구 한 줄을 그린다. 이동 주소와 동작은 각 앱이 정한다.
  //  g.off가 참인 줄은 누를 수 없다(노트에서 승인을 기다리는 곳 · 닫힌 곳)
  function html(o) {
    function row(kind, id, name, sub, off) {
      if (off) return `<div class="place-row" role="menuitem" aria-disabled="true"><span class="place-copy"><span>${esc(name)}</span>${sub ? `<span class="sm">${sub}</span>` : ''}</span></div>`;
      const current = o.cur === (kind === 'circle' ? id : kind);
      const copy = `<span class="place-copy"><span>${esc(name)}</span>${sub ? `<span class="sm">${sub}</span>` : ''}</span>`;
      if (current) return `<div class="place-row on" role="menuitem" aria-current="page">${copy}</div>`;
      const attr = o.attr(kind, id);
      if (attr.startsWith('href="')) return `<a class="place-row" role="menuitem" ${attr}>${copy}</a>`;
      return `<button type="button" class="place-row" role="menuitem" ${attr}>${copy}</button>`;
    }

    const circles = o.circles === undefined
      ? row('circleOne', '', '디다코 공동체', '작은 모임에서 말씀을 함께 읽어요.')
      : o.circles.map(g => row('circle', g.id, g.name, o.cur === g.id ? [here, g.asks ? '신청 ' + Number(g.asks) : ''].filter(Boolean).join(', ') : circleSub(g), g.off === true)).join('');
    return `<p class="mlabel">함께하는 곳</p>
      ${row('note', '', '디다코 노트', o.cur === 'note' ? here : '혼자 묵상하는 노트')}
      ${circles}
      ${o.circleMake ? divider + row('circleMake', '', '+ 공동체 만들기', '') : ''}
      ${divider}${row('church', '', '디다코 교회', o.cur === 'church' ? here : '교회 코드로 들어가기')}`;
  }

  window.didakoPlaces = { html };
})();
