// 디다코 공동체의 데모 자료를 맞추고 책장을 채운다. 디다코 교회(app/)의 데모 자료(demo-data.js)에서 예시 교재를 빼고,
// 질문으로 묵상하기 연재(../note/walks-data.js의 window.WALKS)를 교회 앱의 교재 모양으로 바꿔 꽂는다.
// 디다코 기본 교재(book-gospel.js, book-prophets.js)는 그대로 둔다. 이 파일은 그 파일들 다음에 읽는다.
// 표지는 교회 방식(무늬 + 색, 세 겹 끈)이고 연재 표지 그림(cover)은 쓰지 않는다(결정 기록 2026-11-12 교재 쓰기 줄).
(function () {
  const D = window.DIDAKO_DEMO, W = window.WALKS || [];
  const BASIC = ['gospel', 'prophets'];
  // 연재마다 표지 무늬와 색(covers.js의 기본 묶음에서 고른다). 목록에 없는 연재는 세 겹 끈·종이색
  const COVER = {
    habakkuk: ['lattice', 'ink'], 'genesis-1': ['leaf', 'green'], 'genesis-2': ['star', 'blue'], 'genesis-3': ['wave', 'paper'], 'genesis-4': ['cord', 'amber'],
    jonah: ['wave', 'blue'], 'mark-1': ['rays', 'amber'], 'mark-2': ['cord', 'rose'], 'mark-3': ['lattice', 'rose'], 'john-1': ['rays', 'paper'], 'john-2': ['leaf', 'green']
  };
  // 데모에서 공동체가 함께 걷는 책과 지금 편(모임장이 정한 것으로 친다)
  const ROOM_BOOK = 'habakkuk', NOW = 3;

  D.books = D.books.filter(b => BASIC.includes(b.id));
  // 교회에만 있는 자료(부서·사랑방 명단, 관리, 예시 교재로 쓴 예시 기록)는 뺀다. 공동체 이름과 사람은 index.html의 내 공동체 자료가 채운다
  delete D.admin; D.records = []; D.rooms = { mine: { name: '', leader: '', coLeader: '', members: [], pending: [] } }; D.church = { dept: '', room: '' };
  Object.keys(D.guides).forEach(k => { if (!BASIC.includes(k.split(':')[0])) delete D.guides[k]; });

  const walks = W.map(w => {
    const part = (/-(\d+)$/.exec(w.id) || [])[1], cover = COVER[w.id] || ['cord', 'paper'], now = w.id === ROOM_BOOK ? NOW : 0;
    w.eps.forEach(ep => {
      const key = w.id + '-' + ep.n;
      D.guides[w.id + ':' + ep.n] = {
        stages: [
          { name: '본문 읽기', qs: [{ id: key + '-read', kind: 'read', h: '', t: ep.read }] },
          { name: '보기', qs: [{ id: key + '-look', t: ep.look }] },
          { name: '묵상', qs: [{ id: key + '-ask', t: ep.ask }] },
          { name: '풀이', qs: [{ id: key + '-p', kind: 'read', h: '', t: (ep.p || []).join('\n\n') }] },
          { name: '머묾', qs: [{ id: key + '-stay', kind: 'read', h: '', t: ep.stay }] }
        ],
        triple: []
      };
    });
    return {
      id: w.id, title: w.title, group: 'walk', period: '', closed: false, kind: '자유 모임', cover: { motif: cover[0], color: cover[1] }, coverName: w.book,
      range: w.book + (part ? ' ' + part + '부' : ''),
      lessons: w.eps.map(ep => ({ no: ep.n, name: ep.title, ref: ep.ref, date: '', state: !now ? 'upcoming' : ep.n < now ? 'past' : ep.n === now ? 'now' : 'upcoming', body: '' }))
    };
  });
  D.books = walks.concat(D.books);

  const book = walks.find(b => b.id === ROOM_BOOK) || walks[0];
  if (!book) return;
  const last = book.lessons.find(l => l.no === NOW - 1), cur = book.lessons.find(l => l.no === NOW) || book.lessons[0];
  D.roomBook = book.id;
  D.thisWeek = { date: '', main: { book: book.id, no: cur.no } };
  // 아래 지난 주 실천과 예시 문장은 지어낸 것이다
  D.lastWeek = { lesson: last ? `제${last.no}과 · ${last.name}` : '', action: '이해되지 않는 일 하나를 그대로 적어 두기' };
  D.sampleKeep = { sentence: '묻기 전에 먼저 하나님을 불렀다는 말이 오래 남았다.', action: '기도를 시작할 때 내가 아는 하나님을 먼저 불러 보기', ref: cur.ref };
})();
