// 디다코 공동체의 데모 자료를 맞추고 책장을 채운다. 디다코 교회(app/)의 데모 자료(demo-data.js)에서 예시 교재를 빼고,
// 질문으로 묵상하기 연재(../note/walks-data.js의 window.WALKS)를 교회 앱의 교재 모양으로 바꿔 꽂는다.
// 디다코 기본 교재(book-trinity.js, book-family.js, book-jesus-walk.js)는 그대로 둔다. 이 파일은 그 파일들 다음에 읽는다.
// 표지는 노트 서가와 같은 연재 표지 그림(w.cover)을 쓴다(2026-11-22: 예전에는 무늬+색만 써서 연재 70여 권이 모두 세 겹 끈으로 똑같이 보였다).
// 그림 바탕색과 책등·책 안 색은 그림에서 뽑아 아래 표에 둔다. 표에 없는 새 연재는 표를 채우기 전까지 무늬+색 표지로 보인다.
(function () {
  const D = window.DIDAKO_DEMO, W = window.WALKS || [];
  const BASIC = ['trinity', 'family', 'jesus-walk', 'hebrew-eyes', 'second-temple', 'feasts', 'gospel', 'lords-prayer'];
  // 연재 표지 그림의 바탕색과 책등·책 안 색: id: [바탕, 진한 색]. 새 연재의 표지를 note/img/walk/에 넣으면 여기에도 한 줄 더한다
  const ART = {
    'habakkuk': ['#C9B69F', '#876A47'],
    'genesis-1': ['#C19E96', '#794E44'],
    'genesis-2': ['#C9A89F', '#875547'],
    'genesis-3': ['#B5958E', '#684841'],
    'genesis-4': ['#CBABA2', '#8A5749'],
    'jonah': ['#B7C2BA', '#657A6B'],
    'mark-1': ['#ADB3C5', '#586280'],
    'mark-2': ['#C5A2AD', '#814C5D'],
    'mark-3': ['#B6BE9E', '#6C764C'],
    'john-1': ['#B7A7C1', '#6C537B'],
    'john-2': ['#A1BCC1', '#4D747B'],
    '1chronicles': ['#8BB4BF', '#3C6874'],
    '1corinthians': ['#ABBCC6', '#557182'],
    '1john': ['#C091A0', '#774052'],
    '1kings': ['#C7AEB4', '#845762'],
    '1peter': ['#C3BEA2', '#7E764D'],
    '1samuel': ['#ADC6B5', '#578265'],
    '1thessalonians': ['#8DC08F', '#3D763F'],
    '1timothy': ['#A79FC2', '#564B7C'],
    '2chronicles': ['#C090AC', '#773F60'],
    '2corinthians': ['#C091B3', '#774068'],
    '2john': ['#A6C39F', '#547E4A'],
    '2kings': ['#B1C39D', '#647D49'],
    '2peter': ['#71A3A6', '#355759'],
    '2samuel': ['#9392C0', '#424177'],
    '2thessalonians': ['#C6BAAF', '#826D59'],
    '2timothy': ['#BFB38C', '#74673D'],
    '3john': ['#929AC0', '#414A77'],
    'acts-1': ['#C3B0A1', '#7E624C'],
    'acts-2': ['#C8B8A8', '#866B50'],
    'amos': ['#C0AC8C', '#76603C'],
    'colossians': ['#9CC3C3', '#487D7D'],
    'daniel': ['#BF9195', '#764045'],
    'deuteronomy': ['#A98EC0', '#5C3E76'],
    'ecclesiastes': ['#9EB2C2', '#4A667C'],
    'elijah': ['#CDB8BE', '#8C5F6C'],
    'ephesians': ['#8DA0BF', '#3D5275'],
    'esther': ['#BEA289', '#72553B'],
    'exodus-1': ['#C8C4A0', '#857F49'],
    'exodus-2': ['#D1CCA7', '#958C49'],
    'ezekiel': ['#98B8C2', '#456E7B'],
    'ezra': ['#B4C7AA', '#648453'],
    'galatians': ['#BEC7AB', '#758454'],
    'haggai': ['#C39FB6', '#7E4A6B'],
    'hebrews': ['#91C09D', '#40774E'],
    'hosea': ['#99C3A9', '#457D5A'],
    'isaiah-1': ['#86BFAF', '#387362'],
    'isaiah-2': ['#96C5B6', '#427F6C'],
    'james': ['#C7ADBD', '#845672'],
    'jeremiah': ['#B4A0C2', '#684C7C'],
    'job': ['#9CC3BF', '#487D78'],
    'joel': ['#B3ABC5', '#635581'],
    'joshua': ['#C6C4AE', '#827E58'],
    'jude': ['#C6B2AB', '#826155'],
    'judges': ['#8FACC0', '#3E6077'],
    'lamentations': ['#C0BC90', '#77723F'],
    'leviticus': ['#C6AEC6', '#825882'],
    'luke-1': ['#A4C4B5', '#4F7F69'],
    'luke-2': ['#A6C8BB', '#4E8671'],
    'malachi': ['#BDC18E', '#73783D'],
    'matthew-1': ['#BF91C0', '#764077'],
    'matthew-2': ['#C695C5', '#81407F'],
    'micah': ['#ACC08E', '#60763E'],
    'nahum': ['#A2A4C2', '#4E517C'],
    'nehemiah': ['#A0AAC2', '#4C5A7C'],
    'numbers': ['#8BC0BC', '#3C7571'],
    'obadiah': ['#B48EBF', '#693E75'],
    'philemon': ['#9D8FBF', '#4F3F75'],
    'philippians': ['#C2A2A3', '#7C4E4F'],
    'proverbs': ['#B4BF8E', '#69753E'],
    'psalms-1': ['#C3A0C3', '#7E4B7E'],
    'psalms-2': ['#CAABC9', '#895287'],
    'psalms-3': ['#BD97BD', '#744674'],
    'psalms-4': ['#CDB0CC', '#8E558C'],
    'psalms-5': ['#B98EB8', '#6D406C'],
    'revelation': ['#ABC6B9', '#55826C'],
    'romans': ['#A1C08D', '#53763D'],
    'ruth': ['#BF948E', '#75453E'],
    'song': ['#C2A6A1', '#7C544D'],
    'titus': ['#A4C6C2', '#4E827C'],
    'zechariah': ['#A8C4C6', '#527F82'],
    'zephaniah': ['#8AC1A3', '#3A7756']
  };
  // 그림이 없는 연재만 쓰는 예비 무늬와 색(covers.js의 기본 묶음). 목록에 없으면 세 겹 끈·종이색
  const COVER = {};
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
    const part = (/-(\d+)$/.exec(w.id) || [])[1], cover = COVER[w.id] || ['cord', 'paper'], art = w.cover && ART[w.id], now = w.id === ROOM_BOOK ? NOW : 0;
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
      id: w.id, title: w.title, group: 'walk', period: '', closed: false, kind: '자유 모임', cover: { motif: cover[0], color: cover[1] }, coverImg: art ? '../note/' + w.cover : '', coverBg: art ? art[0] : '', coverMain: art ? art[1] : '', coverName: UNDER[w.book] || w.book,
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
