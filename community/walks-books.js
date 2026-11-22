// 디다코 공동체의 데모 자료를 맞추고 책장을 채운다. 디다코 교회(app/)의 데모 자료(demo-data.js)에서 예시 교재를 빼고,
// 질문으로 묵상하기 연재(../note/walks-data.js의 window.WALKS)를 교회 앱의 교재 모양으로 바꿔 꽂는다.
// 디다코 기본 교재(book-trinity.js, book-family.js, book-jesus-walk.js)는 그대로 둔다. 이 파일은 그 파일들 다음에 읽는다.
// 표지는 교회 방식(무늬 + 색, 세 겹 끈)이고 연재 표지 그림(cover)은 쓰지 않는다(결정 기록 2026-11-12 교재 쓰기 줄).
(function () {
  const D = window.DIDAKO_DEMO, W = window.WALKS || [];
  const BASIC = ['trinity', 'family', 'jesus-walk', 'hebrew-eyes', 'second-temple'];
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

  // 책장 순서(2026-11-22): 연재 데이터는 쓴 순서로 쌓여 있으니 성경 순서로 세운다. 주제 연재 '엘리야'는 열왕기상 17~22장이라 열왕기상 바로 뒤에 두고, 책 이름도 열왕기상으로 쓴다(노트 서가와 같게)
  const ORDER = '창세기 출애굽기 레위기 민수기 신명기 여호수아 사사기 룻기 사무엘상 사무엘하 열왕기상 열왕기하 역대상 역대하 에스라 느헤미야 에스더 욥기 시편 잠언 전도서 아가 이사야 예레미야 예레미야애가 에스겔 다니엘 호세아 요엘 아모스 오바댜 요나 미가 나훔 하박국 스바냐 학개 스가랴 말라기 마태복음 마가복음 누가복음 요한복음 사도행전 로마서 고린도전서 고린도후서 갈라디아서 에베소서 빌립보서 골로새서 데살로니가전서 데살로니가후서 디모데전서 디모데후서 디도서 빌레몬서 히브리서 야고보서 베드로전서 베드로후서 요한일서 요한이서 요한삼서 유다서 요한계시록'.split(' ');
  const UNDER = { '엘리야': '열왕기상' };
  const pos = w => { const i = ORDER.indexOf(UNDER[w.book] || w.book); return (i < 0 ? ORDER.length : i) * 100 + (UNDER[w.book] ? 50 : 0) + Number((/-(\d+)$/.exec(w.id) || [])[1] || 0); };
  const walks = W.slice().sort((a, b) => pos(a) - pos(b)).map(w => {
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
      id: w.id, title: w.title, group: 'walk', period: '', closed: false, kind: '자유 모임', cover: { motif: cover[0], color: cover[1] }, coverName: UNDER[w.book] || w.book,
      range: UNDER[w.book] ? UNDER[w.book] + ' · ' + w.book : w.book + (part ? ' ' + part + '부' : ''),
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
