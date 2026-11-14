// 디다코 공동체 서버(Supabase)의 답을 지금 화면(데모)이 쓰는 자료 모양으로 바꾸는 얇은 층(코이데 koinonia-api.js 방식).
// 화면(DOM)은 건드리지 않는다. 서버 함수는 supabase/002_didako_community.sql·003_didako_community_care.sql·004_didako_community_book.sql에 있다.
// 서버에서 온 글(공동체 이름, 사람 이름, 모임장이 쓴 교재)은 남이 쓴 글이다. 여기서는 모양만 지키고(문자열·숫자), 화면에 넣을 때 esc()를 거친다.
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
      members, mids, pending, n: Number.isInteger(r.n) ? r.n : null,
      book: str(i ? i.book : r.book) || str(o.book), no: num(i ? i.no : r.no, num(o.no, 1)),
      ends: str(i ? i.endsOn : r.endsOn), church: '', invite,
      wait: str(r.status) === '요청', state, eraseOn: str(i ? i.eraseOn : r.eraseOn),
      canWrite: i ? i.canWrite === true : (typeof o.canWrite === 'boolean' && state === str(o.state) ? o.canWrite : state === '열림')
    };
    return g;
  }
  // ── 모임장이 쓴 교재 ──
  // 서버의 교재 한 줄(data: 교재 한 권 전체 + 과별 질문 자료 guides)을 화면의 교재 모양으로 바꾼다.
  // 화면 속성(id="q-…", data-… )에 들어가는 번호는 안전한 글자만 남기고, 모르는 칸은 버린다. 글은 화면에 넣을 때 esc()를 거친다
  const isObj = v => v && typeof v === 'object' && !Array.isArray(v);
  const safeId = (v, d) => (/^[A-Za-z0-9_-]{1,64}$/.test(str(v)) ? str(v) : d);
  const strs = v => list(v).map(str).slice(0, 20);
  let idSerial = 0;
  const freshId = () => 'q' + Date.now().toString(36) + (++idSerial);
  function toQuestion(q) {
    const o = { id: safeId(q.id, freshId()), t: str(q.t), vs: strs(q.vs) };
    if (q.kind === 'read') { o.kind = 'read'; o.h = str(q.h); } else { o.sub = str(q.sub); o.lead = str(q.lead); }
    return o;
  }
  function toGuide(g) {
    return {
      guide: str(g.guide),
      stages: list(g.stages).filter(isObj).slice(0, 30).map(st => ({ name: str(st.name), qs: list(st.qs).filter(isObj).slice(0, 100).map(toQuestion) })),
      triple: list(g.triple).filter(isObj).slice(0, 6).map(t => ({ id: safeId(t.id, freshId()), who: str(t.who), t: str(t.t) }))
    };
  }
  // 반환: { b: 교재, guides: { 과 번호: 질문 자료 } }
  function toOwnBook(row) {
    const r = row || {}, d = isObj(r.data) ? r.data : {}, id = str(r.id), cv = isObj(d.cover) ? d.cover : {};
    const motif = /^[a-z0-9-]{1,32}$/.test(str(cv.motif)) ? str(cv.motif) : 'cord', color = /^[a-z0-9-]{1,32}$/.test(str(cv.color)) ? str(cv.color) : 'paper';
    const b = {
      id, title: str(d.title), kind: str(d.kind) || '자유 모임', period: str(d.period), coverName: str(d.coverName), range: str(d.range),
      start: str(d.start), end: str(d.end), source: str(d.source), closed: d.closed === true, edited: d.edited === true,
      cover: { motif, color }, updatedAt: str(r.updatedAt),
      lessons: list(d.lessons).filter(isObj).slice(0, 300).map(L => ({
        no: num(L.no, 0), name: str(L.name), ref: str(L.ref), date: str(L.date), iso: str(L.iso), intro: str(L.intro), body: str(L.body), wrap: str(L.wrap),
        useText: L.useText === true, text: str(L.text), fs: ['s', 'm', 'l'].includes(L.fs) ? L.fs : 'm', state: str(L.state) || 'upcoming'
      })).filter(L => L.no >= 1 && L.no <= 999)
    };
    const guides = {}, gm = isObj(d.guides) ? d.guides : {};
    b.lessons.forEach(L => { if (isObj(gm[L.no])) guides[L.no] = toGuide(gm[L.no]); });
    return { b, guides };
  }
  // 서버의 교재 목록 → { books: [화면 교재…](새 교재가 앞), guides: { '교재id:과번호': 질문 자료 } }
  function toOwn(rows) {
    const out = { books: [], guides: {} };
    list(rows).filter(isObj).forEach(row => {
      if (!/^[a-z0-9][a-z0-9-]{0,63}$/.test(str(row.id))) return;
      const { b, guides } = toOwnBook(row);
      out.books.unshift(b);
      Object.keys(guides).forEach(no => { out.guides[b.id + ':' + no] = guides[no]; });
    });
    return out;
  }
  return {
    toGroup, toOwn, toOwnBook,
    mine: () => rpc('didako_cm_mine', {}),
    info: id => rpc('didako_cm_info', { p_id: str(id) }),
    create: ({ name, me, months, book, no }) => rpc('didako_cm_create', { p_name: str(name), p_person: str(me), p_months: months ? num(months, null) : null, p_book: str(book), p_no: num(no, 1) }),
    peek: token => rpc('didako_cm_peek', { p_token: str(token) }),
    join: (token, me) => rpc('didako_cm_join', { p_token: str(token), p_person: str(me) }),
    decide: (id, memberId, ok) => rpc('didako_cm_decide', { p_id: str(id), p_member: str(memberId), p_ok: ok === true }),
    remove: (id, memberId) => rpc('didako_cm_remove', { p_id: str(id), p_member: str(memberId) }),
    renew: id => rpc('didako_cm_renew', { p_id: str(id) }),
    now: (id, book, no) => rpc('didako_cm_now', { p_id: str(id), p_book: str(book), p_no: num(no, 1) }),
    leave: id => rpc('didako_cm_leave', { p_id: str(id) }),
    handoff: (id, memberId) => rpc('didako_cm_handoff', { p_id: str(id), p_member: str(memberId) }),
    end: id => rpc('didako_cm_end', { p_id: str(id) }),
    rename: (id, name) => rpc('didako_cm_rename', { p_id: str(id), p_name: str(name) }),
    books: id => rpc('didako_cm_books', { p_id: str(id) }),
    bookSave: (id, bookId, data) => rpc('didako_cm_book_save', { p_id: str(id), p_book: str(bookId), p_data: data }),
    bookDel: (id, bookId) => rpc('didako_cm_book_del', { p_id: str(id), p_book: str(bookId) }),
    report: (id, reason, note) => rpc('didako_cm_report', { p_id: str(id), p_reason: str(reason), p_note: str(note) })
  };
})();
