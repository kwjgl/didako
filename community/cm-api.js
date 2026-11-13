// 디다코 공동체 서버(Supabase)의 답을 지금 화면(데모)이 쓰는 자료 모양으로 바꾸는 얇은 층(코이데 koinonia-api.js 방식).
// 화면(DOM)은 건드리지 않는다. 서버 함수는 supabase/002_didako_community.sql에 있다.
// 서버에서 온 글(공동체 이름, 사람 이름)은 남이 쓴 글이다. 여기서는 모양만 지키고(문자열·숫자), 화면에 넣을 때 esc()를 거친다.
window.DidakoCm = (() => {
  const str = v => (v == null ? '' : String(v));
  const num = (v, d) => { const n = Number(v); return Number.isFinite(n) ? n : d; };
  const list = v => (Array.isArray(v) ? v : []);
  const rpc = (name, args) => window.DidakoSb.rpc(name, args);
  // 서버의 공동체 한 줄(mine의 list 한 칸) + 자세히(info, 있을 때만) + 기기에 있던 옛 모양(old) → 화면의 공동체 모양
  function toGroup(row, info, old) {
    const r = row || {}, o = old || {}, i = info || null;
    const role = str(i ? i.role : r.role) === '모임장' ? 'leader' : 'member';
    // 사람과 신청: 자세히가 있으면 그것으로, 없으면 옛 것. members는 모임장을 뺀 이름, mids는 같은 순서의 사람 번호
    let members = list(o.members).map(str), mids = list(o.mids).map(str), pending = list(o.pending).map(p => ({ name: str(p && p.name), id: str(p && p.id) }));
    if (i) {
      const rest = list(i.members).filter(m => m && str(m.role) !== '모임장');
      members = rest.map(m => str(m.name)); mids = rest.map(m => str(m.id));
      pending = list(i.asks).map(p => ({ name: str(p && p.name), id: str(p && p.id) }));
    }
    let invite = o.invite || null;
    if (i) invite = i.token ? { code: str(i.token), made: (Date.parse(str(i.expires)) || Date.now() + 7 * 86400000) - 7 * 86400000 } : null;
    const state = str(i ? i.state : r.state) || '열림';
    const g = {
      id: str(r.id || (i && i.id)), name: str(i ? i.name : r.name), role,
      me: str(i ? i.me : r.me), leader: str(i ? i.lead : r.lead),
      members, mids, pending,
      book: str(i ? i.book : r.book) || str(o.book), no: num(i ? i.no : r.no, num(o.no, 1)),
      ends: str(i ? i.endsOn : r.endsOn), church: '', invite,
      wait: str(r.status) === '요청', state, eraseOn: str(i ? i.eraseOn : r.eraseOn),
      canWrite: i ? i.canWrite === true : (typeof o.canWrite === 'boolean' && state === str(o.state) ? o.canWrite : state === '열림')
    };
    return g;
  }
  return {
    toGroup,
    mine: () => rpc('didako_cm_mine', {}),
    info: id => rpc('didako_cm_info', { p_id: str(id) }),
    create: ({ name, me, months, book, no }) => rpc('didako_cm_create', { p_name: str(name), p_person: str(me), p_months: months ? num(months, null) : null, p_book: str(book), p_no: num(no, 1) }),
    peek: token => rpc('didako_cm_peek', { p_token: str(token) }),
    join: (token, me) => rpc('didako_cm_join', { p_token: str(token), p_person: str(me) }),
    decide: (id, memberId, ok) => rpc('didako_cm_decide', { p_id: str(id), p_member: str(memberId), p_ok: ok === true }),
    remove: (id, memberId) => rpc('didako_cm_remove', { p_id: str(id), p_member: str(memberId) }),
    renew: id => rpc('didako_cm_renew', { p_id: str(id) }),
    now: (id, book, no) => rpc('didako_cm_now', { p_id: str(id), p_book: str(book), p_no: num(no, 1) }),
    leave: id => rpc('didako_cm_leave', { p_id: str(id) })
  };
})();
