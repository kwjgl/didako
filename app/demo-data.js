// 디다코 데모 자료. 시안 README "시안 공통 예시"와 같은 내용이고, 이름과 내용은 모두 지어낸 예시다.
// 성경 본문은 싣지 않고 장절만 쓴다. 다음 화면들(책장, 내 기록, 사랑방 등), 우리 가정도 이 한 곳을 같이 쓴다.
// 오늘은 10월 22일(목)이고, 이번 주 과는 10월 25일 주일의 요한복음 제3과다.
window.DIDAKO_DEMO = {
  today: '10월 22일(목)',
  // 위쪽 배지: 회원·리더는 사랑방, 목사님·관리자는 부서를 보인다(설계서 7장 시안끼리 맞추는 약속)
  church: { dept: '청장년부', room: '2-20 사랑방' },
  // state: past 지났음 / now 이번 주 / prep 준비 중(회원 목차에는 아직 안 보임) / upcoming 다가오는 과
  // 책장(shelf)이 쓰는 것: kind 종류(GBS·새가족반), cover 표지(상징 motif × 색 color, app/covers.js), range 본문 범위,
  //  과의 body(검색에 쓰는 쉬운 풀이. 성경 본문이 아니다), keep(그 과에서 오늘 남길 것을 남겼는가. 책갈피 끈이 길어지지만 숫자로는 보이지 않는다), mine(남긴 한 문장. 지난 책의 마지막 장에만 모인다)
  // 사랑방이 함께 읽는 교재. 처음에는 이것이 지금 읽는 책으로 놓인다
  roomBook: 'john',
  books: [
    {
      id: 'john', title: '요한복음', period: '2026년 9월부터', closed: false, kind: 'GBS', cover: { motif: 'cord', color: 'paper' }, range: '요한복음 1~15장',
      lessons: [
        { no: 1, name: '빛으로 오신 분', ref: '요한복음 1:1~14', date: '10월 11일 주일', state: 'past', body: '말씀이 사람이 되어 우리 가운데 오셨다는 이야기를 함께 살펴봐요.', keep: true, mine: '어둠 속에서도 빛은 꺼지지 않는다는 말이 위로가 됐다.' },
        { no: 2, name: '생명의 떡', ref: '요한복음 6:35~51', date: '10월 18일 주일', state: 'past', body: '배고픈 사람들이 떡을 찾아올 때, 예수님이 진짜 필요한 것을 말씀하세요.', keep: true, mine: '필요한 것만 구하던 나를 돌아보게 됐다.' },
        { no: 3, name: '참포도나무', ref: '요한복음 15:1~8', date: '10월 25일 주일', state: 'now', intro: '예수님께 붙어 있을 때 어떤 열매가 맺히는지, 이번 주 말씀을 함께 살펴봐요.', body: '예수님께 붙어 있을 때 어떤 열매가 맺히는지 살펴봐요.' },
        { no: 4, name: '성령을 약속하신 예수님', ref: '요한복음 16:5~15', date: '11월 1일 주일', state: 'prep', body: '예수님이 떠나신 뒤에도 성령님이 함께하신다는 약속을 살펴봐요.' }
      ]
    },
    {
      id: 'fam', title: '새가족반 기초 · 처음 만나는 교회', period: '2026년 9월부터', closed: false, kind: '새가족반', cover: { motif: 'leaf', color: 'green' }, range: '마태복음 · 에베소서',
      lessons: [
        { no: 1, name: '예수님은 누구신가요', ref: '마태복음 16:13~20', date: '10월 11일 주일', state: 'past', body: '제자들이 예수님을 누구라고 고백하는지 따라가 봐요.', keep: true, mine: '나는 예수님을 누구라고 말할 수 있을까 생각했다.' },
        { no: 2, name: '은혜로 받은 구원', ref: '에베소서 2:8~10', date: '10월 18일 주일', state: 'past', body: '구원은 내가 얻은 것이 아니라 선물로 받은 것이라는 이야기예요.' },
        { no: 3, name: '새 사람으로 살기', ref: '에베소서 4:22~24', date: '10월 25일 주일', state: 'now', body: '옛 모습을 벗고 새 사람을 입는다는 것이 어떤 모습인지 나눠요.' }
      ]
    },
    {
      id: 'genesis', title: '창세기', period: '2026년 9월부터', closed: false, kind: 'GBS', cover: { motif: 'wave', color: 'blue' }, range: '창세기 1~22장 일부',
      lessons: [
        { no: 1, name: '빛이 있으라', ref: '창세기 1:1~5', date: '10월 4일 주일', state: 'past', body: '혼돈 가운데서 질서와 빛이 시작되는 장면이에요.', keep: true, mine: '말씀으로 시작되는 하루를 생각했다.' },
        { no: 2, name: '아브람의 부르심', ref: '창세기 12:1~9', date: '11월 8일 주일', state: 'upcoming', intro: '아브람이 익숙한 곳을 떠나 부르심을 따라 나서는 이야기를 함께 살펴봐요.', body: '아브람이 익숙한 곳을 떠나 부르심을 따라 나서는 이야기예요.' }
      ]
    },
    {
      id: 'mark', title: '마가복음', period: '2026.3~4', closed: true, kind: 'GBS', cover: { motif: 'lattice', color: 'ink' }, range: '마가복음 1~9장',
      lessons: [
        { no: 1, name: '광야의 소리', ref: '마가복음 1:1~13', date: '3월 8일 주일', state: 'past', body: '길을 예비하는 사람과 광야에서 시작되는 예수님의 일을 살펴봐요.', mine: '시작은 조용한 광야에서였다는 것이 마음에 남는다.' },
        { no: 2, name: '그물을 버려두고', ref: '마가복음 1:14~20', date: '3월 15일 주일', state: 'past', body: '고기 잡던 이들이 부르심을 듣고 따라나선 이야기예요.', mine: '내가 붙들고 있는 그물이 무엇인지 생각해 본다.' },
        { no: 3, name: '일어나 걸어가라', ref: '마가복음 2:1~12', date: '3월 22일 주일', state: 'past', body: '친구들이 지붕을 뚫어 데려온 사람이 일어나 걷게 되는 이야기예요.' },
        { no: 4, name: '폭풍 속의 평안', ref: '마가복음 4:35~41', date: '3월 29일 주일', state: 'past', body: '거센 바람 속에서도 배 안에 함께 계신 예수님을 만나요.', mine: '배 안에 함께 계시다는 것만으로 충분하다.' },
        { no: 5, name: '어린아이를 받아들이면', ref: '마가복음 9:33~37', date: '4월 5일 주일', state: 'past', body: '누가 크냐는 다툼 속에서 작은 사람을 안으시는 예수님을 봐요.', mine: '작은 사람을 먼저 보는 눈을 구한다.' }
      ]
    },
    {
      id: 'psalms', title: '시편 묵상', period: '2025.11~2026.1', closed: true, kind: 'GBS', cover: { motif: 'star', color: 'rose' }, range: '시편 1·23·103·130편',
      lessons: [
        { no: 1, name: '복 있는 사람', ref: '시편 1:1~6', date: '12월 7일 주일', state: 'past', body: '말씀을 즐거워하는 사람이 어떤 나무와 같은지 살펴봐요.', mine: '가까이 두는 것이 나를 만든다.' },
        { no: 2, name: '주는 나의 목자', ref: '시편 23:1~6', date: '12월 14일 주일', state: 'past', body: '목자이신 하나님과 함께 걷는 길을 그려 봐요.', mine: '부족함이 없다는 말을 천천히 읽어 본다.' },
        { no: 3, name: '깊은 곳에서', ref: '시편 130:1~8', date: '12월 21일 주일', state: 'past', body: '깊은 곳에서 부르짖는 기도와 기다림에 대해 나눠요.', mine: '기다림도 믿음의 한 모양일 수 있겠다고 느꼈다.' },
        { no: 4, name: '내 영혼아 찬양하라', ref: '시편 103:1~5', date: '12월 28일 주일', state: 'past', body: '받은 은혜를 하나씩 떠올리며 찬양하는 시간이에요.', mine: '잊지 않는 것도 감사의 한 모습이다.' }
      ]
    },
    {
      id: 'thanks', title: '추수감사 가정예배', period: '2026년 가을', closed: false, kind: '가정예배', cover: { motif: 'rays', color: 'amber' }, range: '신명기 8장',
      lessons: [
        { no: 1, name: '감사로 차린 식탁', ref: '신명기 8:7~10', date: '11월 15일 주일 즈음', state: 'now', intro: '한 해 동안 받은 것을 떠올리며 식탁에서 함께 감사해요.', body: '좋은 땅으로 이끄신 하나님을 기억하고, 배불리 먹은 뒤 감사하라는 이야기예요.' }
      ]
    }
  ],
  // 이번 주(10월 25일 주일)의 과. main은 요한복음 제3과
  thisWeek: {
    date: '10월 25일 주일',
    main: { book: 'john', no: 3 }
  },
  // 지난주 작은 실천(내가 지난주 모임 끝에 남긴 것)과 "오늘 남길 것" 예시
  lastWeek: { lesson: '제2과 · 생명의 떡', action: '식사 전에 가족에게 먼저 고마운 일 하나 말하기' },
  sampleKeep: { sentence: '붙어 있는 것이 먼저라는 말이 오래 남았다.', action: '출근길에 15장을 한 번 더 읽기', ref: '요한복음 15:1~8' },
  // 과의 질문(펼치기·나눔하기가 같이 쓴다). 키는 "교재:과 번호". 지금은 이번 주 과(요한복음 제3과)만 있다.
  // id는 질문 ID(순서가 바뀌어도 내 생각과 책갈피가 이어지게). sample은 설정의 '예시 채우기'에만 쓴다. 성경 본문은 싣지 않고 장절만 쓴다
  openLines: ['아버지께서 주신 말씀을', '말씀이 가리키는 예수님 안에서', '성령님이 깨닫게 해 주시기를'],
  guides: {
    'thanks:1': {
      stages: [
        { name: '마음 열기', qs: [
          { id: 'h1', t: '올해 우리 집 식탁에서 가장 고마웠던 순간은 언제였나요?', sample: '아이가 처음으로 식사 기도를 했던 날이요.' } ] },
        { name: '말씀 보기', qs: [
          { id: 'h2', t: '이 본문은 하나님이 어떤 땅으로 이끄신다고 말하나요? 눈에 띄는 것을 함께 찾아봐요.', sample: '물이 흐르고 먹을 것이 넉넉한 땅이라고 해요.' },
          { id: 'h3', t: '배불리 먹은 뒤에 무엇을 하라고 하나요? 왜 그때 그렇게 하라고 했을까요?', sample: '하나님을 찬양하라고 해요. 배부를 때 잊기 쉬워서인 것 같아요.' } ] },
        { name: '함께 감사하기', qs: [
          { id: 'h4', t: '서로에게 고마운 것 하나씩, 하나님께 감사한 것 하나씩 말해 봐요.', sample: '늘 먼저 일어나 아침을 챙겨 줘서 고마워요.' } ] }
      ],
      triple: []
    },
    'john:3': {
      guide: '한 질문마다 두세 사람이 말하면 충분해요. 정답을 맞히는 모임이 아니에요. 마칠 때는 이번 주 작은 실천 하나를 정하고 짧게 기도해요.',
      stages: [
        { name: '마음 열기', qs: [
          { id: 'm1', t: '요즘 나는 무엇에 연결되어 있을 때 마음이 가장 든든한가요?', sample: '가족과 저녁을 먹으며 하루 이야기를 나눌 때요.' } ] },
        { name: '말씀 관찰', qs: [
          { id: 'o1', t: '이 본문에 나오는 포도나무, 농부, 가지는 각각 누구를 가리키나요?',
            sub: '예수님이 자신을 어떻게 소개하시는지, 아버지께서 어떤 일을 하시는지 먼저 찾아보세요.',
            vs: ['요한복음 10:11', '이사야 5:1~2'],
            sample: '포도나무는 예수님, 농부는 아버지, 가지는 우리라고 말하는 것 같아요.',
            lead: '비유에서 낯선 말은 하나씩 짚어 가세요. 포도나무는 예수님, 농부는 아버지, 가지는 믿는 사람이라는 큰 그림이면 충분해요. 정답을 맞히는 시간이 아니라, 본문이 말하는 것을 함께 확인하는 시간이에요.' },
          { id: 'o2', t: '"붙어 있다"는 말은 몇 번쯤 반복되나요? 붙어 있는 가지와 떨어진 가지는 어떻게 다른가요?',
            sample: '붙어 있는 가지는 열매를 맺고, 떨어진 가지는 마른다고 말하는 것 같아요.',
            lead: '반복되는 말은 본문이 강조하는 말이에요. 붙어 있음의 결과가 "열매"라는 점을 함께 찾아보세요.' },
          { id: 'o3', t: '농부는 열매 맺는 가지에게도 무언가를 하세요. 그것은 무엇이고, 왜 그러실까요?',
            sub: '가지를 다듬는 일을 벌이나 형벌로만 읽지 말고, 농부의 마음이 어디를 향하는지 살펴보세요.',
            vs: ['요한복음 15:2'],
            sample: '가지를 다듬으세요. 더 많은 열매를 맺게 하시려는 마음 때문인 것 같아요.',
            lead: '다듬는 일이 아프게 느껴질 수 있다는 점을 인정해 주세요. 농부가 더 많은 열매를 바라신다는 방향을 함께 확인하면 돼요.' } ] },
        { name: '말씀 해석', qs: [
          { id: 'i1', t: '이 본문이 말하는 열매는 어떤 모습일까요? 내가 맺고 싶은 열매를 말해 보세요.',
            sample: '화를 덜 내고, 가족에게 먼저 고마움을 말하는 사람이 되고 싶어요.',
            lead: '열매를 성과나 숫자로 말하기 쉬워요. 본문 안에서 열매와 이어진 말(기쁨, 사랑 같은 것)이 있는지 함께 살펴보세요.' } ] },
        { name: '삶에 적용', qs: [
          { id: 'a1', t: '이번 주, 예수님께 붙어 있기 위해 할 수 있는 작은 일 하나는 무엇인가요?',
            sample: '아침에 휴대폰을 보기 전에 일 분만 조용히 앉아 있기.',
            lead: '크고 어려운 결심보다 이번 주 안에 할 수 있는 작은 일이 좋아요. 리더가 먼저 자기 것을 말해 주면 편안해져요.' },
          { id: 'a2', t: '농부가 가지를 다듬듯이, 내 생활에서 덜어 내면 좋을 것이 있다면 무엇일까요?',
            sub: '부끄러워할 필요 없이, 나누고 싶은 만큼만 이야기해도 괜찮아요.',
            sample: '잠들기 전에 휴대폰을 오래 보는 습관을 줄이고 싶어요.',
            lead: '여기서는 서로의 이야기를 평가하지 않고 들어 주세요. 말하기 어려운 분은 넘어가도 좋아요.' } ] }
      ],
      triple: [
        { id: 'tri-0', who: '아버지', t: '이 본문에서 알 수 있는 하나님은 어떤 분이신가요?', sample: '끝까지 가지를 돌보시는 농부 같은 분이에요.' },
        { id: 'tri-1', who: '아들', t: '이 본문은 예수님을 어떻게 가리키나요?', sample: '참포도나무가 바로 예수님이라고 말해 줘요.' },
        { id: 'tri-2', who: '성령', t: '오늘 성령님은 나를 어디로 이끄시는 것 같나요?', sample: '바쁜 중에도 잠깐 멈추고 말씀 앞에 앉는 쪽으로요.' }
      ]
    }
  },
  // 내 기록의 예시(시안 record.html과 같은 내용. 모두 지어낸 것). 달마다 한 덩어리이고, 과 제목·장절·날짜는 위 books와 같다.
  //  keep 오늘 남긴 한 문장 / action 작은 실천 / reflection 돌아보기 / answers 미리 쓴 답 / threads 깊이 묵상하기 답(아버지·아들·성령 가닥별)
  //  이번 주에 직접 쓴 것은 여기에 없고, 나눔하기를 마치면 기기에 남은 글로 앱이 맨 위에 더한다(index.html)
  records: [
    { year: 2025, month: 4, book: '요한복음 · 2025.3~6', entries: [
      { id: 'old-john-15', date: '4월 13일', title: '참포도나무', ref: '요한복음 15:1~8', keep: '오래전 받은 친절을 오늘 다시 떠올렸다.', action: '먼저 안부를 묻고 이야기를 천천히 듣기', reflection: '먼저 건넨 안부가 오래된 다정함을 다시 불러왔다.',
        threads: { 아버지: ['관계를 오래 돌보시는 마음을 떠올렸다.'], 아들: ['먼저 사랑을 건네신 모습을 생각했다.'], 성령: ['받은 친절을 오늘의 다정함으로 잇게 도와주시길 구했다.'] } } ] },
    { year: 2025, month: 12, book: '시편 묵상 · 2025.11~2026.1', entries: [
      { id: 'a1', date: '12월 7일', title: '복 있는 사람', ref: '시편 1:1~6', keep: '가까이 두는 것이 나를 만든다.', action: '아침에 잠깐 창가에 앉아 읽기', reflection: '바쁜 아침에도 잠깐 멈추니 하루가 달라졌다.',
        answers: [{ q: '깊이 묵상하기 · 아버지', a: '조급한 마음도 살펴 주신다는 생각이 들었다.' }, { q: '깊이 묵상하기 · 성령', a: '오늘 해야 할 일을 하나씩 바라보게 도와주셨다.' }],
        threads: { 아버지: ['내가 기대어 쉴 곳을 다시 생각했다.'], 아들: ['말씀을 삶으로 이어 가는 모습을 떠올렸다.'], 성령: ['조용히 머무는 시간을 허락해 달라고 기도했다.'] } },
      { id: 'a2', date: '12월 14일', title: '주는 나의 목자', ref: '시편 23:1~6', keep: '부족함이 없다는 말을 천천히 읽어 본다.', action: '걱정 하나를 가족에게 솔직히 말하기',
        threads: { 아버지: ['필요를 살피시는 분을 생각했다.'], 아들: ['함께 걸으시는 사랑을 떠올렸다.'], 성령: ['먼저 듣는 사람이 되고 싶다.'] } },
      { id: 'a3', date: '12월 21일', title: '깊은 곳에서', ref: '시편 130:1~8', keep: '기다림도 믿음의 한 모양일 수 있겠다고 느꼈다.', action: '급한 답을 재촉하지 않고 하루 기다리기', reflection: '기다리는 동안 친구의 이야기를 더 잘 들었다.', threads: {} } ] },
    { year: 2026, month: 10, book: '요한복음 · 2026년 9월부터', entries: [
      { id: 'c1', date: '10월 11일', title: '빛으로 오신 분', ref: '요한복음 1:1~14', keep: '어둠 속에서도 빛은 꺼지지 않는다는 말이 위로가 됐다.', action: '휴대폰을 내려두고 저녁 식사 함께하기', reflection: '짧은 식사였지만 서로의 하루를 들었다.',
        answers: [{ q: '깊이 묵상하기 · 아들', a: '어둠 속에도 먼저 오신 사랑을 떠올렸다.' }],
        threads: { 아버지: ['시작을 여시는 분을 떠올렸다.'], 아들: ['내 삶 가까이 오신 분을 생각했다.'], 성령: ['익숙한 말에서 새 의미를 발견했다.'] } },
      { id: 'c2', date: '10월 18일', title: '생명의 떡', ref: '요한복음 6:35~51', keep: '필요한 것만 구하던 나를 돌아보게 됐다.', action: '식사 전에 가족에게 먼저 고마운 일 하나 말하기',
        threads: { 아버지: ['필요를 채워 주시는 마음을 생각했다.'], 아들: ['생명의 떡으로 오신 분을 떠올렸다.'], 성령: ['감사를 먼저 말할 용기를 구했다.'] } } ] },
    { year: 2026, month: 10, book: '새가족반 · 2026년 9월부터', entries: [
      { id: 'newcomer-1', date: '10월 11일', title: '예수님은 누구신가요', ref: '마태복음 16:13~20', keep: '예수님이 누구신지 내 말로 고백해 보고 싶다.', action: '오늘 만난 한 분에게 교회에 나온 이야기를 먼저 묻기',
        threads: { 아들: ['제자들의 고백을 따라 내 고백을 생각했다.'], 성령: ['고백이 머리에서 마음으로 내려오길 구했다.'] } } ] }
  ],
  // 명단. 사랑방 화면에서 쓴다. 이름과 연결 상태만 있고 기록과 관련된 것은 없다
  rooms: {
    mine: {
      name: '2-20 사랑방',
      leader: '김도윤',
      coLeader: '이서연',
      members: ['박민재(나)', '정하늘', '최우진', '한지우', '오다온', '서하준', '문채원'],
      pending: [{ name: '윤서준', nick: '서준아빠' }, { name: '강나은', nick: '나은' }]
    },
    others: { '2부': ['2-21', '2-22'], '1부': ['1-12', '1-13'] }
  },
  // 관리 화면(A-01). 지어낸 예시다. 명단은 이름·소속·역할·연결 상태만 있고 기록과 관련된 것은 없다
  admin: {
    church: '예시교회', code: 'YESI-2026',
    kinds: [['GBS', '사랑방 소그룹 성경공부', true], ['가정예배', '우리 가정이 함께 읽는 가정예배지', true], ['새가족반', '새로 온 가족과 함께, 보통 6주', false], ['주일학교 공과', '반마다 교사와 함께', false]],
    outKinds: [['신우회', '일터에서 모이는 신앙 모임'], ['캠퍼스', '학교에서 모이는 모임']],
    outs: [{ name: '예시 신우회', kind: '신우회', pastor: '박성은 전도사님' }],
    depts: [
      { name: '청장년부', group: '사랑방', unit: 'family', rooms: [
        { name: '2-20 사랑방', leader: '김도윤', co: '이서연', n: 9 }, { name: '2-21 사랑방', leader: '배지훈', co: '송예은', n: 10, members: ['권도현', '남궁하린', '신유찬', '표지안', '노은서', '백승우', '허다인', '류시온'] },
        { name: '2-22 사랑방', leader: '안태오', co: '홍세아', n: 7, members: ['조하람', '엄지호', '석보민', '진서율', '하윤재'] }, { name: '1-12 사랑방', leader: '장민호', co: '정유진', n: 6, members: ['마은솔', '탁건우', '길나래', '편도하'] },
        { name: '1-13 사랑방', leader: '오세진', co: '차은별', n: 8, members: ['육시현', '방예준', '도해솔', '인가람', '소민결', '변하율'] }] },
      { name: '청년부', group: '순', unit: 'single', rooms: [
        { name: '김하늘 순', leader: '김하늘', co: '', n: 6 }, { name: '유다인 순', leader: '유다인', co: '', n: 5 }] }
    ],
    // 맡은 일이 있는 사람만. 이름·소속·맡은 일만 있다
    people: [
      { name: '고정민', where: '청장년부', roles: ['관리자'] },
      { name: '임수진', where: '청장년부', roles: ['관리자'] },
      { name: '한지혜', where: '청장년부', roles: ['교재 담당'] },
      { name: '장민호', where: '1-12 사랑방', roles: ['리더', '교재 담당'] },
      { name: '김도윤', where: '2-20 사랑방', roles: ['리더'] },
      { name: '이서연', where: '2-20 사랑방', roles: ['코리더'] },
      { name: '김하늘', where: '김하늘 순', roles: ['리더'] }
    ],
    nextYear: 2027
  },
  // 이번 주의 질문(이번 주 탭). 질문·말씀·고백은 note/questions-data.js의 weekly 1·2주와 같다.
  // 월~금 말씀과 말씀에서 찾아보기 물음은 AI 초안이고 교역자 확인 전이다(철학 ⑥·⑫). 성경 원문은 싣지 않고 장절과 대한성서공회 링크만 둔다
  weekWalk: [
  {
    "n": 1,
    "group": "위로",
    "title": "위로",
    "q": "살아서나 죽어서나, 나의 단 하나의 위로는 무엇인가요?",
    "refs": [
      "로마서 14장 7~9절",
      "고린도전서 6장 19~20절"
    ],
    "confess": "살아서도 죽어서도 나는 내 것이 아니라, 나를 값 주고 사 가신 예수님의 것이라고 교회는 고백해 왔어요. 그래서 어떤 일을 만나도 하나님이 아버지로서 나를 지켜 주신다는 것이 위로예요. 그 위로는 내가 잘해서가 아니라 예수님이 이미 이루신 일에서 와요.",
    "short": "살아서도 죽어서도 나는 내 것이 아니라 예수님의 것이에요",
    "base": "하이델베르크 1주일(1~2문) · 소요리문답 1문",
    "img": "../note/img/w/weekly-01.webp",
    "alt": "위로 주의 상징 정물: 의자에 개어 둔 따뜻한 담요, 곁에 켜진 등잔",
    "days": [
      {
        "d": "월",
        "ref": "로마서 14장 7~9절",
        "url": "https://www.bskorea.or.kr/bible/korbibReadpage.php?version=GAE&book=rom&chap=14&sec=7",
        "ask": "우리가 살아도 죽어도 누구의 것이라고 하나요?",
        "choices": ["우리 자신의 것","주의 것","세상의 것"],
        "answer": 1,
        "where": "로마서 14장 8절"
      },
      {
        "d": "화",
        "ref": "고린도전서 6장 19~20절",
        "url": "https://www.bskorea.or.kr/bible/korbibReadpage.php?version=GAE&book=1co&chap=6&sec=19",
        "ask": "우리 몸을 무엇이라고 부르나요?",
        "choices": ["흙으로 빚은 그릇","우리의 장막","성령의 전"],
        "answer": 2,
        "where": "고린도전서 6장 19절"
      },
      {
        "d": "수",
        "ref": "베드로전서 1장 18~19절",
        "url": "https://www.bskorea.or.kr/bible/korbibReadpage.php?version=GAE&book=1pe&chap=1&sec=18",
        "ask": "나를 무엇으로 사셨다고 말하나요?",
        "choices": ["은과 금","그리스도의 보배로운 피","우리의 착한 행실"],
        "answer": 1,
        "where": "베드로전서 1장 19절"
      },
      {
        "d": "목",
        "ref": "요한복음 10장 27~29절",
        "url": "https://www.bskorea.or.kr/bible/korbibReadpage.php?version=GAE&book=jhn&chap=10&sec=27",
        "ask": "아무도 빼앗을 수 없는 까닭을 무엇이라고 말하나요?",
        "choices": ["아버지께서 만물보다 크시기 때문에","양들이 스스로 강하기 때문에","우리가 늘 깨어 있기 때문에"],
        "answer": 0,
        "where": "요한복음 10장 29절"
      },
      {
        "d": "금",
        "ref": "마태복음 10장 29~31절",
        "url": "https://www.bskorea.or.kr/bible/korbibReadpage.php?version=GAE&book=mat&chap=10&sec=29",
        "ask": "참새와 머리털 이야기로 예수님은 무엇을 말씀하시나요?",
        "choices": ["작은 일은 마음 쓰지 말라","두려워하지 말라, 너희는 귀하다","새보다 부지런히 일하라"],
        "answer": 1,
        "where": "마태복음 10장 31절"
      }
    ]
  },
  {
    "n": 2,
    "group": "우리의 처지",
    "title": "사랑의 어려움",
    "q": "하나님과 이웃을 사랑하는 일이 왜 이렇게 어려울까요?",
    "refs": [
      "마태복음 22장 37~40절",
      "로마서 3장 10~12절"
    ],
    "confess": "하나님의 계명은 하나님을 온 마음으로 사랑하고 이웃을 내 몸처럼 사랑하라는 한 줄로 모인다고 교회는 고백해 왔어요. 그런데 이 말씀 앞에 서 보면 누구도 이것을 온전히 지키지 못하고, 마음 깊은 곳에서는 하나님과 이웃보다 나를 앞세우는 자신을 보게 된다고요. 그래서 계명은 내가 얼마나 도움이 필요한 사람인지 보여 주는 거울이라고 해요.",
    "short": "계명은 내게 도움이 필요하다는 걸 보여 줘요",
    "base": "하이델베르크 2주일(3~5문) · 소요리문답 42문",
    "img": "../note/img/w/weekly-02.webp",
    "alt": "사랑의 어려움 주의 상징 정물: 창빛을 비추는 작은 손거울",
    "days": [
      {
        "d": "월",
        "ref": "마태복음 22장 37~40절",
        "url": "https://www.bskorea.or.kr/bible/korbibReadpage.php?version=GAE&book=mat&chap=22&sec=37",
        "ask": "율법과 선지자가 무엇에 달려 있다고 하나요?",
        "choices": ["모세의 다섯 책","열 가지 제사","하나님 사랑과 이웃 사랑, 두 계명"],
        "answer": 2,
        "where": "마태복음 22장 40절"
      },
      {
        "d": "화",
        "ref": "신명기 6장 4~5절",
        "url": "https://www.bskorea.or.kr/bible/korbibReadpage.php?version=GAE&book=deu&chap=6&sec=4",
        "ask": "무엇을 다하여 하나님을 사랑하라고 하나요?",
        "choices": ["마음과 뜻과 힘","재물과 시간","말과 노래"],
        "answer": 0,
        "where": "신명기 6장 5절"
      },
      {
        "d": "수",
        "ref": "레위기 19장 17~18절",
        "url": "https://www.bskorea.or.kr/bible/korbibReadpage.php?version=GAE&book=lev&chap=19&sec=17",
        "ask": "이웃 사랑을 말하기 바로 앞에 무엇을 하지 말라고 하나요?",
        "choices": ["이웃의 밭에 들어가지 말라","원수를 갚거나 원망하지 말라","안식일에 일하지 말라"],
        "answer": 1,
        "where": "레위기 19장 18절"
      },
      {
        "d": "목",
        "ref": "로마서 3장 10~12절",
        "url": "https://www.bskorea.or.kr/bible/korbibReadpage.php?version=GAE&book=rom&chap=3&sec=10",
        "ask": "선을 행하는 사람이 얼마나 있다고 하나요?",
        "choices": ["믿는 사람 모두","절반쯤","하나도 없다"],
        "answer": 2,
        "where": "로마서 3장 12절"
      },
      {
        "d": "금",
        "ref": "로마서 7장 18~25절",
        "url": "https://www.bskorea.or.kr/bible/korbibReadpage.php?version=GAE&book=rom&chap=7&sec=18",
        "ask": "괴로워하던 바울은 마지막에 누구에게 감사하나요?",
        "choices": ["자기를 가르친 선생에게","예수 그리스도로 말미암아 하나님께","함께한 교회 사람들에게"],
        "answer": 1,
        "where": "로마서 7장 25절"
      }
    ]
  },
  {
    "n": 3,
    "group": "우리의 처지",
    "title": "죄의 뿌리",
    "q": "내 안의 못된 마음은 처음부터 있었던 걸까요?",
    "refs": [
      "창세기 1장 27절",
      "로마서 5장 12절"
    ],
    "confess": "하나님은 사람을 처음에 선하게, 하나님을 닮은 모습으로 지으셨다고 교회는 고백해 왔어요. 그런데 첫 사람이 하나님의 말씀을 어기면서 죄가 사람 안에 들어왔고, 그 연약함이 모든 사람에게 이어졌다고요. 그래서 우리는 스스로 이 마음을 고칠 수 없고, 하나님이 새롭게 해 주셔야 한다고 해요.",
    "short": "사람은 선하게 지어졌지만 죄로 연약해졌어요",
    "base": "하이델베르크 3주일(6~8문) · 소요리문답 10문, 13~18문",
    "img": "../note/img/w/weekly-03.webp",
    "alt": "죄의 뿌리 주의 상징 정물: 한 입 베어 문 열매, 화분 밖으로 엉킨 뿌리",
    "days": [
      {
        "d": "월",
        "ref": "창세기 1장 26~28절",
        "url": "https://www.bskorea.or.kr/bible/korbibReadpage.php?version=GAE&book=gen&chap=1&sec=26",
        "ask": "하나님은 사람을 누구의 형상대로 지으셨나요?",
        "choices": [
          "천사의 형상대로",
          "하나님의 형상대로",
          "땅의 형상대로"
        ],
        "answer": 1,
        "where": "창세기 1장 27절"
      },
      {
        "d": "화",
        "ref": "로마서 5장 12~14절",
        "url": "https://www.bskorea.or.kr/bible/korbibReadpage.php?version=GAE&book=rom&chap=5&sec=12",
        "ask": "한 사람으로 말미암아 세상에 무엇이 들어왔나요?",
        "choices": [
          "죄가 들어왔어요",
          "평안이 들어왔어요",
          "기쁨이 들어왔어요"
        ],
        "answer": 0,
        "where": "로마서 5장 12절"
      },
      {
        "d": "수",
        "ref": "창세기 3장 6~8절",
        "url": "https://www.bskorea.or.kr/bible/korbibReadpage.php?version=GAE&book=gen&chap=3&sec=6",
        "ask": "두 사람이 열매를 먹은 뒤 무엇을 알게 되었나요?",
        "choices": [
          "길을 잃은 것을",
          "배가 고픈 것을",
          "벗은 줄을"
        ],
        "answer": 2,
        "where": "창세기 3장 7절"
      },
      {
        "d": "목",
        "ref": "창세기 3장 16~19절",
        "url": "https://www.bskorea.or.kr/bible/korbibReadpage.php?version=GAE&book=gen&chap=3&sec=16",
        "ask": "사람은 결국 어디로 돌아간다고 하나요?",
        "choices": [
          "하늘로 돌아가요",
          "흙으로 돌아가요",
          "동산으로 돌아가요"
        ],
        "answer": 1,
        "where": "창세기 3장 19절"
      },
      {
        "d": "금",
        "ref": "로마서 3장 13~14절",
        "url": "https://www.bskorea.or.kr/bible/korbibReadpage.php?version=GAE&book=rom&chap=3&sec=13",
        "ask": "바울은 사람의 목구멍을 무엇이라고 하나요?",
        "choices": [
          "깨끗한 샘",
          "높은 성벽",
          "열린 무덤"
        ],
        "answer": 2,
        "where": "로마서 3장 13절"
      }
    ]
  },
  {
    "n": 4,
    "group": "우리의 처지",
    "title": "공의와 자비",
    "q": "죄를 그냥 넘기지 않으시는 하나님이 어떻게 자비로우실까요?",
    "refs": [
      "출애굽기 34장 6~7절",
      "로마서 3장 25~26절"
    ],
    "confess": "하나님은 정의로우셔서 죄를 가볍게 넘기지 않으시고, 죄의 값은 반드시 치러져야 한다고 교회는 고백해 왔어요. 그런데 하나님은 동시에 자비로우셔서 우리를 그대로 버려 두지 않으세요. 정의와 자비가 어떻게 만나는지는 예수님을 말할 때 비로소 풀린다고 해요.",
    "short": "하나님은 공의로우시고 또 자비로우세요",
    "base": "하이델베르크 4주일(9~11문) · 소요리문답 4문, 84문",
    "img": "../note/img/w/weekly-04.webp",
    "alt": "공의와 자비 주의 상징 정물: 저울, 한쪽 접시에 올리브 가지",
    "days": [
      {
        "d": "월",
        "ref": "출애굽기 34장 6~7절",
        "url": "https://www.bskorea.or.kr/bible/korbibReadpage.php?version=GAE&book=exo&chap=34&sec=6",
        "ask": "하나님은 어떤 성품이 풍성하다고 말씀하시나요?",
        "choices": [
          "분노와 두려움이",
          "은혜와 진실이",
          "힘과 재물이"
        ],
        "answer": 1,
        "where": "출애굽기 34장 6절"
      },
      {
        "d": "화",
        "ref": "로마서 3장 25~26절",
        "url": "https://www.bskorea.or.kr/bible/korbibReadpage.php?version=GAE&book=rom&chap=3&sec=25",
        "ask": "하나님은 예수님을 믿는 사람을 어떻게 하시나요?",
        "choices": [
          "잊어버리세요",
          "멀리 보내세요",
          "의롭다 하세요"
        ],
        "answer": 2,
        "where": "로마서 3장 26절"
      },
      {
        "d": "수",
        "ref": "에스겔 18장 20~23절",
        "url": "https://www.bskorea.or.kr/bible/korbibReadpage.php?version=GAE&book=ezk&chap=18&sec=20",
        "ask": "하나님은 악인이 돌이키면 무엇을 바라신다고 하나요?",
        "choices": [
          "그가 사는 것을",
          "그가 숨는 것을",
          "그가 벌받는 것을"
        ],
        "answer": 0,
        "where": "에스겔 18장 23절"
      },
      {
        "d": "목",
        "ref": "신명기 32장 3~4절",
        "url": "https://www.bskorea.or.kr/bible/korbibReadpage.php?version=GAE&book=deu&chap=32&sec=3",
        "ask": "모세는 하나님의 모든 길이 어떠하다고 하나요?",
        "choices": [
          "변한다고 해요",
          "공평하다고 해요",
          "막혀 있다고 해요"
        ],
        "answer": 1,
        "where": "신명기 32장 4절"
      },
      {
        "d": "금",
        "ref": "시편 103편 8~10절",
        "url": "https://www.bskorea.or.kr/bible/korbibReadpage.php?version=GAE&book=psa&chap=103&sec=8",
        "ask": "하나님은 우리 죄를 따라 어떻게 하지 않으시나요?",
        "choices": [
          "기억하지 않으세요",
          "듣지 않으세요",
          "처벌하지 않으세요"
        ],
        "answer": 2,
        "where": "시편 103편 10절"
      }
    ]
  },
  {
    "n": 5,
    "group": "구원의 길",
    "title": "죄의 빚",
    "q": "내가 지은 죄의 빚을 내 힘으로 갚을 수는 없을까요?",
    "refs": [
      "시편 49편 7~9절",
      "로마서 3장 23~24절"
    ],
    "confess": "죄는 하나님 앞에 진 빚과 같아서 누군가가 그 값을 치러야 한다고 교회는 고백해 왔어요. 그런데 내가 아무리 애써도 그 빚을 갚지 못하고, 오히려 날마다 빚이 늘어난다고요. 세상의 어떤 존재도 그 빚을 대신 갚을 수 없어서, 사람이면서 세상 그 무엇보다 크신 분, 곧 하나님이 필요하다고 해요.",
    "short": "내 힘으로는 죄의 빚을 갚을 수 없어요",
    "base": "하이델베르크 5주일(12~15문) · 소요리문답 19문",
    "img": "../note/img/w/weekly-05.webp",
    "alt": "죄의 빚 주의 상징 정물: 끈으로 묶은 빈 문서 더미, 모자란 동전 몇 닢",
    "days": [
      {
        "d": "월",
        "ref": "시편 49편 7~9절",
        "url": "https://www.bskorea.or.kr/bible/korbibReadpage.php?version=GAE&book=psa&chap=49&sec=7",
        "ask": "사람이 자기 형제를 위해 하나님께 무엇을 드릴 수 없나요?",
        "choices": [
          "속전을 드릴 수 없어요",
          "찬양을 드릴 수 없어요",
          "기도를 드릴 수 없어요"
        ],
        "answer": 0,
        "where": "시편 49편 7절"
      },
      {
        "d": "화",
        "ref": "로마서 3장 23~24절",
        "url": "https://www.bskorea.or.kr/bible/korbibReadpage.php?version=GAE&book=rom&chap=3&sec=23",
        "ask": "모든 사람이 무엇을 범하였다고 하나요?",
        "choices": [
          "약속을 범했어요",
          "율법을 범했어요",
          "죄를 범했어요"
        ],
        "answer": 2,
        "where": "로마서 3장 23절"
      },
      {
        "d": "수",
        "ref": "히브리서 9장 27~28절",
        "url": "https://www.bskorea.or.kr/bible/korbibReadpage.php?version=GAE&book=heb&chap=9&sec=27",
        "ask": "사람에게 한 번 정해진 것은 무엇인가요?",
        "choices": [
          "태어나는 일이에요",
          "죽는 일이에요",
          "여행하는 일이에요"
        ],
        "answer": 1,
        "where": "히브리서 9장 27절"
      },
      {
        "d": "목",
        "ref": "시편 130편 3~4절",
        "url": "https://www.bskorea.or.kr/bible/korbibReadpage.php?version=GAE&book=psa&chap=130&sec=3",
        "ask": "주님께 무엇이 있다고 시인은 말하나요?",
        "choices": [
          "사유하심이 있어요",
          "잊으심이 있어요",
          "원망하심이 있어요"
        ],
        "answer": 0,
        "where": "시편 130편 4절"
      },
      {
        "d": "금",
        "ref": "이사야 53장 5~6절",
        "url": "https://www.bskorea.or.kr/bible/korbibReadpage.php?version=GAE&book=isa&chap=53&sec=5",
        "ask": "우리는 모두 무엇처럼 그릇 행했다고 하나요?",
        "choices": [
          "새처럼",
          "물고기처럼",
          "양처럼"
        ],
        "answer": 2,
        "where": "이사야 53장 6절"
      }
    ]
  },
  {
    "n": 6,
    "group": "구원의 길",
    "title": "이어 주는 분",
    "q": "예수님은 왜 사람이면서 동시에 하나님이셔야 했을까요?",
    "refs": [
      "디모데전서 2장 5~6절",
      "히브리서 2장 14절"
    ],
    "confess": "죄를 지은 사람이 그 값을 치러야 하므로, 우리를 구하실 분은 우리와 같은 참 사람이면서 죄가 없는 의로운 분이어야 한다고 교회는 고백해 왔어요. 또 죄에 대한 하나님의 엄한 심판의 무게를 견디고 우리에게 의로움과 생명을 얻어 주시려면, 그분은 참 하나님이기도 하셔야 한다고요. 그 한 분이 우리 주 예수님이시고, 이 기쁜 소식은 하나님이 처음부터 약속하시고 보여 주시다가 아들을 통해 이루셨다고 해요.",
    "short": "예수님은 참 사람이시고 참 하나님이세요",
    "base": "하이델베르크 6주일(16~19문) · 소요리문답 21~22문",
    "img": "../note/img/w/weekly-06.webp",
    "alt": "이어 주는 분 주의 상징 정물: 끊어진 두 밧줄을 잇는 단단한 매듭",
    "days": [
      {
        "d": "월",
        "ref": "디모데전서 2장 5~6절",
        "url": "https://www.bskorea.or.kr/bible/korbibReadpage.php?version=GAE&book=1ti&chap=2&sec=5",
        "ask": "하나님과 사람 사이에 계신 중보자는 몇 분인가요?",
        "choices": [
          "여러 분이에요",
          "한 분이에요",
          "두 분이에요"
        ],
        "answer": 1,
        "where": "디모데전서 2장 5절"
      },
      {
        "d": "화",
        "ref": "히브리서 2장 14~15절",
        "url": "https://www.bskorea.or.kr/bible/korbibReadpage.php?version=GAE&book=heb&chap=2&sec=14",
        "ask": "예수님은 무엇을 통해 죽음의 세력을 멸하셨나요?",
        "choices": [
          "가르침을 통해",
          "여행을 통해",
          "죽음을 통해"
        ],
        "answer": 2,
        "where": "히브리서 2장 14절"
      },
      {
        "d": "수",
        "ref": "빌립보서 2장 6~8절",
        "url": "https://www.bskorea.or.kr/bible/korbibReadpage.php?version=GAE&book=php&chap=2&sec=6",
        "ask": "예수님은 어떤 모습으로 나타나셨다고 하나요?",
        "choices": [
          "사람의 모양으로",
          "천사의 모양으로",
          "왕관 쓴 모양으로"
        ],
        "answer": 0,
        "where": "빌립보서 2장 8절"
      },
      {
        "d": "목",
        "ref": "히브리서 7장 25~27절",
        "url": "https://www.bskorea.or.kr/bible/korbibReadpage.php?version=GAE&book=heb&chap=7&sec=25",
        "ask": "예수님은 사람들을 위해 항상 무엇을 하시나요?",
        "choices": [
          "판결하세요",
          "간구하세요",
          "기다리세요"
        ],
        "answer": 1,
        "where": "히브리서 7장 25절"
      },
      {
        "d": "금",
        "ref": "요한복음 20장 30~31절",
        "url": "https://www.bskorea.or.kr/bible/korbibReadpage.php?version=GAE&book=jhn&chap=20&sec=30",
        "ask": "이 글을 기록한 목적은 예수님을 누구로 믿게 하려는 건가요?",
        "choices": [
          "선지자 중 하나로",
          "훌륭한 선생님으로",
          "그리스도 하나님의 아들로"
        ],
        "answer": 2,
        "where": "요한복음 20장 31절"
      }
    ]
  },
  {
    "n": 7,
    "group": "구원의 길",
    "title": "믿음",
    "q": "믿는다는 것은 하나님에 대해 아는 것과 어떻게 다른가요?",
    "refs": [
      "에베소서 2장 8~9절",
      "히브리서 11장 1절"
    ],
    "confess": "참된 믿음은 하나님의 말씀이 참이라고 아는 데서 그치지 않고, 그 약속이 나에게도 주어졌다고 온 마음으로 의지하는 것이라고 교회는 고백해 왔어요. 이 믿음은 내가 만들어 내는 것이 아니라 성령님이 복음을 통해 내 마음에 일으켜 주시는 선물이라고요. 그렇게 믿는 사람은 예수님과 이어져서 그분이 이루신 모든 복을 받는다고 해요.",
    "short": "믿음은 성령님이 주시는 온 마음의 의지예요",
    "base": "하이델베르크 7주일(20~23문) · 소요리문답 85~86문",
    "img": "../note/img/w/weekly-07.webp",
    "alt": "믿음 주의 상징 정물: 밧줄 감긴 작은 닻",
    "days": [
      {
        "d": "월",
        "ref": "에베소서 2장 8~9절",
        "url": "https://www.bskorea.or.kr/bible/korbibReadpage.php?version=GAE&book=eph&chap=2&sec=8",
        "ask": "구원은 행위에서 난 것이 아니라 무엇이라고 하나요?",
        "choices": [
          "선물이라고 해요",
          "상급이라고 해요",
          "빚이라고 해요"
        ],
        "answer": 0,
        "where": "에베소서 2장 8절"
      },
      {
        "d": "화",
        "ref": "히브리서 11장 1~3절",
        "url": "https://www.bskorea.or.kr/bible/korbibReadpage.php?version=GAE&book=heb&chap=11&sec=1",
        "ask": "믿음은 보이지 않는 것의 무엇이라고 하나요?",
        "choices": [
          "그림이라고 해요",
          "소문이라고 해요",
          "증거라고 해요"
        ],
        "answer": 2,
        "where": "히브리서 11장 1절"
      },
      {
        "d": "수",
        "ref": "로마서 10장 9~10절",
        "url": "https://www.bskorea.or.kr/bible/korbibReadpage.php?version=GAE&book=rom&chap=10&sec=9",
        "ask": "입으로 예수님을 누구라고 시인하라고 하나요?",
        "choices": [
          "선생님이라고",
          "주님이라고",
          "친구라고"
        ],
        "answer": 1,
        "where": "로마서 10장 9절"
      },
      {
        "d": "목",
        "ref": "요한복음 3장 16~18절",
        "url": "https://www.bskorea.or.kr/bible/korbibReadpage.php?version=GAE&book=jhn&chap=3&sec=16",
        "ask": "하나님은 세상을 얼마나 사랑하셨다고 하나요?",
        "choices": [
          "독생자를 주실 만큼",
          "천사를 보내실 만큼",
          "성전을 세우실 만큼"
        ],
        "answer": 0,
        "where": "요한복음 3장 16절"
      },
      {
        "d": "금",
        "ref": "고린도전서 12장 3~4절",
        "url": "https://www.bskorea.or.kr/bible/korbibReadpage.php?version=GAE&book=1co&chap=12&sec=3",
        "ask": "예수님을 주님이라 말하게 하시는 분은 누구인가요?",
        "choices": [
          "바울이에요",
          "베드로예요",
          "성령님이에요"
        ],
        "answer": 2,
        "where": "고린도전서 12장 3절"
      }
    ]
  },
  {
    "n": 8,
    "group": "구원의 길",
    "title": "한 분 하나님",
    "q": "하나님은 한 분인데 왜 아버지, 아들, 성령이라고 하나요?",
    "refs": [
      "신명기 6장 4절",
      "마태복음 28장 19절"
    ],
    "confess": "하나님은 오직 한 분이시고, 그 한 하나님이 아버지와 아들과 성령으로 서로 구별되시면서도 한 분이시라고 교회는 고백해 왔어요. 그래서 사도신경도 이 순서를 따라 하나님이 나를 지으신 일, 예수님이 나를 구원하신 일, 성령님이 나를 거룩하게 하시는 일을 차례로 고백해요. 아버지와 아들과 성령이 한 하나님이시라는 것은 우리가 다 헤아리지 못해도, 말씀이 가르쳐 준 대로 믿어 왔다고 해요.",
    "short": "한 분 하나님이 아버지, 아들, 성령이세요",
    "base": "하이델베르크 8주일(24~25문) · 소요리문답 5~6문",
    "img": "../note/img/w/weekly-08.webp",
    "alt": "한 분 하나님 주의 상징 정물: 세 가닥으로 꼰 한 줄",
    "days": [
      {
        "d": "월",
        "ref": "신명기 6장 4~5절",
        "url": "https://www.bskorea.or.kr/bible/korbibReadpage.php?version=GAE&book=deu&chap=6&sec=4",
        "ask": "이스라엘에게 하나님이 몇 분이시라고 말하나요?",
        "choices": [
          "두 분이세요",
          "오직 한 분이세요",
          "세 분이세요"
        ],
        "answer": 1,
        "where": "신명기 6장 4절"
      },
      {
        "d": "화",
        "ref": "마태복음 28장 18~20절",
        "url": "https://www.bskorea.or.kr/bible/korbibReadpage.php?version=GAE&book=mat&chap=28&sec=18",
        "ask": "예수님은 누구의 이름으로 세례를 베풀라고 하나요?",
        "choices": [
          "아버지와 아들과 성령의",
          "모세와 엘리야의",
          "아브라함과 이삭의"
        ],
        "answer": 0,
        "where": "마태복음 28장 19절"
      },
      {
        "d": "수",
        "ref": "고린도후서 13장 11~13절",
        "url": "https://www.bskorea.or.kr/bible/korbibReadpage.php?version=GAE&book=2co&chap=13&sec=11",
        "ask": "마지막 축복에서 성령님께 속한 무엇을 말하나요?",
        "choices": [
          "능력을",
          "지혜를",
          "교통하심을"
        ],
        "answer": 2,
        "where": "고린도후서 13장 13절"
      },
      {
        "d": "목",
        "ref": "에베소서 4장 4~6절",
        "url": "https://www.bskorea.or.kr/bible/korbibReadpage.php?version=GAE&book=eph&chap=4&sec=4",
        "ask": "바울은 하나님 아버지가 몇 분이시라고 하나요?",
        "choices": [
          "여러 분이시라고",
          "한 분이시라고",
          "두 분이시라고"
        ],
        "answer": 1,
        "where": "에베소서 4장 6절"
      },
      {
        "d": "금",
        "ref": "요한복음 14장 25~26절",
        "url": "https://www.bskorea.or.kr/bible/korbibReadpage.php?version=GAE&book=jhn&chap=14&sec=25",
        "ask": "예수님은 보혜사 성령께서 무엇을 가르치신다고 하나요?",
        "choices": [
          "앞날만",
          "모든 것을",
          "지난일만"
        ],
        "answer": 1,
        "where": "요한복음 14장 26절"
      }
    ]
  },
  {
    "n": 9,
    "group": "하나님 아버지",
    "title": "지으신 아버지",
    "q": "세상을 지으신 하나님이 어떻게 나의 아버지가 되실까요?",
    "refs": [
      "시편 121편 1~2절",
      "로마서 8장 15~16절"
    ],
    "confess": "하늘과 땅을 지으시고 지금도 붙들어 다스리시는 하나님이, 예수님 때문에 나의 하나님이시고 아버지가 되셨다고 교회는 고백해 왔어요. 그래서 이 아버지가 내 몸과 영혼에 필요한 것을 채워 주신다고 믿고 의지할 수 있다고요. 이 세상에서 어려운 일을 만나도 하나님이 그것을 내게 좋은 쪽으로 이끄신다고 해요.",
    "short": "세상을 지으신 하나님이 나의 아버지세요",
    "base": "하이델베르크 9주일(26문) · 소요리문답 9~10문",
    "img": "../note/img/w/weekly-09.webp",
    "alt": "지으신 아버지 주의 상징 정물: 창밖의 높은 산, 탁자 위 흙 한 줌과 새싹",
    "days": [
      {
        "d": "월",
        "ref": "시편 121편 1~2절",
        "url": "https://www.bskorea.or.kr/bible/korbibReadpage.php?version=GAE&book=psa&chap=121&sec=1",
        "ask": "시인은 자신의 도움이 어디에서 온다고 하나요?",
        "choices": [
          "높은 산에서",
          "먼 나라에서",
          "여호와에게서"
        ],
        "answer": 2,
        "where": "시편 121편 2절"
      },
      {
        "d": "화",
        "ref": "로마서 8장 15~16절",
        "url": "https://www.bskorea.or.kr/bible/korbibReadpage.php?version=GAE&book=rom&chap=8&sec=15",
        "ask": "우리는 하나님을 어떻게 부른다고 하나요?",
        "choices": [
          "아빠 아버지라고",
          "높은 왕이라고",
          "낯선 분이라고"
        ],
        "answer": 0,
        "where": "로마서 8장 15절"
      },
      {
        "d": "수",
        "ref": "창세기 1장 1~3절",
        "url": "https://www.bskorea.or.kr/bible/korbibReadpage.php?version=GAE&book=gen&chap=1&sec=1",
        "ask": "태초에 하나님이 무엇을 창조하셨나요?",
        "choices": [
          "해와 달만",
          "천지를",
          "사람만"
        ],
        "answer": 1,
        "where": "창세기 1장 1절"
      },
      {
        "d": "목",
        "ref": "마태복음 6장 25~26절",
        "url": "https://www.bskorea.or.kr/bible/korbibReadpage.php?version=GAE&book=mat&chap=6&sec=25",
        "ask": "하늘의 새를 먹이시는 분은 누구인가요?",
        "choices": [
          "사람들이에요",
          "새들이에요",
          "하늘 아버지세요"
        ],
        "answer": 2,
        "where": "마태복음 6장 26절"
      },
      {
        "d": "금",
        "ref": "로마서 8장 28~30절",
        "url": "https://www.bskorea.or.kr/bible/korbibReadpage.php?version=GAE&book=rom&chap=8&sec=28",
        "ask": "하나님을 사랑하는 사람에게 모든 것이 합력해 이루는 것은 무엇인가요?",
        "choices": [
          "선을 이루어요",
          "큰 이름을 이루어요",
          "많은 재물을 이루어요"
        ],
        "answer": 0,
        "where": "로마서 8장 28절"
      }
    ]
  },
  {
    "n": 10,
    "group": "하나님 아버지",
    "title": "돌보시는 손",
    "q": "모든 일이 우연이 아니라는 말은 힘든 때 어떤 위로가 되나요?",
    "refs": [
      "마태복음 10장 29~31절",
      "로마서 8장 38~39절"
    ],
    "confess": "하나님은 지금도 아버지의 손으로 세상과 우리의 모든 날을 붙들고 돌보신다고 교회는 고백해 왔어요. 그래서 좋은 일은 하나님이 주신 선물로 받아 감사하고, 힘든 일 속에서도 아버지가 나를 놓지 않으신다고 믿으며 견딜 수 있다고요. 어떤 것도 나를 하나님의 사랑에서 떼어 놓을 수 없기에, 앞날도 맡길 수 있다고 해요.",
    "short": "어떤 일도 아버지의 사랑에서 나를 떼지 못해요",
    "base": "하이델베르크 10주일(27~28문) · 소요리문답 11문",
    "img": "../note/img/w/weekly-10.webp",
    "alt": "돌보시는 손 주의 상징 정물: 창턱의 참새 두 마리, 탁자 위 동전 한 닢",
    "days": [
      {
        "d": "월",
        "ref": "마태복음 10장 29~31절",
        "url": "https://www.bskorea.or.kr/bible/korbibReadpage.php?version=GAE&book=mat&chap=10&sec=29",
        "ask": "예수님은 우리의 무엇까지 다 세셨다고 하나요?",
        "choices": [
          "발자국까지",
          "머리털까지",
          "걸음 수까지"
        ],
        "answer": 1,
        "where": "마태복음 10장 30절"
      },
      {
        "d": "화",
        "ref": "로마서 8장 38~39절",
        "url": "https://www.bskorea.or.kr/bible/korbibReadpage.php?version=GAE&book=rom&chap=8&sec=38",
        "ask": "무엇이 우리를 하나님의 사랑에서 끊을 수 있나요?",
        "choices": [
          "죽음만 가능해요",
          "천사만 가능해요",
          "아무것도 못해요"
        ],
        "answer": 2,
        "where": "로마서 8장 39절"
      },
      {
        "d": "수",
        "ref": "사도행전 17장 24~26절",
        "url": "https://www.bskorea.or.kr/bible/korbibReadpage.php?version=GAE&book=act&chap=17&sec=24",
        "ask": "세상과 그 안의 모든 것을 지으신 분은 누구인가요?",
        "choices": [
          "하나님이세요",
          "사람이에요",
          "왕이에요"
        ],
        "answer": 0,
        "where": "사도행전 17장 24절"
      },
      {
        "d": "목",
        "ref": "야고보서 1장 16~17절",
        "url": "https://www.bskorea.or.kr/bible/korbibReadpage.php?version=GAE&book=jas&chap=1&sec=16",
        "ask": "각양 좋은 은사와 온전한 선물은 어디에서 오나요?",
        "choices": [
          "땅 아래에서",
          "위로부터",
          "사람에게서"
        ],
        "answer": 1,
        "where": "야고보서 1장 17절"
      },
      {
        "d": "금",
        "ref": "시편 145편 15~16절",
        "url": "https://www.bskorea.or.kr/bible/korbibReadpage.php?version=GAE&book=psa&chap=145&sec=15",
        "ask": "시인은 하나님이 손을 펴서 무엇을 채우신다고 하나요?",
        "choices": [
          "산과 바다를",
          "성벽과 집을",
          "모든 생물의 소원을"
        ],
        "answer": 2,
        "where": "시편 145편 16절"
      }
    ]
  },
  {
    "n": 11,
    "group": "예수님",
    "title": "예수의 이름",
    "q": "'예수'라는 이름에는 왜 '구원하신다'는 뜻이 담겨 있을까요?",
    "refs": [
      "마태복음 1장 21절",
      "사도행전 4장 12절"
    ],
    "confess": "예수라는 이름은 '구원하신다'는 뜻이고, 그분이 우리를 모든 죄에서 구원하시기 때문에 붙은 이름이라고 교회는 고백해 왔어요. 우리의 구원은 이분 안에 온전히 있어서, 다른 어디에서 따로 찾을 필요가 없다고요. 그래서 예수님을 믿는다는 것은 구원에 필요한 모든 것을 예수님께 맡기는 일이라고 해요.",
    "short": "예수라는 이름은 구원하신다는 뜻이에요",
    "base": "하이델베르크 11주일(29~30문) · 소요리문답 21문",
    "img": "../note/img/w/weekly-11.webp",
    "alt": "예수의 이름 주의 상징 정물: 강보가 놓인 빈 나무 구유",
    "days": [
      {
        "d": "월",
        "ref": "마태복음 1장 20~21절",
        "url": "https://www.bskorea.or.kr/bible/korbibReadpage.php?version=GAE&book=mat&chap=1&sec=20",
        "ask": "아들의 이름을 예수라 하라는 까닭은 무엇인가요?",
        "choices": [
          "백성을 죄에서 구원하시므로",
          "나라를 크게 하시므로",
          "성전을 다시 지으시므로"
        ],
        "answer": 0,
        "where": "마태복음 1장 21절"
      },
      {
        "d": "화",
        "ref": "사도행전 4장 10~12절",
        "url": "https://www.bskorea.or.kr/bible/korbibReadpage.php?version=GAE&book=act&chap=4&sec=10",
        "ask": "우리가 구원받을 다른 이름이 있다고 하나요?",
        "choices": [
          "많이 있다고 해요",
          "없다고 해요",
          "둘 있다고 해요"
        ],
        "answer": 1,
        "where": "사도행전 4장 12절"
      },
      {
        "d": "수",
        "ref": "누가복음 2장 10~11절",
        "url": "https://www.bskorea.or.kr/bible/korbibReadpage.php?version=GAE&book=luk&chap=2&sec=10",
        "ask": "천사가 태어난 아기를 누구라고 알리나요?",
        "choices": [
          "새 제사장이라고",
          "새 선지자라고",
          "구주 그리스도 주라고"
        ],
        "answer": 2,
        "where": "누가복음 2장 11절"
      },
      {
        "d": "목",
        "ref": "로마서 10장 12~13절",
        "url": "https://www.bskorea.or.kr/bible/korbibReadpage.php?version=GAE&book=rom&chap=10&sec=12",
        "ask": "누구의 이름을 부르는 사람이 구원을 받나요?",
        "choices": [
          "주의 이름을",
          "자기 이름을",
          "왕의 이름을"
        ],
        "answer": 0,
        "where": "로마서 10장 13절"
      },
      {
        "d": "금",
        "ref": "요한일서 4장 14~15절",
        "url": "https://www.bskorea.or.kr/bible/korbibReadpage.php?version=GAE&book=1jn&chap=4&sec=14",
        "ask": "아버지는 아들을 세상의 누구로 보내셨나요?",
        "choices": [
          "심판관으로",
          "구주로",
          "통치자로"
        ],
        "answer": 1,
        "where": "요한일서 4장 14절"
      }
    ]
  },
  {
    "n": 12,
    "group": "예수님",
    "title": "그리스도",
    "q": "'그리스도'라는 이름은 예수님이 어떤 분이라는 뜻인가요?",
    "refs": [
      "사도행전 10장 38절",
      "히브리서 4장 14~16절",
      "마태복음 28장 18절"
    ],
    "confess": "그리스도는 '기름 부음을 받은 분'이라는 뜻이고, 하나님이 예수님께 세 가지 일을 맡기셨다고 교회는 고백해 왔어요. 하나님의 뜻을 우리에게 온전히 알려 주시는 분, 단 한 번 자기를 드려 우리를 구하시고 지금도 우리를 위해 아버지께 구해 주시는 분, 말씀과 성령님으로 우리를 다스리고 지켜 주시는 왕이세요. 예수님을 믿는 사람을 '그리스도인'이라 부르는 것은, 이 은혜에 함께하는 사람이라는 뜻이라고 해요.",
    "short": "그리스도는 기름 부음을 받은 구원자라는 뜻이에요",
    "base": "하이델베르크 12주일(31~32문) · 소요리문답 23~26문",
    "img": "../note/img/w/weekly-12.webp",
    "alt": "그리스도 주의 상징 정물: 빈 두루마리, 작은 향로, 작은 관",
    "days": [
      {
        "d": "월",
        "ref": "사도행전 10장 37~38절",
        "url": "https://www.bskorea.or.kr/bible/korbibReadpage.php?version=GAE&book=act&chap=10&sec=37",
        "ask": "하나님은 예수님께 무엇과 능력을 부으셨나요?",
        "choices": [
          "지혜를",
          "재물을",
          "성령을"
        ],
        "answer": 2,
        "where": "사도행전 10장 38절"
      },
      {
        "d": "화",
        "ref": "히브리서 4장 14~16절",
        "url": "https://www.bskorea.or.kr/bible/korbibReadpage.php?version=GAE&book=heb&chap=4&sec=14",
        "ask": "우리에게 계신 큰 대제사장은 누구인가요?",
        "choices": [
          "하나님의 아들 예수님",
          "모세의 형 아론",
          "다윗 왕"
        ],
        "answer": 0,
        "where": "히브리서 4장 14절"
      },
      {
        "d": "수",
        "ref": "누가복음 4장 18~19절",
        "url": "https://www.bskorea.or.kr/bible/korbibReadpage.php?version=GAE&book=luk&chap=4&sec=18",
        "ask": "예수님은 누구에게 복음을 전하도록 기름 부음 받으셨나요?",
        "choices": [
          "부자에게",
          "가난한 자에게",
          "군인에게"
        ],
        "answer": 1,
        "where": "누가복음 4장 18절"
      },
      {
        "d": "목",
        "ref": "히브리서 9장 11~12절",
        "url": "https://www.bskorea.or.kr/bible/korbibReadpage.php?version=GAE&book=heb&chap=9&sec=11",
        "ask": "그리스도는 무엇으로 영원한 속죄를 이루셨나요?",
        "choices": [
          "양의 피로",
          "염소의 피로",
          "자기 피로"
        ],
        "answer": 2,
        "where": "히브리서 9장 12절"
      },
      {
        "d": "금",
        "ref": "골로새서 1장 13~14절",
        "url": "https://www.bskorea.or.kr/bible/korbibReadpage.php?version=GAE&book=col&chap=1&sec=13",
        "ask": "우리는 그 아들 안에서 무엇을 얻는다고 하나요?",
        "choices": [
          "속량과 죄 사함을",
          "땅과 재물을",
          "명예와 권세를"
        ],
        "answer": 0,
        "where": "골로새서 1장 14절"
      }
    ]
  },
  {
    "n": 13,
    "group": "예수님",
    "title": "하나님의 아들",
    "q": "예수님만 하나님의 외아들이라면 나는 어떻게 자녀가 되나요?",
    "refs": [
      "요한복음 1장 12~14절",
      "베드로전서 1장 18~19절"
    ],
    "confess": "예수님만이 영원부터 아버지와 하나이신 하나님의 아들이시고, 우리는 그분 덕분에 은혜로 하나님의 자녀가 되었다고 교회는 고백해 왔어요. 또 예수님을 '주님'이라 부르는 것은, 그분이 자기 목숨을 내어 주시고 우리를 죄와 악의 힘에서 풀어 주셔서 자기 사람으로 삼으셨다는 뜻이라고요. 그래서 우리는 몸도 영혼도 그분께 속해 있다고 해요.",
    "short": "예수님 덕분에 나도 하나님의 자녀가 되었어요",
    "base": "하이델베르크 13주일(33~34문) · 소요리문답 34문",
    "img": "../note/img/w/weekly-13.webp",
    "alt": "하나님의 아들 주의 상징 정물: 가족 식탁에 하나 더 놓인 의자와 그릇",
    "days": [
      {
        "d": "월",
        "ref": "요한복음 1장 12~14절",
        "url": "https://www.bskorea.or.kr/bible/korbibReadpage.php?version=GAE&book=jhn&chap=1&sec=12",
        "ask": "예수님의 이름을 믿는 사람에게 어떤 권세를 주셨나요?",
        "choices": [
          "왕이 되는 권세",
          "하나님의 자녀가 되는 권세",
          "천사가 되는 권세"
        ],
        "answer": 1,
        "where": "요한복음 1장 12절"
      },
      {
        "d": "화",
        "ref": "베드로전서 1장 18~19절",
        "url": "https://www.bskorea.or.kr/bible/korbibReadpage.php?version=GAE&book=1pe&chap=1&sec=18",
        "ask": "우리는 무엇으로 대속함을 받았다고 하나요?",
        "choices": [
          "은과 금으로",
          "양의 털로",
          "그리스도의 피로"
        ],
        "answer": 2,
        "where": "베드로전서 1장 19절"
      },
      {
        "d": "수",
        "ref": "갈라디아서 4장 4~7절",
        "url": "https://www.bskorea.or.kr/bible/korbibReadpage.php?version=GAE&book=gal&chap=4&sec=4",
        "ask": "하나님이 아들의 영을 보내셔서 무엇이라고 부르게 하시나요?",
        "choices": [
          "아빠 아버지라고",
          "나의 왕이라고",
          "나의 친구라고"
        ],
        "answer": 0,
        "where": "갈라디아서 4장 6절"
      },
      {
        "d": "목",
        "ref": "요한일서 3장 1~2절",
        "url": "https://www.bskorea.or.kr/bible/korbibReadpage.php?version=GAE&book=1jn&chap=3&sec=1",
        "ask": "아버지께서 우리를 무엇이라 일컬어지게 하셨나요?",
        "choices": [
          "주의 종이라고",
          "하나님의 자녀라고",
          "천국의 왕이라고"
        ],
        "answer": 1,
        "where": "요한일서 3장 1절"
      },
      {
        "d": "금",
        "ref": "요한계시록 5장 9~10절",
        "url": "https://www.bskorea.or.kr/bible/korbibReadpage.php?version=GAE&book=rev&chap=5&sec=9",
        "ask": "어린양은 자기 피로 사람들을 누구께 사셨나요?",
        "choices": [
          "천사에게",
          "왕들에게",
          "하나님께"
        ],
        "answer": 2,
        "where": "요한계시록 5장 9절"
      }
    ]
  },
  {
    "n": 14,
    "group": "예수님",
    "title": "사람이 되심",
    "q": "하나님이 사람으로 오셨다는 사실이 나에게 왜 중요할까요?",
    "refs": [
      "누가복음 1장 35절",
      "요한복음 1장 14절",
      "히브리서 4장 15절"
    ],
    "confess": "영원하신 하나님의 아들이 성령님의 일하심으로 마리아에게서 참 사람의 몸을 입고 태어나셨다고 교회는 고백해 왔어요. 그분은 죄만 빼고 우리와 모든 면에서 같으셔서, 우리의 약함을 아시고 우리 편에 서 주세요. 그분의 거룩한 태어나심이 죄 가운데 태어난 나의 죄를 덮어 주어서, 하나님이 그 죄를 더 이상 묻지 않으신다고 해요.",
    "short": "하나님의 아들이 참 사람으로 오셨어요",
    "base": "하이델베르크 14주일(35~36문) · 소요리문답 22문",
    "img": "../note/img/w/weekly-14.webp",
    "alt": "사람이 되심 주의 상징 정물: 목수의 대패와 나무 부스러기",
    "days": [
      {
        "d": "월",
        "ref": "누가복음 1장 34~36절",
        "url": "https://www.bskorea.or.kr/bible/korbibReadpage.php?version=GAE&book=luk&chap=1&sec=34",
        "ask": "천사는 마리아에게 누구의 능력이 덮으리라고 말하나요?",
        "choices": [
          "지극히 높으신 이의 능력",
          "사람들의 능력",
          "제사장의 능력"
        ],
        "answer": 0,
        "where": "누가복음 1장 35절"
      },
      {
        "d": "화",
        "ref": "요한복음 1장 12~14절",
        "url": "https://www.bskorea.or.kr/bible/korbibReadpage.php?version=GAE&book=jhn&chap=1&sec=12",
        "ask": "말씀이 무엇이 되어 우리 가운데 거하셨다고 하나요?",
        "choices": [
          "천사가 되어",
          "육신이 되어",
          "빛이 되어"
        ],
        "answer": 1,
        "where": "요한복음 1장 14절"
      },
      {
        "d": "수",
        "ref": "마태복음 1장 18~21절",
        "url": "https://www.bskorea.or.kr/bible/korbibReadpage.php?version=GAE&book=mat&chap=1&sec=18",
        "ask": "마리아가 잉태한 아기는 누구로 말미암았다고 하나요?",
        "choices": [
          "요셉으로 말미암아",
          "제사장으로 말미암아",
          "성령으로 말미암아"
        ],
        "answer": 2,
        "where": "마태복음 1장 18절"
      },
      {
        "d": "목",
        "ref": "히브리서 2장 14~17절",
        "url": "https://www.bskorea.or.kr/bible/korbibReadpage.php?version=GAE&book=heb&chap=2&sec=14",
        "ask": "예수님은 모든 일에서 누구와 같이 되셨다고 하나요?",
        "choices": [
          "형제들과 같이",
          "천사들과 같이",
          "제사장들과 같이"
        ],
        "answer": 0,
        "where": "히브리서 2장 17절"
      },
      {
        "d": "금",
        "ref": "히브리서 4장 14~16절",
        "url": "https://www.bskorea.or.kr/bible/korbibReadpage.php?version=GAE&book=heb&chap=4&sec=14",
        "ask": "예수님에게 없으신 것은 무엇이라고 하나요?",
        "choices": [
          "연약함이 없어요",
          "죄가 없어요",
          "몸이 없어요"
        ],
        "answer": 1,
        "where": "히브리서 4장 15절"
      }
    ]
  },
  {
    "n": 15,
    "group": "예수님",
    "title": "고난",
    "q": "아무 잘못이 없으신 예수님이 왜 고난을 받으셔야 했나요?",
    "refs": [
      "이사야 53장 4~5절",
      "베드로전서 3장 18절"
    ],
    "confess": "예수님은 한평생, 특히 마지막 때에 몸과 마음으로 모든 사람의 죄에 대한 하나님의 엄한 심판을 대신 겪으셨다고 교회는 고백해 왔어요. 그 고난이 우리 죄를 대신 씻는 단 하나의 제물이 되어, 우리를 영원한 형벌에서 건지고 하나님의 은혜와 의로움과 영원한 생명을 얻어 주었다고요. 예수님이 죄가 없으면서도 땅의 재판관 앞에서 죄가 있다고 판결받으신 것은, 우리가 받을 하나님의 심판에서 우리를 풀어 주시기 위해서였다고 해요.",
    "short": "예수님은 우리 대신 고난을 받으셨어요",
    "base": "하이델베르크 15주일(37~38문) · 소요리문답 25문, 27문",
    "img": "../note/img/w/weekly-15.webp",
    "alt": "고난 주의 상징 정물: 가시관",
    "days": [
      {
        "d": "월",
        "ref": "이사야 53장 4~5절",
        "url": "https://www.bskorea.or.kr/bible/korbibReadpage.php?version=GAE&book=isa&chap=53&sec=4",
        "ask": "그가 찔린 것은 누구의 허물 때문이라고 하나요?",
        "choices": [
          "그 자신의 허물",
          "천사들의 허물",
          "우리의 허물"
        ],
        "answer": 2,
        "where": "이사야 53장 5절"
      },
      {
        "d": "화",
        "ref": "베드로전서 3장 17~18절",
        "url": "https://www.bskorea.or.kr/bible/korbibReadpage.php?version=GAE&book=1pe&chap=3&sec=17",
        "ask": "그리스도는 죄를 위하여 몇 번 죽으셨다고 하나요?",
        "choices": [
          "단번에",
          "두 번",
          "여러 번"
        ],
        "answer": 0,
        "where": "베드로전서 3장 18절"
      },
      {
        "d": "수",
        "ref": "이사야 53장 6~8절",
        "url": "https://www.bskorea.or.kr/bible/korbibReadpage.php?version=GAE&book=isa&chap=53&sec=6",
        "ask": "우리의 죄악을 누구에게 담당시키셨다고 하나요?",
        "choices": [
          "우리 각자에게",
          "그에게",
          "제사장에게"
        ],
        "answer": 1,
        "where": "이사야 53장 6절"
      },
      {
        "d": "목",
        "ref": "베드로전서 2장 21~24절",
        "url": "https://www.bskorea.or.kr/bible/korbibReadpage.php?version=GAE&book=1pe&chap=2&sec=21",
        "ask": "예수님은 누구를 위해 고난을 받으셨다고 하나요?",
        "choices": [
          "천사들을 위해",
          "제사장들을 위해",
          "너희를 위해"
        ],
        "answer": 2,
        "where": "베드로전서 2장 21절"
      },
      {
        "d": "금",
        "ref": "마태복음 27장 22~26절",
        "url": "https://www.bskorea.or.kr/bible/korbibReadpage.php?version=GAE&book=mat&chap=27&sec=22",
        "ask": "빌라도가 무리에게 놓아준 사람은 누구인가요?",
        "choices": [
          "바라바",
          "베드로",
          "요셉"
        ],
        "answer": 0,
        "where": "마태복음 27장 26절"
      }
    ]
  },
  {
    "n": 16,
    "group": "예수님",
    "title": "십자가",
    "q": "예수님이 십자가에서 죽으셨는데 나는 왜 여전히 죽나요?",
    "refs": [
      "갈라디아서 3장 13절",
      "로마서 6장 4~6절",
      "빌립보서 1장 21절"
    ],
    "confess": "예수님이 십자가에서 저주받은 죽음을 우리 대신 겪으셨다고 교회는 고백해 왔어요. 그래서 믿는 사람의 죽음은 더 이상 죄 값을 치르는 일이 아니라, 죄에서 벗어나 영원한 생명으로 들어가는 문이라고요. 또 예수님과 함께 우리의 옛 모습도 십자가에서 죽어서, 악한 욕심이 나를 마음대로 다스리지 못하게 된다고 해요. 가장 깊은 고통 속에서도 예수님이 그 고통을 먼저 겪으셨다는 것이 위로가 된다고요.",
    "short": "예수님의 죽음으로 내 죽음도 새 생명의 문이 되었어요",
    "base": "하이델베르크 16주일(39~44문) · 소요리문답 25문, 27문",
    "img": "../note/img/w/weekly-16.webp",
    "alt": "십자가 주의 상징 정물: 거친 각목 두 개와 큰 못",
    "days": [
      {
        "d": "월",
        "ref": "갈라디아서 3장 13~14절",
        "url": "https://www.bskorea.or.kr/bible/korbibReadpage.php?version=GAE&book=gal&chap=3&sec=13",
        "ask": "그리스도는 우리를 위해 무엇이 되셨다고 하나요?",
        "choices": [
          "왕이 되셨어요",
          "저주가 되셨어요",
          "선지자가 되셨어요"
        ],
        "answer": 1,
        "where": "갈라디아서 3장 13절"
      },
      {
        "d": "화",
        "ref": "로마서 6장 4~6절",
        "url": "https://www.bskorea.or.kr/bible/korbibReadpage.php?version=GAE&book=rom&chap=6&sec=4",
        "ask": "그리스도와 함께 십자가에 못 박힌 것은 무엇인가요?",
        "choices": [
          "우리의 옛 사람이에요",
          "우리의 몸만이에요",
          "우리의 집이에요"
        ],
        "answer": 0,
        "where": "로마서 6장 6절"
      },
      {
        "d": "수",
        "ref": "빌립보서 1장 20~23절",
        "url": "https://www.bskorea.or.kr/bible/korbibReadpage.php?version=GAE&book=php&chap=1&sec=20",
        "ask": "바울은 죽는 것도 무엇이라고 말하나요?",
        "choices": [
          "슬픔이라고",
          "끝이라고",
          "유익이라고"
        ],
        "answer": 2,
        "where": "빌립보서 1장 21절"
      },
      {
        "d": "목",
        "ref": "히브리서 2장 14~15절",
        "url": "https://www.bskorea.or.kr/bible/korbibReadpage.php?version=GAE&book=heb&chap=2&sec=14",
        "ask": "예수님은 죽음을 통해 누구를 멸하셨다고 하나요?",
        "choices": [
          "모든 사람을",
          "죽음의 세력을 잡은 자를",
          "모든 천사를"
        ],
        "answer": 1,
        "where": "히브리서 2장 14절"
      },
      {
        "d": "금",
        "ref": "요한복음 19장 16~19절",
        "url": "https://www.bskorea.or.kr/bible/korbibReadpage.php?version=GAE&book=jhn&chap=19&sec=16",
        "ask": "예수님이 십자가를 지시고 가신 곳의 이름은 무엇인가요?",
        "choices": [
          "골고다",
          "베다니",
          "가버나움"
        ],
        "answer": 0,
        "where": "요한복음 19장 17절"
      }
    ]
  },
  {
    "n": 17,
    "group": "예수님",
    "title": "부활",
    "q": "예수님이 다시 살아나신 일은 오늘 나에게 어떤 힘이 되나요?",
    "refs": [
      "로마서 4장 25절",
      "로마서 6장 4절",
      "고린도전서 15장 20절"
    ],
    "confess": "예수님이 죽음을 이기고 다시 살아나셨다고 교회는 고백해 왔어요. 그 부활로 예수님이 십자가에서 얻으신 의로움을 우리가 함께 받게 되었다고요. 또 그분의 능력으로 우리도 새 삶을 살도록 일으켜졌고, 예수님의 부활은 우리도 언젠가 다시 살아날 것이라는 확실한 보증이라고 해요.",
    "short": "예수님의 부활은 새 삶과 우리 부활의 보증이에요",
    "base": "하이델베르크 17주일(45문) · 소요리문답 28문",
    "img": "../note/img/w/weekly-17.webp",
    "alt": "부활 주의 상징 정물: 개어 놓인 세마포, 새벽빛, 백합",
    "days": [
      {
        "d": "월",
        "ref": "로마서 4장 23~25절",
        "url": "https://www.bskorea.or.kr/bible/korbibReadpage.php?version=GAE&book=rom&chap=4&sec=23",
        "ask": "예수님은 무엇을 위해 살아나셨다고 하나요?",
        "choices": [
          "우리의 위로를 위해",
          "우리의 여행을 위해",
          "우리를 의롭다 하시기 위해"
        ],
        "answer": 2,
        "where": "로마서 4장 25절"
      },
      {
        "d": "화",
        "ref": "로마서 6장 3~5절",
        "url": "https://www.bskorea.or.kr/bible/korbibReadpage.php?version=GAE&book=rom&chap=6&sec=3",
        "ask": "그리스도께서 살아나신 것처럼 우리도 어떻게 행하게 되나요?",
        "choices": [
          "새 생명 가운데",
          "옛 길 가운데",
          "어둠 가운데"
        ],
        "answer": 0,
        "where": "로마서 6장 4절"
      },
      {
        "d": "수",
        "ref": "고린도전서 15장 20~23절",
        "url": "https://www.bskorea.or.kr/bible/korbibReadpage.php?version=GAE&book=1co&chap=15&sec=20",
        "ask": "잠자는 자들의 첫 열매가 되신 분은 누구인가요?",
        "choices": [
          "아담이에요",
          "그리스도세요",
          "모세예요"
        ],
        "answer": 1,
        "where": "고린도전서 15장 20절"
      },
      {
        "d": "목",
        "ref": "베드로전서 1장 3~5절",
        "url": "https://www.bskorea.or.kr/bible/korbibReadpage.php?version=GAE&book=1pe&chap=1&sec=3",
        "ask": "예수님의 부활을 통해 우리를 다시 낳아 주신 소망은 무엇인가요?",
        "choices": [
          "사라지는 소망",
          "잠깐의 소망",
          "산 소망"
        ],
        "answer": 2,
        "where": "베드로전서 1장 3절"
      },
      {
        "d": "금",
        "ref": "고린도전서 15장 54~57절",
        "url": "https://www.bskorea.or.kr/bible/korbibReadpage.php?version=GAE&book=1co&chap=15&sec=54",
        "ask": "바울은 죽음에 대한 승리를 주시는 분이 누구라고 하나요?",
        "choices": [
          "하나님이세요",
          "사람이예요",
          "천사예요"
        ],
        "answer": 0,
        "where": "고린도전서 15장 57절"
      }
    ]
  },
  {
    "n": 18,
    "group": "예수님",
    "title": "하늘로 오르심",
    "q": "예수님이 하늘로 올라가신 일이 나에게 무슨 도움이 되나요?",
    "refs": [
      "사도행전 1장 9~11절",
      "로마서 8장 34절",
      "골로새서 3장 1~2절"
    ],
    "confess": "예수님은 제자들이 보는 앞에서 하늘로 올라가셨고, 우리를 떠나신 것이 아니라 하늘에서 우리를 위해 일하신다고 교회는 고백해 왔어요. 아버지 앞에서 우리를 위해 대신 구해 주시고, 우리의 머리 되신 그분이 몸에 속한 우리도 언젠가 자기에게로 이끄실 것이라는 확실한 약속이 된다고요. 또 성령님을 보내 주셔서 우리가 땅의 것만이 아니라 위의 것을 바라보게 하신다고 해요.",
    "short": "하늘에 오르신 예수님이 우리 편에서 아버지께 구해 주세요",
    "base": "하이델베르크 18주일(46~49문) · 소요리문답 28문",
    "img": "../note/img/w/weekly-18.webp",
    "alt": "하늘로 오르심 주의 상징 정물: 활짝 열린 창, 높이 뜬 흰 구름",
    "days": [
      {
        "d": "월",
        "ref": "사도행전 1장 8~9절",
        "url": "https://www.bskorea.or.kr/bible/korbibReadpage.php?version=GAE&book=act&chap=1&sec=8",
        "ask": "예수님이 올라가실 때 무엇이 그분을 가렸나요?",
        "choices": [
          "빛이",
          "구름이",
          "어둠이"
        ],
        "answer": 1,
        "where": "사도행전 1장 9절"
      },
      {
        "d": "화",
        "ref": "로마서 8장 33~34절",
        "url": "https://www.bskorea.or.kr/bible/korbibReadpage.php?version=GAE&book=rom&chap=8&sec=33",
        "ask": "예수님은 하나님 오른편에서 우리를 위해 무엇을 하시나요?",
        "choices": [
          "재판하세요",
          "떠나세요",
          "간구하세요"
        ],
        "answer": 2,
        "where": "로마서 8장 34절"
      },
      {
        "d": "수",
        "ref": "요한복음 14장 1~3절",
        "url": "https://www.bskorea.or.kr/bible/korbibReadpage.php?version=GAE&book=jhn&chap=14&sec=1",
        "ask": "예수님은 제자들을 위해 무엇을 예비하러 가신다고 하나요?",
        "choices": [
          "거처를",
          "음식을",
          "배를"
        ],
        "answer": 0,
        "where": "요한복음 14장 2절"
      },
      {
        "d": "목",
        "ref": "골로새서 3장 1~4절",
        "url": "https://www.bskorea.or.kr/bible/korbibReadpage.php?version=GAE&book=col&chap=3&sec=1",
        "ask": "그리스도가 계시는 곳은 어디라고 하나요?",
        "choices": [
          "땅 아래",
          "하나님 오른편",
          "바다 건너"
        ],
        "answer": 1,
        "where": "골로새서 3장 1절"
      },
      {
        "d": "금",
        "ref": "요한복음 16장 5~7절",
        "url": "https://www.bskorea.or.kr/bible/korbibReadpage.php?version=GAE&book=jhn&chap=16&sec=5",
        "ask": "예수님은 떠나시면 누구를 보내겠다고 하나요?",
        "choices": [
          "새 왕을",
          "새 제사장을",
          "보혜사를"
        ],
        "answer": 2,
        "where": "요한복음 16장 7절"
      }
    ]
  },
  {
    "n": 19,
    "group": "예수님",
    "title": "다시 오심",
    "q": "예수님이 다시 오셔서 심판하신다는 말은 왜 위로가 될까요?",
    "refs": [
      "에베소서 1장 20~22절",
      "사도행전 1장 11절",
      "데살로니가전서 4장 16~18절"
    ],
    "confess": "예수님은 하늘에서 아버지의 오른편에 앉아 교회의 머리로서 모든 것을 다스리신다고 교회는 고백해 왔어요. 그분은 성령님으로 하늘의 선물을 부어 주시고 능력으로 우리를 지켜 주세요. 마지막에는 심판하는 분으로 다시 오시는데, 그 심판자가 바로 나를 위해 심판을 대신 받으신 예수님이라서 고개를 들고 기다릴 수 있다고 해요.",
    "short": "다시 오실 심판자는 나를 위해 죽으신 예수님이세요",
    "base": "하이델베르크 19주일(50~52문) · 소요리문답 28문",
    "img": "../note/img/w/weekly-19.webp",
    "alt": "다시 오심 주의 상징 정물: 기름 채운 등, 문가에 가지런한 신발",
    "days": [
      {
        "d": "월",
        "ref": "에베소서 1장 20~23절",
        "url": "https://www.bskorea.or.kr/bible/korbibReadpage.php?version=GAE&book=eph&chap=1&sec=20",
        "ask": "하나님은 그리스도를 교회의 무엇으로 삼으셨나요?",
        "choices": [
          "머리로",
          "일꾼으로",
          "문지기로"
        ],
        "answer": 0,
        "where": "에베소서 1장 22절"
      },
      {
        "d": "화",
        "ref": "사도행전 1장 10~11절",
        "url": "https://www.bskorea.or.kr/bible/korbibReadpage.php?version=GAE&book=act&chap=1&sec=10",
        "ask": "천사들은 예수님이 어떻게 다시 오신다고 하나요?",
        "choices": [
          "전혀 다르게",
          "가심을 본 그대로",
          "아무도 모르게"
        ],
        "answer": 1,
        "where": "사도행전 1장 11절"
      },
      {
        "d": "수",
        "ref": "데살로니가전서 4장 16~18절",
        "url": "https://www.bskorea.or.kr/bible/korbibReadpage.php?version=GAE&book=1th&chap=4&sec=16",
        "ask": "주께서 하늘에서 내려오실 때 무엇이 울린다고 하나요?",
        "choices": [
          "피리 소리가",
          "북소리가",
          "하나님의 나팔이"
        ],
        "answer": 2,
        "where": "데살로니가전서 4장 16절"
      },
      {
        "d": "목",
        "ref": "마태복음 25장 31~33절",
        "url": "https://www.bskorea.or.kr/bible/korbibReadpage.php?version=GAE&book=mat&chap=25&sec=31",
        "ask": "인자가 영광으로 올 때 앉을 자리는 어디인가요?",
        "choices": [
          "영광의 보좌",
          "회당의 자리",
          "성전의 뜰"
        ],
        "answer": 0,
        "where": "마태복음 25장 31절"
      },
      {
        "d": "금",
        "ref": "디모데후서 4장 7~8절",
        "url": "https://www.bskorea.or.kr/bible/korbibReadpage.php?version=GAE&book=2ti&chap=4&sec=7",
        "ask": "바울은 주의 나타나심을 사모하는 사람에게 무엇이 있다고 하나요?",
        "choices": [
          "많은 재물이",
          "의의 면류관이",
          "높은 지위가"
        ],
        "answer": 1,
        "where": "디모데후서 4장 8절"
      }
    ]
  },
  {
    "n": 20,
    "group": "성령님과 교회",
    "title": "성령님",
    "q": "성령님은 누구시며 지금 내 삶에서 무슨 일을 하시나요?",
    "refs": [
      "요한복음 14장 16~17절",
      "사도행전 5장 3~4절",
      "고린도전서 12장 3절"
    ],
    "confess": "성령님은 아버지와 아들과 함께 참되고 영원한 하나님이시라고 교회는 고백해 왔어요. 그 성령님이 나에게도 주어져서, 믿음으로 내가 예수님과 그분이 주시는 모든 복에 함께하게 하시고, 나를 위로하시며 영원히 함께 계신다고요. 예수님을 주님이라 고백하는 것도 성령님의 일하심이라고 해요.",
    "short": "성령님은 하나님이시고 나와 함께 계세요",
    "base": "하이델베르크 20주일(53문) · 소요리문답 6문, 30문",
    "img": "../note/img/w/weekly-20.webp",
    "alt": "성령님 주의 상징 정물: 바람에 부푼 커튼, 흔들리는 등잔불",
    "days": [
      {
        "d": "월",
        "ref": "요한복음 14장 16~17절",
        "url": "https://www.bskorea.or.kr/bible/korbibReadpage.php?version=GAE&book=jhn&chap=14&sec=16",
        "ask": "예수님은 아버지께 구해 누구를 보내시겠다고 하나요?",
        "choices": [
          "다른 선지자를",
          "다른 왕을",
          "다른 보혜사를"
        ],
        "answer": 2,
        "where": "요한복음 14장 16절"
      },
      {
        "d": "화",
        "ref": "사도행전 5장 3~4절",
        "url": "https://www.bskorea.or.kr/bible/korbibReadpage.php?version=GAE&book=act&chap=5&sec=3",
        "ask": "베드로는 아나니아가 누구를 속였다고 말하나요?",
        "choices": [
          "하나님을",
          "제사장을",
          "백성을"
        ],
        "answer": 0,
        "where": "사도행전 5장 4절"
      },
      {
        "d": "수",
        "ref": "고린도전서 2장 10~12절",
        "url": "https://www.bskorea.or.kr/bible/korbibReadpage.php?version=GAE&book=1co&chap=2&sec=10",
        "ask": "성령은 하나님의 무엇까지 통달하신다고 하나요?",
        "choices": [
          "높은 산까지",
          "깊은 것까지",
          "먼 나라까지"
        ],
        "answer": 1,
        "where": "고린도전서 2장 10절"
      },
      {
        "d": "목",
        "ref": "요한복음 15장 26~27절",
        "url": "https://www.bskorea.or.kr/bible/korbibReadpage.php?version=GAE&book=jhn&chap=15&sec=26",
        "ask": "예수님이 보내실 진리의 성령은 누구를 증언하시나요?",
        "choices": [
          "제자들을",
          "세상을",
          "예수님을"
        ],
        "answer": 2,
        "where": "요한복음 15장 26절"
      },
      {
        "d": "금",
        "ref": "로마서 8장 14~16절",
        "url": "https://www.bskorea.or.kr/bible/korbibReadpage.php?version=GAE&book=rom&chap=8&sec=14",
        "ask": "하나님의 영으로 인도함 받는 사람은 누구의 아들인가요?",
        "choices": [
          "하나님의 아들이에요",
          "아브라함의 아들이에요",
          "다윗의 아들이에요"
        ],
        "answer": 0,
        "where": "로마서 8장 14절"
      }
    ]
  },
  {
    "n": 21,
    "group": "성령님과 교회",
    "title": "교회",
    "q": "교회는 사람이 모인 곳 그 이상의 어떤 공동체일까요?",
    "refs": [
      "요한복음 10장 27~28절",
      "고린도전서 12장 12~13절",
      "고린도후서 5장 19절"
    ],
    "confess": "교회는 사람이 만든 모임이 아니라, 하나님의 아들이 처음부터 세상 끝까지 말씀과 성령님으로 모으시고 지키시는 공동체라고 교회는 고백해 왔어요. 그 안의 모든 성도는 한 몸의 지체여서, 받은 선물을 서로의 유익과 기쁨을 위해 나눈다고요. 하나님이 그리스도 안에서 우리 죄를 더 이상 기억하지 않으시고 용서하셨다는 기쁜 소식이 교회에서 선포된다고 해요.",
    "short": "교회는 예수님이 모으시고 지키시는 공동체예요",
    "base": "하이델베르크 21주일(54~56문)",
    "img": "../note/img/w/weekly-21.webp",
    "alt": "교회 주의 상징 정물: 문간에 나란히 놓인 여러 사람의 신발",
    "days": [
      {
        "d": "월",
        "ref": "요한복음 10장 27~28절",
        "url": "https://www.bskorea.or.kr/bible/korbibReadpage.php?version=GAE&book=jhn&chap=10&sec=27",
        "ask": "예수님의 양들은 누구의 음성을 듣는다고 하나요?",
        "choices": [
          "낯선 사람의",
          "예수님의",
          "서기관의"
        ],
        "answer": 1,
        "where": "요한복음 10장 27절"
      },
      {
        "d": "화",
        "ref": "고린도전서 12장 12~13절",
        "url": "https://www.bskorea.or.kr/bible/korbibReadpage.php?version=GAE&book=1co&chap=12&sec=12",
        "ask": "우리는 한 성령으로 세례를 받아 무엇이 되었나요?",
        "choices": [
          "한 가정",
          "한 마을",
          "한 몸"
        ],
        "answer": 2,
        "where": "고린도전서 12장 13절"
      },
      {
        "d": "수",
        "ref": "에베소서 4장 11~13절",
        "url": "https://www.bskorea.or.kr/bible/korbibReadpage.php?version=GAE&book=eph&chap=4&sec=11",
        "ask": "성도를 온전하게 하여 세우려는 것은 무엇인가요?",
        "choices": [
          "그리스도의 몸",
          "큰 성전 건물",
          "새로운 왕국"
        ],
        "answer": 0,
        "where": "에베소서 4장 12절"
      },
      {
        "d": "목",
        "ref": "마태복음 16장 16~18절",
        "url": "https://www.bskorea.or.kr/bible/korbibReadpage.php?version=GAE&book=mat&chap=16&sec=16",
        "ask": "예수님은 무엇을 세우시겠다고 말씀하시나요?",
        "choices": [
          "새 왕궁을",
          "내 교회를",
          "큰 성읍을"
        ],
        "answer": 1,
        "where": "마태복음 16장 18절"
      },
      {
        "d": "금",
        "ref": "고린도후서 5장 18~20절",
        "url": "https://www.bskorea.or.kr/bible/korbibReadpage.php?version=GAE&book=2co&chap=5&sec=18",
        "ask": "하나님은 우리에게 어떤 직분을 주셨다고 하나요?",
        "choices": [
          "재판의 직분",
          "통치의 직분",
          "화목하게 하는 직분"
        ],
        "answer": 2,
        "where": "고린도후서 5장 18절"
      }
    ]
  },
  {
    "n": 22,
    "group": "성령님과 교회",
    "title": "영원한 생명",
    "q": "죽음이 끝이 아니라면 그 뒤에는 어떤 삶이 기다리고 있나요?",
    "refs": [
      "요한복음 11장 25~26절",
      "고린도전서 15장 42~44절",
      "고린도전서 2장 9절"
    ],
    "confess": "믿는 사람에게 죽음은 끝이 아니라고 교회는 고백해 왔어요. 마지막 날에는 이 몸도 예수님의 능력으로 다시 살아나, 예수님의 영광스러운 몸을 닮게 된다고요. 영원한 생명의 기쁨은 이미 마음속에서 시작되었고, 지금은 다 알 수 없는 완전한 복을 하나님과 함께 누리게 된다고 해요.",
    "short": "죽음 뒤에도 예수님과 함께하는 영원한 생명이 있어요",
    "base": "하이델베르크 22주일(57~58문) · 소요리문답 37~38문",
    "img": "../note/img/w/weekly-22.webp",
    "alt": "영원한 생명 주의 상징 정물: 씨앗과 그 곁에 막 돋은 싹",
    "days": [
      {
        "d": "월",
        "ref": "요한복음 11장 24~26절",
        "url": "https://www.bskorea.or.kr/bible/korbibReadpage.php?version=GAE&book=jhn&chap=11&sec=24",
        "ask": "예수님은 자신을 부활과 무엇이라고 말씀하시나요?",
        "choices": [
          "생명",
          "진리",
          "길"
        ],
        "answer": 0,
        "where": "요한복음 11장 25절"
      },
      {
        "d": "화",
        "ref": "고린도전서 15장 42~44절",
        "url": "https://www.bskorea.or.kr/bible/korbibReadpage.php?version=GAE&book=1co&chap=15&sec=42",
        "ask": "썩을 것으로 심고 무엇으로 다시 살아난다고 하나요?",
        "choices": [
          "약한 것으로",
          "썩지 아니할 것으로",
          "욕된 것으로"
        ],
        "answer": 1,
        "where": "고린도전서 15장 42절"
      },
      {
        "d": "수",
        "ref": "빌립보서 3장 20~21절",
        "url": "https://www.bskorea.or.kr/bible/korbibReadpage.php?version=GAE&book=php&chap=3&sec=20",
        "ask": "예수님은 우리의 낮은 몸을 무엇과 같게 바꾸시나요?",
        "choices": [
          "천사들의 몸과",
          "아담의 몸과",
          "자기 영광의 몸과"
        ],
        "answer": 2,
        "where": "빌립보서 3장 21절"
      },
      {
        "d": "목",
        "ref": "고린도후서 5장 1~4절",
        "url": "https://www.bskorea.or.kr/bible/korbibReadpage.php?version=GAE&book=2co&chap=5&sec=1",
        "ask": "땅에 있는 장막 집이 무너지면 무엇이 있다고 하나요?",
        "choices": [
          "하늘에 있는 영원한 집",
          "땅에 있는 새 집",
          "광야에 있는 집"
        ],
        "answer": 0,
        "where": "고린도후서 5장 1절"
      },
      {
        "d": "금",
        "ref": "요한계시록 21장 3~5절",
        "url": "https://www.bskorea.or.kr/bible/korbibReadpage.php?version=GAE&book=rev&chap=21&sec=3",
        "ask": "새 하늘과 새 땅에서 하나님이 없애시는 것은 무엇인가요?",
        "choices": [
          "별들과 달",
          "사망",
          "바다의 물고기"
        ],
        "answer": 1,
        "where": "요한계시록 21장 4절"
      }
    ]
  },
  {
    "n": 23,
    "group": "믿음으로 의롭게 됨",
    "title": "은혜로 의롭게",
    "q": "잘한 것이 없는 나를 하나님은 어떻게 의롭다고 하실까요?",
    "refs": [
      "로마서 3장 21~24절",
      "로마서 5장 1절"
    ],
    "confess": "내 양심이 나를 죄인이라고 고발해도, 하나님은 내 공로와 상관없이 오직 은혜로 예수님의 완전한 의로움을 내 것으로 삼아 주신다고 교회는 고백해 왔어요. 예수님이 이루신 의로움과 순종이 내 것으로 여겨져서, 하나님이 나를 죄 없는 사람으로 받아 주신다고요. 이것을 '오직 믿음으로' 받는다고 하는 것은, 내 믿음이 값져서가 아니라 예수님이 이루신 의로움을 받을 수 있는 길이 믿음뿐이기 때문이라고 해요.",
    "short": "내 공로가 아니라 예수님의 의로움을 받아요",
    "base": "하이델베르크 23주일(59~61문) · 소요리문답 33문, 86문",
    "img": "../note/img/w/weekly-23.webp",
    "alt": "은혜로 의롭게 주의 상징 정물: 깨끗이 빨아 걸어 둔 흰 겉옷",
    "days": [
      {
        "d": "월",
        "ref": "로마서 3장 21~24절",
        "url": "https://www.bskorea.or.kr/bible/korbibReadpage.php?version=GAE&book=rom&chap=3&sec=21",
        "ask": "사람들은 무엇으로 값없이 의롭다 하심을 얻나요?",
        "choices": [
          "재물로",
          "수고로",
          "은혜로"
        ],
        "answer": 2,
        "where": "로마서 3장 24절"
      },
      {
        "d": "화",
        "ref": "로마서 5장 1~2절",
        "url": "https://www.bskorea.or.kr/bible/korbibReadpage.php?version=GAE&book=rom&chap=5&sec=1",
        "ask": "믿음으로 의롭다 하심을 받은 우리는 무엇을 누린다고 하나요?",
        "choices": [
          "하나님과의 화평",
          "사람들의 칭찬",
          "세상의 재물"
        ],
        "answer": 0,
        "where": "로마서 5장 1절"
      },
      {
        "d": "수",
        "ref": "빌립보서 3장 8~9절",
        "url": "https://www.bskorea.or.kr/bible/korbibReadpage.php?version=GAE&book=php&chap=3&sec=8",
        "ask": "바울은 율법에서 난 의 대신 무엇을 원하나요?",
        "choices": [
          "사람의 의",
          "믿음으로 난 의",
          "자기의 의"
        ],
        "answer": 1,
        "where": "빌립보서 3장 9절"
      },
      {
        "d": "목",
        "ref": "갈라디아서 2장 15~16절",
        "url": "https://www.bskorea.or.kr/bible/korbibReadpage.php?version=GAE&book=gal&chap=2&sec=15",
        "ask": "사람은 무엇으로 의롭다 함을 얻는다고 하나요?",
        "choices": [
          "율법의 행위로",
          "자기 공로로",
          "예수 그리스도를 믿음으로"
        ],
        "answer": 2,
        "where": "갈라디아서 2장 16절"
      },
      {
        "d": "금",
        "ref": "로마서 4장 4~5절",
        "url": "https://www.bskorea.or.kr/bible/korbibReadpage.php?version=GAE&book=rom&chap=4&sec=4",
        "ask": "일하지 않아도 믿는 사람에게 의로 여겨지는 것은 무엇인가요?",
        "choices": [
          "그의 믿음",
          "그의 재물",
          "그의 지위"
        ],
        "answer": 0,
        "where": "로마서 4장 5절"
      }
    ]
  },
  {
    "n": 24,
    "group": "믿음으로 의롭게 됨",
    "title": "선한 일",
    "q": "은혜로 구원받는다면 내가 하는 선한 일은 의미가 없을까요?",
    "refs": [
      "이사야 64장 6절",
      "에베소서 2장 10절",
      "요한복음 15장 5절"
    ],
    "confess": "우리의 가장 좋은 행동도 이 세상에서는 불완전하고 죄가 묻어 있어서, 선한 일로 하나님 앞에서 의롭게 될 수는 없다고 교회는 고백해 왔어요. 그렇다고 선한 일이 아무 쓸모없는 것은 아니에요. 하나님이 주시는 상도 우리가 얻어 낸 값이 아니라 은혜의 선물이라고요. 예수님께 붙어 있는 사람에게는 감사의 열매가 맺히지 않을 수 없다고 해요.",
    "short": "선한 일은 구원의 값이 아니라 감사의 열매예요",
    "base": "하이델베르크 24주일(62~64문) · 소요리문답 35문",
    "img": "../note/img/w/weekly-24.webp",
    "alt": "선한 일 주의 상징 정물: 열매 맺은 포도나무 가지",
    "days": [
      {
        "d": "월",
        "ref": "이사야 64장 5~6절",
        "url": "https://www.bskorea.or.kr/bible/korbibReadpage.php?version=GAE&book=isa&chap=64&sec=5",
        "ask": "우리의 의는 무엇 같다고 하나요?",
        "choices": [
          "깨끗한 물 같아요",
          "더러운 옷 같아요",
          "새 옷 같아요"
        ],
        "answer": 1,
        "where": "이사야 64장 6절"
      },
      {
        "d": "화",
        "ref": "에베소서 2장 8~10절",
        "url": "https://www.bskorea.or.kr/bible/korbibReadpage.php?version=GAE&book=eph&chap=2&sec=8",
        "ask": "우리는 그리스도 안에서 무엇을 위해 지으심 받았나요?",
        "choices": [
          "큰 이름을 위해",
          "많은 재물을 위해",
          "선한 일을 위해"
        ],
        "answer": 2,
        "where": "에베소서 2장 10절"
      },
      {
        "d": "수",
        "ref": "요한복음 15장 4~5절",
        "url": "https://www.bskorea.or.kr/bible/korbibReadpage.php?version=GAE&book=jhn&chap=15&sec=4",
        "ask": "예수님은 자신을 무엇이라고 말씀하시나요?",
        "choices": [
          "포도나무",
          "무화과나무",
          "감람나무"
        ],
        "answer": 0,
        "where": "요한복음 15장 5절"
      },
      {
        "d": "목",
        "ref": "누가복음 17장 7~10절",
        "url": "https://www.bskorea.or.kr/bible/korbibReadpage.php?version=GAE&book=luk&chap=17&sec=7",
        "ask": "종은 명령받은 일을 다 한 뒤 자신을 무엇이라 말하나요?",
        "choices": [
          "큰 공로자",
          "무익한 종",
          "높은 주인"
        ],
        "answer": 1,
        "where": "누가복음 17장 10절"
      },
      {
        "d": "금",
        "ref": "로마서 11장 5~6절",
        "url": "https://www.bskorea.or.kr/bible/korbibReadpage.php?version=GAE&book=rom&chap=11&sec=5",
        "ask": "은혜로 된 것이면 더 이상 무엇으로 된 것이 아니라고 하나요?",
        "choices": [
          "약속으로",
          "믿음으로",
          "행위로"
        ],
        "answer": 2,
        "where": "로마서 11장 6절"
      }
    ]
  },
  {
    "n": 25,
    "group": "세례와 성찬",
    "title": "눈에 보이는 표",
    "q": "세례와 성찬처럼 눈에 보이는 표를 주시는 까닭은 무엇일까요?",
    "refs": [
      "로마서 10장 17절",
      "로마서 4장 11절"
    ],
    "confess": "믿음은 복음을 들을 때 성령님이 우리 마음에 일으켜 주신다고 교회는 고백해 왔어요. 하나님은 그 약속을 더 확실히 해 주시려고 눈에 보이는 거룩한 표와 도장을 주셨다고요. 이 표들은 말씀과 함께 예수님의 십자가를 가리켜서, 용서와 영원한 생명이 나에게도 주어졌다는 것을 눈으로 보고 손으로 받게 해 준다고 해요. 예수님이 새 언약에 세워 주신 표로는 세례와 성찬을 함께 꼽아 왔어요.",
    "short": "표는 복음의 약속을 눈으로 보게 해 줘요",
    "base": "하이델베르크 25주일(65~68문) · 소요리문답 91~93문",
    "img": "../note/img/w/weekly-25.webp",
    "alt": "눈에 보이는 표 주의 상징 정물: 인장 반지와 밀랍 봉인",
    "days": [
      {
        "d": "월",
        "ref": "로마서 10장 16~17절",
        "url": "https://www.bskorea.or.kr/bible/korbibReadpage.php?version=GAE&book=rom&chap=10&sec=16",
        "ask": "믿음은 무엇에서 난다고 하나요?",
        "choices": [
          "들음에서",
          "봄에서",
          "만짐에서"
        ],
        "answer": 0,
        "where": "로마서 10장 17절"
      },
      {
        "d": "화",
        "ref": "로마서 4장 9~11절",
        "url": "https://www.bskorea.or.kr/bible/korbibReadpage.php?version=GAE&book=rom&chap=4&sec=9",
        "ask": "아브라함은 할례의 표를 무엇으로 받았다고 하나요?",
        "choices": [
          "벌로 받았어요",
          "인으로 받았어요",
          "상으로 받았어요"
        ],
        "answer": 1,
        "where": "로마서 4장 11절"
      },
      {
        "d": "수",
        "ref": "마태복음 28장 18~20절",
        "url": "https://www.bskorea.or.kr/bible/korbibReadpage.php?version=GAE&book=mat&chap=28&sec=18",
        "ask": "예수님은 제자들에게 무엇을 베풀라고 하시나요?",
        "choices": [
          "기름 부음을",
          "안수를",
          "세례를"
        ],
        "answer": 2,
        "where": "마태복음 28장 19절"
      },
      {
        "d": "목",
        "ref": "고린도전서 11장 23~26절",
        "url": "https://www.bskorea.or.kr/bible/korbibReadpage.php?version=GAE&book=1co&chap=11&sec=23",
        "ask": "바울은 떡을 먹고 잔을 마실 때 무엇을 전한다고 하나요?",
        "choices": [
          "주의 죽으심을",
          "모세의 출생을",
          "이스라엘의 왕권을"
        ],
        "answer": 0,
        "where": "고린도전서 11장 26절"
      },
      {
        "d": "금",
        "ref": "사도행전 2장 37~39절",
        "url": "https://www.bskorea.or.kr/bible/korbibReadpage.php?version=GAE&book=act&chap=2&sec=37",
        "ask": "베드로는 회개한 사람에게 무엇을 받으라고 하나요?",
        "choices": [
          "새 이름을",
          "세례를",
          "새 옷을"
        ],
        "answer": 1,
        "where": "사도행전 2장 38절"
      }
    ]
  },
  {
    "n": 26,
    "group": "세례와 성찬",
    "title": "세례",
    "q": "세례를 받을 때 쓰는 물은 나에게 무엇을 약속해 주나요?",
    "refs": [
      "디도서 3장 5절",
      "로마서 6장 3~4절",
      "마태복음 28장 19절"
    ],
    "confess": "물로 몸의 더러움을 씻듯이 예수님의 피와 성령님이 내 죄를 씻어 주신다는 약속을 눈에 보이게 하는 표가 세례라고 교회는 고백해 왔어요. 세례는 하나님이 내 하나님이 되어 주시고 내가 그분의 이름에 속한 사람이 되었다는 표이기도 해요. 또 예수님과 함께 옛 모습은 죽고 새 생명으로 걸어가도록 부르시는 표라고 해요.",
    "short": "세례는 예수님이 내 죄를 씻으신다는 눈에 보이는 약속이에요",
    "base": "하이델베르크 26주일(69~71문) · 소요리문답 94문",
    "img": "../note/img/w/weekly-26.webp",
    "alt": "세례 주의 상징 정물: 물 담긴 대야와 수건",
    "days": [
      {
        "d": "월",
        "ref": "디도서 3장 4~6절",
        "url": "https://www.bskorea.or.kr/bible/korbibReadpage.php?version=GAE&book=tit&chap=3&sec=4",
        "ask": "하나님은 무엇의 씻음과 성령의 새롭게 하심으로 구원하셨나요?",
        "choices": [
          "바닷물의 씻음",
          "손발의 씻음",
          "중생의 씻음"
        ],
        "answer": 2,
        "where": "디도서 3장 5절"
      },
      {
        "d": "화",
        "ref": "로마서 6장 3~4절",
        "url": "https://www.bskorea.or.kr/bible/korbibReadpage.php?version=GAE&book=rom&chap=6&sec=3",
        "ask": "우리는 세례를 통해 누구의 죽으심에 합하여졌나요?",
        "choices": [
          "그리스도의 죽으심",
          "모세의 죽으심",
          "아담의 죽으심"
        ],
        "answer": 0,
        "where": "로마서 6장 3절"
      },
      {
        "d": "수",
        "ref": "사도행전 22장 14~16절",
        "url": "https://www.bskorea.or.kr/bible/korbibReadpage.php?version=GAE&book=act&chap=22&sec=14",
        "ask": "아나니아는 바울에게 일어나 무엇을 받으라고 하나요?",
        "choices": [
          "왕관을",
          "세례를",
          "책을"
        ],
        "answer": 1,
        "where": "사도행전 22장 16절"
      },
      {
        "d": "목",
        "ref": "갈라디아서 3장 26~28절",
        "url": "https://www.bskorea.or.kr/bible/korbibReadpage.php?version=GAE&book=gal&chap=3&sec=26",
        "ask": "그리스도와 합하기 위해 세례받은 사람은 누구로 옷 입었나요?",
        "choices": [
          "모세로",
          "아브라함으로",
          "그리스도로"
        ],
        "answer": 2,
        "where": "갈라디아서 3장 27절"
      },
      {
        "d": "금",
        "ref": "베드로전서 3장 20~22절",
        "url": "https://www.bskorea.or.kr/bible/korbibReadpage.php?version=GAE&book=1pe&chap=3&sec=20",
        "ask": "베드로는 세례를 무엇을 구하는 일이라고 설명하나요?",
        "choices": [
          "선한 양심",
          "많은 재물",
          "긴 생명"
        ],
        "answer": 0,
        "where": "베드로전서 3장 21절"
      }
    ]
  },
  {
    "n": 27,
    "group": "세례와 성찬",
    "title": "세례의 물",
    "q": "물로 세례를 받으면 정말 내 죄가 씻기는 건가요?",
    "refs": [
      "요한일서 1장 7절",
      "베드로전서 3장 21절"
    ],
    "confess": "예수님의 피와 성령님이 우리를 모든 죄에서 깨끗하게 하신다고 교회는 고백해 왔어요. 세례의 물은 몸의 더러움을 씻듯 그 약속을 눈에 보이게 해 주는 하나님의 표예요. 하나님이 먼저 약속하시고 그 약속을 물로 보여 주신다고 해요.",
    "short": "죄를 씻으시는 분은 예수님과 성령님이세요",
    "base": "하이델베르크 27주일(72~74문) · 소요리문답 94문",
    "img": "../note/img/w/weekly-27.webp",
    "alt": "세례의 물 주의 상징 정물: 맑은 물이 흐르는 항아리, 깨끗해진 천",
    "days": [
      {
        "d": "월",
        "ref": "요한일서 1장 6~7절",
        "url": "https://www.bskorea.or.kr/bible/korbibReadpage.php?version=GAE&book=1jn&chap=1&sec=6",
        "ask": "무엇이 우리를 모든 죄에서 깨끗하게 한다고 하나요?",
        "choices": [
          "우리의 눈물이",
          "예수님의 피가",
          "세례의 물만이"
        ],
        "answer": 1,
        "where": "요한일서 1장 7절"
      },
      {
        "d": "화",
        "ref": "베드로전서 3장 20~22절",
        "url": "https://www.bskorea.or.kr/bible/korbibReadpage.php?version=GAE&book=1pe&chap=3&sec=20",
        "ask": "베드로는 세례가 무엇을 씻어 내는 일이 아니라고 하나요?",
        "choices": [
          "마음의 근심을",
          "사람의 기억을",
          "육체의 더러운 것을"
        ],
        "answer": 2,
        "where": "베드로전서 3장 21절"
      },
      {
        "d": "수",
        "ref": "사도행전 8장 12~13절",
        "url": "https://www.bskorea.or.kr/bible/korbibReadpage.php?version=GAE&book=act&chap=8&sec=12",
        "ask": "사마리아 사람들은 누구의 이름을 믿고 세례를 받았나요?",
        "choices": [
          "예수 그리스도의",
          "세례 요한의",
          "사도 베드로의"
        ],
        "answer": 0,
        "where": "사도행전 8장 12절"
      },
      {
        "d": "목",
        "ref": "사도행전 8장 36~39절",
        "url": "https://www.bskorea.or.kr/bible/korbibReadpage.php?version=GAE&book=act&chap=8&sec=36",
        "ask": "빌립과 내시는 세례를 위해 어디로 내려갔나요?",
        "choices": [
          "산으로",
          "성전으로",
          "물로"
        ],
        "answer": 2,
        "where": "사도행전 8장 38절"
      },
      {
        "d": "금",
        "ref": "에베소서 5장 25~27절",
        "url": "https://www.bskorea.or.kr/bible/korbibReadpage.php?version=GAE&book=eph&chap=5&sec=25",
        "ask": "그리스도는 교회를 무엇으로 깨끗하게 하셨다고 하나요?",
        "choices": [
          "기름으로",
          "향으로",
          "물로 씻어 말씀으로"
        ],
        "answer": 2,
        "where": "에베소서 5장 26절"
      }
    ]
  },
  {
    "n": 28,
    "group": "세례와 성찬",
    "title": "성찬",
    "q": "성찬에서 빵과 포도주를 받는 일은 무엇을 기억하게 하나요?",
    "refs": [
      "고린도전서 11장 23~26절",
      "고린도전서 10장 16~17절"
    ],
    "confess": "성찬은 예수님이 제자들에게 하신 말씀대로, 빵을 떼고 잔을 나누며 주님을 기억하는 식탁이라고 교회는 고백해 왔어요. 눈앞에서 떼어 주는 빵과 잔을 받으면서, 예수님의 몸이 나를 위해 찢기고 피가 나를 위해 흘려졌음을 확신하게 된다고요. 또 같은 빵에 함께하는 우리가 한 몸이라는 것도 기억하게 한다고 해요.",
    "short": "성찬은 나를 위해 내어 주신 예수님을 기억하는 식탁이에요",
    "base": "하이델베르크 28주일(75~77문) · 소요리문답 96문",
    "img": "../note/img/w/weekly-28.webp",
    "alt": "성찬 주의 상징 정물: 빵 한 덩이와 잔",
    "days": [
      {
        "d": "월",
        "ref": "고린도전서 11장 23~26절",
        "url": "https://www.bskorea.or.kr/bible/korbibReadpage.php?version=GAE&book=1co&chap=11&sec=23",
        "ask": "예수님은 떡을 먹을 때 누구를 기념하라고 하셨나요?",
        "choices": [
          "예수님을",
          "모세를",
          "다윗을"
        ],
        "answer": 0,
        "where": "고린도전서 11장 24절"
      },
      {
        "d": "화",
        "ref": "고린도전서 10장 16~17절",
        "url": "https://www.bskorea.or.kr/bible/korbibReadpage.php?version=GAE&book=1co&chap=10&sec=16",
        "ask": "많은 사람이 한 몸인 까닭을 무엇이라고 하나요?",
        "choices": [
          "한 곳에 살아서",
          "한 떡에 참여해서",
          "한 집안이어서"
        ],
        "answer": 1,
        "where": "고린도전서 10장 17절"
      },
      {
        "d": "수",
        "ref": "누가복음 22장 17~20절",
        "url": "https://www.bskorea.or.kr/bible/korbibReadpage.php?version=GAE&book=luk&chap=22&sec=17",
        "ask": "예수님은 떡을 주시며 누구를 위해 주는 몸이라고 하나요?",
        "choices": [
          "천사들을 위해",
          "제사장들을 위해",
          "너희를 위해"
        ],
        "answer": 2,
        "where": "누가복음 22장 19절"
      },
      {
        "d": "목",
        "ref": "마태복음 26장 26~29절",
        "url": "https://www.bskorea.or.kr/bible/korbibReadpage.php?version=GAE&book=mat&chap=26&sec=26",
        "ask": "예수님은 잔에 담긴 것을 무엇이라고 말씀하시나요?",
        "choices": [
          "언약의 피",
          "생명의 물",
          "새로운 포도즙"
        ],
        "answer": 0,
        "where": "마태복음 26장 28절"
      },
      {
        "d": "금",
        "ref": "누가복음 24장 28~31절",
        "url": "https://www.bskorea.or.kr/bible/korbibReadpage.php?version=GAE&book=luk&chap=24&sec=28",
        "ask": "예수님이 떡을 떼어 주실 때 제자들에게 어떤 일이 일어났나요?",
        "choices": [
          "눈이 밝아졌어요",
          "귀가 막혔어요",
          "잠이 들었어요"
        ],
        "answer": 0,
        "where": "누가복음 24장 31절"
      }
    ]
  },
  {
    "n": 29,
    "group": "세례와 성찬",
    "title": "빵과 포도주",
    "q": "예수님은 왜 빵과 포도주를 '내 몸', '내 피'라고 하셨을까요?",
    "refs": [
      "마태복음 26장 26~28절",
      "요한복음 6장 35절"
    ],
    "confess": "빵과 포도주가 우리 몸의 생명을 이어 주듯, 예수님이 내어 주신 몸과 피가 우리 영혼을 영원한 생명으로 먹이고 새롭게 하신다고 교회는 고백해 왔어요. 예수님이 빵과 잔을 그렇게 부르신 것은 이 약속을 눈에 보이는 표와 보증으로 주시기 위해서라고요. 이 약속을 받는 사람에게는 예수님의 고난과 순종이 마치 내가 직접 이룬 것처럼 내 것이 된다고 해요.",
    "short": "빵과 포도주는 예수님이 영혼을 먹이신다는 약속이에요",
    "base": "하이델베르크 29주일(78~79문) · 소요리문답 96문",
    "img": "../note/img/w/weekly-29.webp",
    "alt": "빵과 포도주 주의 상징 정물: 쪼갠 빵, 포도송이, 밀 이삭",
    "days": [
      {
        "d": "월",
        "ref": "마태복음 26장 26~28절",
        "url": "https://www.bskorea.or.kr/bible/korbibReadpage.php?version=GAE&book=mat&chap=26&sec=26",
        "ask": "예수님은 떡을 떼어 주시며 무엇이라고 하셨나요?",
        "choices": [
          "내 집이다",
          "내 길이다",
          "내 몸이다"
        ],
        "answer": 2,
        "where": "마태복음 26장 26절"
      },
      {
        "d": "화",
        "ref": "요한복음 6장 34~36절",
        "url": "https://www.bskorea.or.kr/bible/korbibReadpage.php?version=GAE&book=jhn&chap=6&sec=34",
        "ask": "예수님은 자신을 어떤 떡이라고 말씀하시나요?",
        "choices": [
          "생명의 떡",
          "광야의 떡",
          "작은 떡"
        ],
        "answer": 0,
        "where": "요한복음 6장 35절"
      },
      {
        "d": "수",
        "ref": "마가복음 14장 22~25절",
        "url": "https://www.bskorea.or.kr/bible/korbibReadpage.php?version=GAE&book=mrk&chap=14&sec=22",
        "ask": "예수님은 잔을 주신 뒤 무엇이라고 말씀하시나요?",
        "choices": [
          "내 기쁨이다",
          "언약의 피다",
          "나의 왕관이다"
        ],
        "answer": 1,
        "where": "마가복음 14장 24절"
      },
      {
        "d": "목",
        "ref": "요한복음 6장 53~56절",
        "url": "https://www.bskorea.or.kr/bible/korbibReadpage.php?version=GAE&book=jhn&chap=6&sec=53",
        "ask": "예수님은 자신의 살을 무엇이라고 말씀하시나요?",
        "choices": [
          "참된 양식",
          "잠깐의 양식",
          "감춰진 양식"
        ],
        "answer": 0,
        "where": "요한복음 6장 55절"
      },
      {
        "d": "금",
        "ref": "요한복음 6장 47~51절",
        "url": "https://www.bskorea.or.kr/bible/korbibReadpage.php?version=GAE&book=jhn&chap=6&sec=47",
        "ask": "예수님은 자신이 줄 떡을 무엇이라고 말씀하시나요?",
        "choices": [
          "나의 살",
          "나의 지팡이",
          "나의 집"
        ],
        "answer": 0,
        "where": "요한복음 6장 51절"
      }
    ]
  },
  {
    "n": 30,
    "group": "세례와 성찬",
    "title": "성찬의 초대",
    "q": "성찬의 식탁 앞에 설 때 어떤 마음으로 나아가면 될까요?",
    "refs": [
      "히브리서 10장 10절",
      "고린도전서 11장 28절"
    ],
    "confess": "예수님이 단 한 번 자기 몸을 드려 우리 죄의 값을 모두 치르셨다는 것이 성찬의 바탕이라고 교회는 고백해 왔어요. 성찬은 그 이루신 일을 기억하고 감사하며 받는 식탁이에요. 자기 죄가 마음에 걸리면서도 예수님 때문에 용서받았다고 믿고, 더 새롭게 살고 싶어 하는 사람이 이 식탁에 초대받는다고 해요.",
    "short": "성찬은 예수님이 이루신 일을 받는 식탁이에요",
    "base": "하이델베르크 30주일(80~82문) · 소요리문답 97문",
    "img": "../note/img/w/weekly-30.webp",
    "alt": "성찬의 초대 주의 상징 정물: 차려진 식탁, 당겨 놓은 빈 의자",
    "days": [
      {
        "d": "월",
        "ref": "히브리서 10장 8~10절",
        "url": "https://www.bskorea.or.kr/bible/korbibReadpage.php?version=GAE&book=heb&chap=10&sec=8",
        "ask": "우리는 예수님의 몸을 몇 번 드리심으로 거룩함을 얻었나요?",
        "choices": [
          "여러 번",
          "단번에",
          "두 번"
        ],
        "answer": 1,
        "where": "히브리서 10장 10절"
      },
      {
        "d": "화",
        "ref": "고린도전서 11장 27~29절",
        "url": "https://www.bskorea.or.kr/bible/korbibReadpage.php?version=GAE&book=1co&chap=11&sec=27",
        "ask": "바울은 떡을 먹고 잔을 마시기 전에 무엇을 하라고 하나요?",
        "choices": [
          "다른 사람을 판단하라고",
          "음식을 많이 먹으라고",
          "자기를 살피라고"
        ],
        "answer": 2,
        "where": "고린도전서 11장 28절"
      },
      {
        "d": "수",
        "ref": "히브리서 10장 11~14절",
        "url": "https://www.bskorea.or.kr/bible/korbibReadpage.php?version=GAE&book=heb&chap=10&sec=11",
        "ask": "예수님은 제사를 드리신 뒤 어디에 앉으셨나요?",
        "choices": [
          "하나님 오른편에",
          "성전 안에",
          "광야 가운데"
        ],
        "answer": 0,
        "where": "히브리서 10장 12절"
      },
      {
        "d": "목",
        "ref": "히브리서 9장 24~26절",
        "url": "https://www.bskorea.or.kr/bible/korbibReadpage.php?version=GAE&book=heb&chap=9&sec=24",
        "ask": "그리스도는 자신을 제물로 드려 무엇을 없애려고 하셨나요?",
        "choices": [
          "고난을",
          "죄를",
          "모든 슬픔을"
        ],
        "answer": 1,
        "where": "히브리서 9장 26절"
      },
      {
        "d": "금",
        "ref": "누가복음 22장 14~16절",
        "url": "https://www.bskorea.or.kr/bible/korbibReadpage.php?version=GAE&book=luk&chap=22&sec=14",
        "ask": "예수님은 고난받기 전에 제자들과 무엇을 먹기 원하셨나요?",
        "choices": [
          "아침 식사를",
          "광야의 만나를",
          "유월절 음식을"
        ],
        "answer": 2,
        "where": "누가복음 22장 15절"
      }
    ]
  },
  {
    "n": 31,
    "group": "천국 열쇠",
    "title": "천국 열쇠",
    "q": "교회가 '하늘의 문을 연다'고 말해 온 것은 무슨 뜻일까요?",
    "refs": [
      "마태복음 16장 19절",
      "요한복음 20장 22~23절"
    ],
    "confess": "천국 열쇠는 하늘의 문을 여는 교회의 일을 가리킨다고 교회는 고백해 왔어요. 하나는 복음을 알리는 일이에요. 복음을 믿는 모든 사람에게 예수님 때문에 죄가 용서된다고 분명하게 선포해요. 또 하나는 교회가 서로를 살피고 바른 길로 이끌어 주는 일이라고 해요.",
    "short": "복음을 알릴 때 하늘의 문이 열려요",
    "base": "하이델베르크 31주일(83~85문)",
    "img": "../note/img/w/weekly-31.webp",
    "alt": "천국 열쇠 주의 상징 정물: 오래된 열쇠 두 개",
    "days": [
      {
        "d": "월",
        "ref": "마태복음 16장 18~20절",
        "url": "https://www.bskorea.or.kr/bible/korbibReadpage.php?version=GAE&book=mat&chap=16&sec=18",
        "ask": "예수님은 베드로에게 무엇을 주시겠다고 하나요?",
        "choices": [
          "천국 열쇠",
          "성전 열쇠",
          "왕궁 열쇠"
        ],
        "answer": 0,
        "where": "마태복음 16장 19절"
      },
      {
        "d": "화",
        "ref": "요한복음 20장 21~23절",
        "url": "https://www.bskorea.or.kr/bible/korbibReadpage.php?version=GAE&book=jhn&chap=20&sec=21",
        "ask": "예수님은 제자들에게 숨을 내쉬며 누구를 받으라고 하시나요?",
        "choices": [
          "새 왕을",
          "성령을",
          "천사를"
        ],
        "answer": 1,
        "where": "요한복음 20장 22절"
      },
      {
        "d": "수",
        "ref": "마태복음 18장 15~17절",
        "url": "https://www.bskorea.or.kr/bible/korbibReadpage.php?version=GAE&book=mat&chap=18&sec=15",
        "ask": "형제가 말을 듣지 않으면 마지막에는 어디에 말하라고 하나요?",
        "choices": [
          "시장에",
          "왕에게",
          "교회에"
        ],
        "answer": 2,
        "where": "마태복음 18장 17절"
      },
      {
        "d": "목",
        "ref": "로마서 10장 13~17절",
        "url": "https://www.bskorea.or.kr/bible/korbibReadpage.php?version=GAE&book=rom&chap=10&sec=13",
        "ask": "믿음을 가지려면 먼저 무엇을 들어야 한다고 하나요?",
        "choices": [
          "그리스도의 말씀",
          "사람의 칭찬",
          "왕의 명령"
        ],
        "answer": 0,
        "where": "로마서 10장 17절"
      },
      {
        "d": "금",
        "ref": "고린도후서 2장 5~8절",
        "url": "https://www.bskorea.or.kr/bible/korbibReadpage.php?version=GAE&book=2co&chap=2&sec=5",
        "ask": "바울은 그 사람에게 무엇을 나타내라고 하나요?",
        "choices": [
          "사랑을",
          "두려움을",
          "권세를"
        ],
        "answer": 0,
        "where": "고린도후서 2장 8절"
      }
    ]
  },
  {
    "n": 32,
    "group": "감사: 새 삶",
    "title": "감사하는 삶",
    "q": "은혜로 구원받았다면 나는 왜 선하게 살려고 하게 되나요?",
    "refs": [
      "로마서 12장 1~2절",
      "마태복음 5장 16절"
    ],
    "confess": "예수님이 우리를 피로 사시고 성령님으로 새롭게 하셨으니, 선하게 사는 삶은 구원을 얻으려는 값이 아니라 감사의 모습이라고 교회는 고백해 왔어요. 그 삶 속에서 우리는 하나님이 주신 은혜를 확인하고, 하나님은 우리를 통해 찬양받으신다고요. 우리의 삶을 보고 이웃이 예수님께 이끌릴 수도 있다고 해요.",
    "short": "선하게 사는 삶은 구원의 값이 아니라 감사예요",
    "base": "하이델베르크 32주일(86~87문) · 소요리문답 35문",
    "img": "../note/img/w/weekly-32.webp",
    "alt": "감사하는 삶 주의 상징 정물: 등경 위에 올린 등불",
    "days": [
      {
        "d": "월",
        "ref": "로마서 12장 1~2절",
        "url": "https://www.bskorea.or.kr/bible/korbibReadpage.php?version=GAE&book=rom&chap=12&sec=1",
        "ask": "바울은 우리 몸을 하나님께 어떤 제물로 드리라고 하나요?",
        "choices": [
          "흠 없는 짐승으로",
          "높은 사람으로",
          "산 제물로"
        ],
        "answer": 2,
        "where": "로마서 12장 1절"
      },
      {
        "d": "화",
        "ref": "마태복음 5장 14~16절",
        "url": "https://www.bskorea.or.kr/bible/korbibReadpage.php?version=GAE&book=mat&chap=5&sec=14",
        "ask": "사람들이 우리의 착한 행실을 보고 누구께 영광을 돌리게 하나요?",
        "choices": [
          "하늘 아버지께",
          "우리 자신에게",
          "세상의 왕에게"
        ],
        "answer": 0,
        "where": "마태복음 5장 16절"
      },
      {
        "d": "수",
        "ref": "골로새서 3장 16~17절",
        "url": "https://www.bskorea.or.kr/bible/korbibReadpage.php?version=GAE&book=col&chap=3&sec=16",
        "ask": "바울은 모든 일을 누구의 이름으로 하라고 하나요?",
        "choices": [
          "모세의 이름으로",
          "주 예수의 이름으로",
          "자기 이름으로"
        ],
        "answer": 1,
        "where": "골로새서 3장 17절"
      },
      {
        "d": "목",
        "ref": "요한복음 15장 5~8절",
        "url": "https://www.bskorea.or.kr/bible/korbibReadpage.php?version=GAE&book=jhn&chap=15&sec=5",
        "ask": "예수님은 제자들이 어떤 열매를 맺을 때 아버지가 영광을 받으신다고 하나요?",
        "choices": [
          "작은 열매를",
          "늦은 열매를",
          "많은 열매를"
        ],
        "answer": 2,
        "where": "요한복음 15장 8절"
      },
      {
        "d": "금",
        "ref": "베드로전서 2장 11~12절",
        "url": "https://www.bskorea.or.kr/bible/korbibReadpage.php?version=GAE&book=1pe&chap=2&sec=11",
        "ask": "사람들이 우리의 선한 일을 보고 누구께 영광을 돌린다고 하나요?",
        "choices": [
          "하나님께",
          "사람에게",
          "지도자에게"
        ],
        "answer": 0,
        "where": "베드로전서 2장 12절"
      }
    ]
  },
  {
    "n": 33,
    "group": "감사: 새 삶",
    "title": "회개와 새사람",
    "q": "죄를 돌이키는 일과 새사람으로 사는 일은 어떤 모습인가요?",
    "refs": [
      "고린도후서 7장 10절",
      "에베소서 4장 22~24절"
    ],
    "confess": "참된 회개는 옛 모습이 죽고 새 모습이 사는 일이라고 교회는 고백해 왔어요. 옛 모습이 죽는다는 것은 내 죄를 슬퍼하고 미워하며 멀리하게 된다는 뜻이에요. 새 모습이 산다는 것은 예수님 안에서 하나님을 기뻐하고 그분의 뜻대로 사는 것을 즐거워하게 된다는 뜻이고요. 그렇게 하나님의 뜻에 맞게 하나님의 영광을 위해 하는 일을 선한 일이라고 불러 왔어요.",
    "short": "참된 회개는 옛 모습이 죽고 새 모습이 사는 일이에요",
    "base": "하이델베르크 33주일(88~91문) · 소요리문답 87문",
    "img": "../note/img/w/weekly-33.webp",
    "alt": "회개와 새사람 주의 상징 정물: 벗어 둔 낡은 옷과 새 옷",
    "days": [
      {
        "d": "월",
        "ref": "고린도후서 7장 9~11절",
        "url": "https://www.bskorea.or.kr/bible/korbibReadpage.php?version=GAE&book=2co&chap=7&sec=9",
        "ask": "하나님의 뜻대로 하는 근심은 무엇을 이루나요?",
        "choices": [
          "큰 명예를",
          "회개를",
          "많은 재물을"
        ],
        "answer": 1,
        "where": "고린도후서 7장 10절"
      },
      {
        "d": "화",
        "ref": "에베소서 4장 22~24절",
        "url": "https://www.bskorea.or.kr/bible/korbibReadpage.php?version=GAE&book=eph&chap=4&sec=22",
        "ask": "바울은 무엇을 입으라고 말하나요?",
        "choices": [
          "옛사람을",
          "빛나는 옷을",
          "새사람을"
        ],
        "answer": 2,
        "where": "에베소서 4장 24절"
      },
      {
        "d": "수",
        "ref": "로마서 6장 11~13절",
        "url": "https://www.bskorea.or.kr/bible/korbibReadpage.php?version=GAE&book=rom&chap=6&sec=11",
        "ask": "바울은 우리 자신을 죄에 대해서 어떻게 여기라고 하나요?",
        "choices": [
          "죽은 자로",
          "강한 자로",
          "지혜로운 자로"
        ],
        "answer": 0,
        "where": "로마서 6장 11절"
      },
      {
        "d": "목",
        "ref": "골로새서 3장 8~10절",
        "url": "https://www.bskorea.or.kr/bible/korbibReadpage.php?version=GAE&book=col&chap=3&sec=8",
        "ask": "바울은 낡은 사람을 벗고 무엇을 입었다고 하나요?",
        "choices": [
          "아름다운 옷을",
          "새사람을",
          "제사장의 옷을"
        ],
        "answer": 1,
        "where": "골로새서 3장 10절"
      },
      {
        "d": "금",
        "ref": "시편 51편 10~12절",
        "url": "https://www.bskorea.or.kr/bible/korbibReadpage.php?version=GAE&book=psa&chap=51&sec=10",
        "ask": "시인은 하나님께 무엇을 새롭게 해 달라고 구하나요?",
        "choices": [
          "새 집을",
          "새 친구를",
          "정직한 영을"
        ],
        "answer": 2,
        "where": "시편 51편 10절"
      }
    ]
  },
  {
    "n": 34,
    "group": "열 가지 말씀",
    "title": "하나님만",
    "q": "하나님만 섬긴다는 것은 내 삶에서 어떤 모습으로 나타날까요?",
    "refs": [
      "출애굽기 20장 2~3절",
      "신명기 6장 4~5절",
      "마태복음 6장 24절"
    ],
    "confess": "하나님은 우리를 종살이에서 건져 주신 분으로 먼저 자신을 밝히시고, 그분만을 하나님으로 삼으라고 말씀하셨다고 교회는 고백해 왔어요. 참 하나님을 바르게 알고, 좋은 것은 모두 그분께 기대하며, 온 마음으로 사랑하고 존경하는 것이 이 말씀의 뜻이라고요. 하나님 대신 의지하는 무엇이든 우상이 될 수 있다고 해요.",
    "short": "하나님만 믿고 기대하고 사랑하는 것이 이 말씀의 뜻이에요",
    "base": "하이델베르크 34주일(92~95문) · 소요리문답 42문, 45~46문",
    "img": "../note/img/w/weekly-34.webp",
    "alt": "하나님만 주의 상징 정물: 한쪽으로 밀어 둔 금화 주머니",
    "days": [
      {
        "d": "월",
        "ref": "출애굽기 20장 1~3절",
        "url": "https://www.bskorea.or.kr/bible/korbibReadpage.php?version=GAE&book=exo&chap=20&sec=1",
        "ask": "하나님은 자기 외에 무엇을 두지 말라고 하시나요?",
        "choices": [
          "다른 신을",
          "다른 집을",
          "다른 왕을"
        ],
        "answer": 0,
        "where": "출애굽기 20장 3절"
      },
      {
        "d": "화",
        "ref": "신명기 6장 4~5절",
        "url": "https://www.bskorea.or.kr/bible/korbibReadpage.php?version=GAE&book=deu&chap=6&sec=4",
        "ask": "하나님을 사랑할 때 무엇을 다하라고 말씀하시나요?",
        "choices": [
          "재물과 권세를",
          "마음과 뜻과 힘을",
          "먹을 것과 옷을"
        ],
        "answer": 1,
        "where": "신명기 6장 5절"
      },
      {
        "d": "수",
        "ref": "마태복음 6장 24~26절",
        "url": "https://www.bskorea.or.kr/bible/korbibReadpage.php?version=GAE&book=mat&chap=6&sec=24",
        "ask": "예수님은 하나님과 무엇을 함께 섬길 수 없다고 하나요?",
        "choices": [
          "가족을",
          "이웃을",
          "재물을"
        ],
        "answer": 2,
        "where": "마태복음 6장 24절"
      },
      {
        "d": "목",
        "ref": "여호수아 24장 14~15절",
        "url": "https://www.bskorea.or.kr/bible/korbibReadpage.php?version=GAE&book=jos&chap=24&sec=14",
        "ask": "여호수아는 자기와 자기 집이 누구를 섬기겠다고 하나요?",
        "choices": [
          "여호와를",
          "다른 신들을",
          "애굽의 왕을"
        ],
        "answer": 0,
        "where": "여호수아 24장 15절"
      },
      {
        "d": "금",
        "ref": "시편 115편 4~8절",
        "url": "https://www.bskorea.or.kr/bible/korbibReadpage.php?version=GAE&book=psa&chap=115&sec=4",
        "ask": "시인은 우상이 무엇으로 만들어졌다고 하나요?",
        "choices": [
          "나무와 돌로",
          "은과 금으로",
          "흙과 물로"
        ],
        "answer": 1,
        "where": "시편 115편 4절"
      }
    ]
  },
  {
    "n": 35,
    "group": "열 가지 말씀",
    "title": "하나님의 모습",
    "q": "하나님은 왜 자신의 모습을 만들지 말라고 하셨을까요?",
    "refs": [
      "출애굽기 20장 4~5절",
      "신명기 4장 15~16절",
      "요한복음 4장 24절"
    ],
    "confess": "하나님은 영이시고 우리가 만든 어떤 모습에도 담기지 않는 분이라서, 하나님의 모습을 만들어 섬기지 말라고 하셨다고 교회는 고백해 왔어요. 하나님은 말씀을 통해 자신을 알려 주셨기에, 우리는 그 말씀이 가르치는 대로 하나님께 예배해요. 우리의 생각으로 하나님을 빚는 대신, 하나님이 직접 보여 주신 것을 따르는 일이라고 해요.",
    "short": "하나님은 어떤 모습에도 담기지 않고 말씀으로 알려 주세요",
    "base": "하이델베르크 35주일(96~98문) · 소요리문답 49~50문",
    "img": "../note/img/w/weekly-35.webp",
    "alt": "하나님의 모습 주의 상징 정물: 아무것도 없는 빈 받침대에 드는 빛",
    "days": [
      {
        "d": "월",
        "ref": "출애굽기 20장 4~6절",
        "url": "https://www.bskorea.or.kr/bible/korbibReadpage.php?version=GAE&book=exo&chap=20&sec=4",
        "ask": "하나님은 무엇을 만들지 말라고 말씀하시나요?",
        "choices": [
          "성막을",
          "돌판을",
          "우상을"
        ],
        "answer": 2,
        "where": "출애굽기 20장 4절"
      },
      {
        "d": "화",
        "ref": "신명기 4장 15~18절",
        "url": "https://www.bskorea.or.kr/bible/korbibReadpage.php?version=GAE&book=deu&chap=4&sec=15",
        "ask": "하나님이 말씀하실 때 백성은 무엇을 보지 못했나요?",
        "choices": [
          "어떤 형상도",
          "큰 산도",
          "밝은 불도"
        ],
        "answer": 0,
        "where": "신명기 4장 15절"
      },
      {
        "d": "수",
        "ref": "요한복음 4장 23~24절",
        "url": "https://www.bskorea.or.kr/bible/korbibReadpage.php?version=GAE&book=jhn&chap=4&sec=23",
        "ask": "예수님은 하나님이 어떤 분이라고 말씀하시나요?",
        "choices": [
          "사람이시라고",
          "영이시라고",
          "천사시라고"
        ],
        "answer": 1,
        "where": "요한복음 4장 24절"
      },
      {
        "d": "목",
        "ref": "이사야 40장 18~20절",
        "url": "https://www.bskorea.or.kr/bible/korbibReadpage.php?version=GAE&book=isa&chap=40&sec=18",
        "ask": "이사야는 하나님을 무엇과 같다고 여기겠느냐고 묻나요?",
        "choices": [
          "바람과",
          "구름과",
          "어떤 형상과"
        ],
        "answer": 2,
        "where": "이사야 40장 18절"
      },
      {
        "d": "금",
        "ref": "사도행전 17장 28~30절",
        "url": "https://www.bskorea.or.kr/bible/korbibReadpage.php?version=GAE&book=act&chap=17&sec=28",
        "ask": "바울은 신을 무엇과 같다고 여겨서는 안 된다고 하나요?",
        "choices": [
          "금이나 은이나 돌",
          "물이나 바람",
          "산이나 바다"
        ],
        "answer": 0,
        "where": "사도행전 17장 29절"
      }
    ]
  },
  {
    "n": 36,
    "group": "열 가지 말씀",
    "title": "하나님의 이름",
    "q": "하나님의 이름을 함부로 부르지 말라는 말씀은 무슨 뜻일까요?",
    "refs": [
      "출애굽기 20장 7절",
      "시편 29편 2절"
    ],
    "confess": "하나님의 이름은 하나님 자신을 가리키는 거룩한 이름이라서, 저주하거나 거짓을 보증하거나 가볍게 입에 올려서는 안 된다고 교회는 고백해 왔어요. 반대로 하나님의 이름은 높이고 존경하는 마음으로 불러야 하고, 우리의 말과 삶으로 하나님이 높임받으시게 하는 것이 이 말씀의 뜻이라고요. 이름을 부른다는 것은 하나님 앞에 서는 일이어서 가볍지 않다고 해요.",
    "short": "하나님의 이름은 거룩하게 불러야 하는 이름이에요",
    "base": "하이델베르크 36주일(99~100문) · 소요리문답 53~54문",
    "img": "../note/img/w/weekly-36.webp",
    "alt": "하나님의 이름 주의 상징 정물: 작은 향로에서 피어오르는 향",
    "days": [
      {
        "d": "월",
        "ref": "출애굽기 20장 7절",
        "url": "https://www.bskorea.or.kr/bible/korbibReadpage.php?version=GAE&book=exo&chap=20&sec=7",
        "ask": "하나님은 자신의 이름을 어떻게 부르지 말라고 하시나요?",
        "choices": [
          "소리 높여",
          "망령되게",
          "노래하며"
        ],
        "answer": 1,
        "where": "출애굽기 20장 7절"
      },
      {
        "d": "화",
        "ref": "시편 29편 1~3절",
        "url": "https://www.bskorea.or.kr/bible/korbibReadpage.php?version=GAE&book=psa&chap=29&sec=1",
        "ask": "시인은 여호와의 이름에 합당한 무엇을 돌리라고 하나요?",
        "choices": [
          "재물을",
          "권세를",
          "영광을"
        ],
        "answer": 2,
        "where": "시편 29편 2절"
      },
      {
        "d": "수",
        "ref": "레위기 19장 11~13절",
        "url": "https://www.bskorea.or.kr/bible/korbibReadpage.php?version=GAE&book=lev&chap=19&sec=11",
        "ask": "하나님은 자신의 이름으로 어떻게 맹세하지 말라고 하나요?",
        "choices": [
          "거짓으로",
          "조용히",
          "공개적으로"
        ],
        "answer": 0,
        "where": "레위기 19장 12절"
      },
      {
        "d": "목",
        "ref": "마태복음 6장 9~10절",
        "url": "https://www.bskorea.or.kr/bible/korbibReadpage.php?version=GAE&book=mat&chap=6&sec=9",
        "ask": "예수님은 아버지의 이름이 어떻게 여겨지기를 구하라고 하시나요?",
        "choices": [
          "가볍게",
          "거룩하게",
          "잊히게"
        ],
        "answer": 1,
        "where": "마태복음 6장 9절"
      },
      {
        "d": "금",
        "ref": "시편 113편 1~3절",
        "url": "https://www.bskorea.or.kr/bible/korbibReadpage.php?version=GAE&book=psa&chap=113&sec=1",
        "ask": "시인은 여호와의 이름이 언제부터 언제까지 찬양받는다고 하나요?",
        "choices": [
          "아침부터 낮까지",
          "봄부터 겨울까지",
          "해 뜰 때부터 질 때까지"
        ],
        "answer": 2,
        "where": "시편 113편 3절"
      }
    ]
  },
  {
    "n": 37,
    "group": "열 가지 말씀",
    "title": "약속과 말",
    "q": "내가 한 약속과 말을 하나님은 어떻게 보고 계실까요?",
    "refs": [
      "마태복음 5장 33~37절",
      "시편 15편 4절"
    ],
    "confess": "하나님은 참되신 분이어서 사람의 말과 약속에도 진실을 기대하신다고 교회는 고백해 왔어요. 하나님의 이름을 걸고 하는 증언과 약속은 그만큼 무거워서, 거짓이 섞이면 하나님 앞에서 가볍지 않다고요. 그래서 말을 할 때는 하나님이 지켜보고 계신다는 마음으로 참된 말을 한다고 해요.",
    "short": "하나님은 내 말과 약속의 진실함을 보세요",
    "base": "하이델베르크 37주일(101~102문) · 소요리문답 54~55문",
    "img": "../note/img/w/weekly-37.webp",
    "alt": "약속과 말 주의 상징 정물: 벽에 곧게 드리운 다림줄",
    "days": [
      {
        "d": "월",
        "ref": "마태복음 5장 33~37절",
        "url": "https://www.bskorea.or.kr/bible/korbibReadpage.php?version=GAE&book=mat&chap=5&sec=33",
        "ask": "예수님은 하늘로나 땅으로 무엇을 하지 말라고 하나요?",
        "choices": [
          "맹세하지 말라고",
          "기도하지 말라고",
          "찬양하지 말라고"
        ],
        "answer": 0,
        "where": "마태복음 5장 34절"
      },
      {
        "d": "화",
        "ref": "시편 15편 1~5절",
        "url": "https://www.bskorea.or.kr/bible/korbibReadpage.php?version=GAE&book=psa&chap=15&sec=1",
        "ask": "시인은 해가 되더라도 무엇을 바꾸지 않는다고 하나요?",
        "choices": [
          "입은 옷을",
          "서원한 것을",
          "사는 곳을"
        ],
        "answer": 1,
        "where": "시편 15편 4절"
      },
      {
        "d": "수",
        "ref": "야고보서 5장 12~13절",
        "url": "https://www.bskorea.or.kr/bible/korbibReadpage.php?version=GAE&book=jas&chap=5&sec=12",
        "ask": "야고보는 정죄를 면하려면 말을 어떻게 하라고 하나요?",
        "choices": [
          "길게 하라고",
          "숨겨서 하라고",
          "그렇다 아니다를 분명히 하라고"
        ],
        "answer": 2,
        "where": "야고보서 5장 12절"
      },
      {
        "d": "목",
        "ref": "잠언 12장 17~19절",
        "url": "https://www.bskorea.or.kr/bible/korbibReadpage.php?version=GAE&book=pro&chap=12&sec=17",
        "ask": "잠언은 진실을 말하는 자가 무엇을 나타낸다고 하나요?",
        "choices": [
          "의를",
          "재물을",
          "명예를"
        ],
        "answer": 0,
        "where": "잠언 12장 17절"
      },
      {
        "d": "금",
        "ref": "잠언 12장 21~23절",
        "url": "https://www.bskorea.or.kr/bible/korbibReadpage.php?version=GAE&book=pro&chap=12&sec=21",
        "ask": "여호와께서 기뻐하시는 사람은 누구인가요?",
        "choices": [
          "거짓을 행하는 사람",
          "진실하게 행하는 사람",
          "재물을 자랑하는 사람"
        ],
        "answer": 1,
        "where": "잠언 12장 22절"
      }
    ]
  },
  {
    "n": 38,
    "group": "열 가지 말씀",
    "title": "쉼의 날",
    "q": "하나님은 왜 일을 멈추고 쉬는 날을 정해 주셨을까요?",
    "refs": [
      "출애굽기 20장 8~11절",
      "히브리서 10장 24~25절"
    ],
    "confess": "하나님은 우리가 쉬면서 하나님께 마음을 돌리도록 쉼의 날을 선물로 주셨다고 교회는 고백해 왔어요. 이 쉼의 날에 교회는 함께 모여 하나님의 말씀을 듣고, 하나님께 기도하며 예배하고, 어려운 이웃을 위해 나누어 왔어요. 이 쉼은 하나님과 함께 누릴 영원한 안식을 이 땅에서 미리 맛보는 일이기도 하다고 해요.",
    "short": "쉼의 날에는 함께 모여 말씀을 듣고 예배해요",
    "base": "하이델베르크 38주일(103문) · 소요리문답 57~58문",
    "img": "../note/img/w/weekly-38.webp",
    "alt": "쉼의 날 주의 상징 정물: 내려놓은 망치, 접힌 앞치마, 창밖 고요한 들",
    "days": [
      {
        "d": "월",
        "ref": "출애굽기 20장 8~11절",
        "url": "https://www.bskorea.or.kr/bible/korbibReadpage.php?version=GAE&book=exo&chap=20&sec=8",
        "ask": "하나님은 무엇을 기억하여 거룩히 지키라고 하시나요?",
        "choices": [
          "수확의 날을",
          "새해 첫날을",
          "안식일을"
        ],
        "answer": 2,
        "where": "출애굽기 20장 8절"
      },
      {
        "d": "화",
        "ref": "히브리서 10장 23~25절",
        "url": "https://www.bskorea.or.kr/bible/korbibReadpage.php?version=GAE&book=heb&chap=10&sec=23",
        "ask": "히브리서는 무엇을 폐하는 습관을 따르지 말라고 하나요?",
        "choices": [
          "모이기를",
          "일하기를",
          "여행하기를"
        ],
        "answer": 0,
        "where": "히브리서 10장 25절"
      },
      {
        "d": "수",
        "ref": "마가복음 2장 25~28절",
        "url": "https://www.bskorea.or.kr/bible/korbibReadpage.php?version=GAE&book=mrk&chap=2&sec=25",
        "ask": "예수님은 안식일이 누구를 위해 만들어졌다고 하나요?",
        "choices": [
          "천사를 위해",
          "사람을 위해",
          "제사장만을 위해"
        ],
        "answer": 1,
        "where": "마가복음 2장 27절"
      },
      {
        "d": "목",
        "ref": "사도행전 2장 42~44절",
        "url": "https://www.bskorea.or.kr/bible/korbibReadpage.php?version=GAE&book=act&chap=2&sec=42",
        "ask": "믿는 사람들은 무엇에 힘썼다고 하나요?",
        "choices": [
          "장사에",
          "경쟁에",
          "사도의 가르침에"
        ],
        "answer": 2,
        "where": "사도행전 2장 42절"
      },
      {
        "d": "금",
        "ref": "히브리서 4장 8~11절",
        "url": "https://www.bskorea.or.kr/bible/korbibReadpage.php?version=GAE&book=heb&chap=4&sec=8",
        "ask": "히브리서는 하나님의 백성에게 무엇이 남아 있다고 하나요?",
        "choices": [
          "안식할 때",
          "많은 재물",
          "새 성전"
        ],
        "answer": 0,
        "where": "히브리서 4장 9절"
      }
    ]
  },
  {
    "n": 39,
    "group": "열 가지 말씀",
    "title": "부모 공경",
    "q": "부모님을 공경하라는 말씀은 오늘 나에게 무엇을 뜻할까요?",
    "refs": [
      "출애굽기 20장 12절",
      "에베소서 6장 1~3절",
      "잠언 23장 22절"
    ],
    "confess": "하나님이 부모를 통해 우리에게 생명과 돌봄을 주셨기에, 부모를 존중하고 사랑하며 신실하게 대하는 일을 하나님이 기뻐하신다고 교회는 고백해 왔어요. 이 말씀은 부모뿐 아니라 우리를 가르치고 이끄는 자리에 있는 이들에게도 이어진다고요. 사람은 누구나 부족하지만, 하나님이 그런 사람들의 손을 통해서도 우리를 돌보고 이끄신다고 해요.",
    "short": "부모님을 존중하고 사랑하는 일을 하나님이 기뻐하세요",
    "base": "하이델베르크 39주일(104문) · 소요리문답 63~64문",
    "img": "../note/img/w/weekly-39.webp",
    "alt": "부모 공경 주의 상징 정물: 노인의 지팡이와 숄 곁의 아이 신발",
    "days": [
      {
        "d": "월",
        "ref": "출애굽기 20장 12절",
        "url": "https://www.bskorea.or.kr/bible/korbibReadpage.php?version=GAE&book=exo&chap=20&sec=12",
        "ask": "하나님은 누구를 공경하라고 말씀하시나요?",
        "choices": [
          "왕과 제사장을",
          "부모를",
          "선지자를"
        ],
        "answer": 1,
        "where": "출애굽기 20장 12절"
      },
      {
        "d": "화",
        "ref": "에베소서 6장 1~3절",
        "url": "https://www.bskorea.or.kr/bible/korbibReadpage.php?version=GAE&book=eph&chap=6&sec=1",
        "ask": "바울은 자녀에게 부모에게 어떻게 하라고 하나요?",
        "choices": [
          "경쟁하라고",
          "피하라고",
          "순종하라고"
        ],
        "answer": 2,
        "where": "에베소서 6장 1절"
      },
      {
        "d": "수",
        "ref": "잠언 23장 22~24절",
        "url": "https://www.bskorea.or.kr/bible/korbibReadpage.php?version=GAE&book=pro&chap=23&sec=22",
        "ask": "잠언은 늙은 어머니를 어떻게 하지 말라고 하나요?",
        "choices": [
          "경히 여기지 말라고",
          "찾아가지 말라고",
          "가르치지 말라고"
        ],
        "answer": 0,
        "where": "잠언 23장 22절"
      },
      {
        "d": "목",
        "ref": "골로새서 3장 18~21절",
        "url": "https://www.bskorea.or.kr/bible/korbibReadpage.php?version=GAE&book=col&chap=3&sec=18",
        "ask": "바울은 자녀들에게 누구에게 순종하라고 하나요?",
        "choices": [
          "이웃에게",
          "부모에게",
          "친구에게"
        ],
        "answer": 1,
        "where": "골로새서 3장 20절"
      },
      {
        "d": "금",
        "ref": "잠언 1장 7~9절",
        "url": "https://www.bskorea.or.kr/bible/korbibReadpage.php?version=GAE&book=pro&chap=1&sec=7",
        "ask": "잠언은 아버지의 무엇을 들으라고 말하나요?",
        "choices": [
          "재산을",
          "소문을",
          "훈계를"
        ],
        "answer": 2,
        "where": "잠언 1장 8절"
      }
    ]
  },
  {
    "n": 40,
    "group": "열 가지 말씀",
    "title": "미움",
    "q": "죽이지 말라는 말씀은 내 마음속 미움에도 닿는 말씀일까요?",
    "refs": [
      "출애굽기 20장 13절",
      "마태복음 5장 21~22절"
    ],
    "confess": "하나님은 사람의 생명을 귀하게 여기셔서, 사람을 해치는 행동뿐 아니라 마음의 분노와 미움까지 이 말씀에 닿는다고 교회는 고백해 왔어요. 그래서 이웃을 해치지 않는 데서 그치지 않고, 이웃을 사랑하고 참아 주고 평화를 이루며 자비를 베푸는 데까지 이 말씀이 이어진다고요. 내 안의 미움을 마주할 때 우리는 다시 하나님의 용서가 필요한 사람임을 알게 된다고 해요.",
    "short": "하나님은 사람의 생명과 마음의 미움까지 보세요",
    "base": "하이델베르크 40주일(105~107문) · 소요리문답 67~69문",
    "img": "../note/img/w/weekly-40.webp",
    "alt": "미움 주의 상징 정물: 칼을 두드려 만든 보습",
    "days": [
      {
        "d": "월",
        "ref": "출애굽기 20장 13절",
        "url": "https://www.bskorea.or.kr/bible/korbibReadpage.php?version=GAE&book=exo&chap=20&sec=13",
        "ask": "하나님은 사람에게 무엇을 하지 말라고 하시나요?",
        "choices": [
          "도둑질",
          "살인",
          "거짓 증언"
        ],
        "answer": 1,
        "where": "출애굽기 20장 13절"
      },
      {
        "d": "화",
        "ref": "마태복음 5장 21~22절",
        "url": "https://www.bskorea.or.kr/bible/korbibReadpage.php?version=GAE&book=mat&chap=5&sec=21",
        "ask": "예수님은 형제에게 무엇을 품는 일을 경고하시나요?",
        "choices": [
          "노여움",
          "반가움",
          "고마움"
        ],
        "answer": 0,
        "where": "마태복음 5장 22절"
      },
      {
        "d": "수",
        "ref": "요한일서 3장 14~16절",
        "url": "https://www.bskorea.or.kr/bible/korbibReadpage.php?version=GAE&book=1jn&chap=3&sec=14",
        "ask": "요한은 형제를 미워하는 사람을 무엇이라고 하나요?",
        "choices": [
          "가난한 사람",
          "나그네",
          "살인하는 사람"
        ],
        "answer": 2,
        "where": "요한일서 3장 15절"
      },
      {
        "d": "목",
        "ref": "로마서 12장 17~19절",
        "url": "https://www.bskorea.or.kr/bible/korbibReadpage.php?version=GAE&book=rom&chap=12&sec=17",
        "ask": "바울은 아무에게도 무엇으로 갚지 말라고 하나요?",
        "choices": [
          "선으로",
          "악으로",
          "말로"
        ],
        "answer": 1,
        "where": "로마서 12장 17절"
      },
      {
        "d": "금",
        "ref": "마태복음 5장 43~45절",
        "url": "https://www.bskorea.or.kr/bible/korbibReadpage.php?version=GAE&book=mat&chap=5&sec=43",
        "ask": "예수님은 원수를 위해 무엇을 하라고 하시나요?",
        "choices": [
          "기도하라고",
          "숨으라고",
          "멀리하라고"
        ],
        "answer": 0,
        "where": "마태복음 5장 44절"
      }
    ]
  },
  {
    "n": 41,
    "group": "열 가지 말씀",
    "title": "순결",
    "q": "몸과 마음을 순결하게 지키라는 말씀은 무엇을 뜻하나요?",
    "refs": [
      "출애굽기 20장 14절",
      "마태복음 5장 27~28절",
      "데살로니가전서 4장 3~5절"
    ],
    "confess": "하나님은 몸과 마음을 소중히 지으셔서, 결혼한 사람이든 혼자 사는 사람이든 생각과 말과 행동에서 순결하고 절제하는 삶을 원하신다고 교회는 고백해 왔어요. 이 말씀은 행동만이 아니라 마음에 품는 욕심에도 닿는다고요. 하나님은 결혼과 가정을 귀한 선물로 보시고, 그 약속과 신뢰를 지켜 주려고 이 말씀을 주셨다고 해요.",
    "short": "몸과 마음의 순결은 사랑과 신뢰를 지켜 줘요",
    "base": "하이델베르크 41주일(108~109문) · 소요리문답 70~72문",
    "img": "../note/img/w/weekly-41.webp",
    "alt": "순결 주의 상징 정물: 흰 백합과 맑은 물 한 잔",
    "days": [
      {
        "d": "월",
        "ref": "출애굽기 20장 14절",
        "url": "https://www.bskorea.or.kr/bible/korbibReadpage.php?version=GAE&book=exo&chap=20&sec=14",
        "ask": "하나님은 무엇을 하지 말라고 말씀하시나요?",
        "choices": [
          "살인",
          "도둑질",
          "간음"
        ],
        "answer": 2,
        "where": "출애굽기 20장 14절"
      },
      {
        "d": "화",
        "ref": "마태복음 5장 27~28절",
        "url": "https://www.bskorea.or.kr/bible/korbibReadpage.php?version=GAE&book=mat&chap=5&sec=27",
        "ask": "예수님은 음욕을 품고 보는 사람이 이미 어디에서 간음했다고 하나요?",
        "choices": [
          "마음에서",
          "입술에서",
          "손에서"
        ],
        "answer": 0,
        "where": "마태복음 5장 28절"
      },
      {
        "d": "수",
        "ref": "데살로니가전서 4장 3~5절",
        "url": "https://www.bskorea.or.kr/bible/korbibReadpage.php?version=GAE&book=1th&chap=4&sec=3",
        "ask": "바울은 무엇을 멀리하라고 하나요?",
        "choices": [
          "슬픔",
          "음란",
          "수고"
        ],
        "answer": 1,
        "where": "데살로니가전서 4장 3절"
      },
      {
        "d": "목",
        "ref": "고린도전서 6장 13~15절",
        "url": "https://www.bskorea.or.kr/bible/korbibReadpage.php?version=GAE&book=1co&chap=6&sec=13",
        "ask": "바울은 몸이 누구를 위한다고 말하나요?",
        "choices": [
          "사람을 위해",
          "주님을 위해",
          "천사를 위해"
        ],
        "answer": 1,
        "where": "고린도전서 6장 13절"
      },
      {
        "d": "금",
        "ref": "디모데후서 2장 21~22절",
        "url": "https://www.bskorea.or.kr/bible/korbibReadpage.php?version=GAE&book=2ti&chap=2&sec=21",
        "ask": "바울은 청년의 무엇을 피하라고 하나요?",
        "choices": [
          "정욕",
          "근심",
          "수고"
        ],
        "answer": 0,
        "where": "디모데후서 2장 22절"
      }
    ]
  },
  {
    "n": 42,
    "group": "열 가지 말씀",
    "title": "정직과 나눔",
    "q": "도둑질하지 말라는 말씀은 일하고 나누는 삶과 어떻게 이어질까요?",
    "refs": [
      "출애굽기 20장 15절",
      "에베소서 4장 28절"
    ],
    "confess": "하나님은 이웃의 것을 빼앗거나 속여서 얻는 일뿐 아니라 탐욕과 낭비도 기뻐하지 않으신다고 교회는 고백해 왔어요. 이 말씀은 거꾸로 이웃의 유익을 돕고 내 것을 정직하게 쓰며 성실히 일하는 삶으로 이어진다고요. 그렇게 일해서 얻은 것으로 어려운 사람과 나누는 데까지 이르는 것이 이 말씀의 뜻이라고 해요.",
    "short": "정직하게 일하고 어려운 이웃과 나눠요",
    "base": "하이델베르크 42주일(110~111문) · 소요리문답 73~75문",
    "img": "../note/img/w/weekly-42.webp",
    "alt": "정직과 나눔 주의 상징 정물: 일 연장 곁, 둘로 나눈 빵 바구니",
    "days": [
      {
        "d": "월",
        "ref": "출애굽기 20장 15절",
        "url": "https://www.bskorea.or.kr/bible/korbibReadpage.php?version=GAE&book=exo&chap=20&sec=15",
        "ask": "하나님은 무엇을 하지 말라고 하시나요?",
        "choices": [
          "거짓 증언",
          "도둑질",
          "우상 숭배"
        ],
        "answer": 1,
        "where": "출애굽기 20장 15절"
      },
      {
        "d": "화",
        "ref": "에베소서 4장 27~29절",
        "url": "https://www.bskorea.or.kr/bible/korbibReadpage.php?version=GAE&book=eph&chap=4&sec=27",
        "ask": "바울은 일해서 얻은 것으로 누구를 도우라고 하나요?",
        "choices": [
          "부유한 사람",
          "높은 사람",
          "궁핍한 사람"
        ],
        "answer": 2,
        "where": "에베소서 4장 28절"
      },
      {
        "d": "수",
        "ref": "레위기 19장 11~13절",
        "url": "https://www.bskorea.or.kr/bible/korbibReadpage.php?version=GAE&book=lev&chap=19&sec=11",
        "ask": "하나님은 이웃의 것을 어떻게 하지 말라고 하시나요?",
        "choices": [
          "도둑질하지 말라고",
          "나누지 말라고",
          "돌려주지 말라고"
        ],
        "answer": 0,
        "where": "레위기 19장 11절"
      },
      {
        "d": "목",
        "ref": "잠언 11장 24~26절",
        "url": "https://www.bskorea.or.kr/bible/korbibReadpage.php?version=GAE&book=pro&chap=11&sec=24",
        "ask": "잠언은 곡식을 내놓지 않는 사람에게 무엇이 돌아온다고 하나요?",
        "choices": [
          "칭찬이",
          "저주가",
          "큰 상이"
        ],
        "answer": 1,
        "where": "잠언 11장 26절"
      },
      {
        "d": "금",
        "ref": "사도행전 20장 33~35절",
        "url": "https://www.bskorea.or.kr/bible/korbibReadpage.php?version=GAE&book=act&chap=20&sec=33",
        "ask": "바울은 수고하여 누구를 도와야 한다고 하나요?",
        "choices": [
          "부자를",
          "권력자를",
          "약한 사람을"
        ],
        "answer": 2,
        "where": "사도행전 20장 35절"
      }
    ]
  },
  {
    "n": 43,
    "group": "열 가지 말씀",
    "title": "이웃과 말",
    "q": "이웃에 대해 말하는 나의 입을 하나님은 어떻게 보실까요?",
    "refs": [
      "출애굽기 20장 16절",
      "에베소서 4장 25절"
    ],
    "confess": "하나님은 진실이신 분이라서 거짓 증언과 험담, 이웃의 명예를 해치는 말을 기뻐하지 않으신다고 교회는 고백해 왔어요. 반대로 진실을 말하고, 이웃의 이름과 명예를 지켜 주고, 억울한 사람의 편에 서는 것이 이 말씀의 뜻이라고요. 법정에서든 일상에서든 진실을 사랑하는 것이 하나님의 뜻이라고 해요.",
    "short": "하나님은 진실한 말과 이웃의 명예를 기뻐하세요",
    "base": "하이델베르크 43주일(112문) · 소요리문답 76~78문",
    "img": "../note/img/w/weekly-43.webp",
    "alt": "이웃과 말 주의 상징 정물: 말의 재갈과 고삐",
    "days": [
      {
        "d": "월",
        "ref": "출애굽기 20장 16절",
        "url": "https://www.bskorea.or.kr/bible/korbibReadpage.php?version=GAE&book=exo&chap=20&sec=16",
        "ask": "하나님은 이웃에 대해 무엇을 하지 말라고 하시나요?",
        "choices": [
          "거짓 증언",
          "심한 수고",
          "긴 여행"
        ],
        "answer": 0,
        "where": "출애굽기 20장 16절"
      },
      {
        "d": "화",
        "ref": "에베소서 4장 24~26절",
        "url": "https://www.bskorea.or.kr/bible/korbibReadpage.php?version=GAE&book=eph&chap=4&sec=24",
        "ask": "바울은 거짓을 버리고 이웃과 무엇을 말하라고 하나요?",
        "choices": [
          "칭찬만",
          "참된 것",
          "즐거운 것"
        ],
        "answer": 1,
        "where": "에베소서 4장 25절"
      },
      {
        "d": "수",
        "ref": "잠언 12장 17~19절",
        "url": "https://www.bskorea.or.kr/bible/korbibReadpage.php?version=GAE&book=pro&chap=12&sec=17",
        "ask": "잠언은 진실한 입술이 얼마나 오래 간다고 하나요?",
        "choices": [
          "잠깐 동안",
          "하루 동안",
          "영원히"
        ],
        "answer": 2,
        "where": "잠언 12장 19절"
      },
      {
        "d": "목",
        "ref": "야고보서 4장 10~12절",
        "url": "https://www.bskorea.or.kr/bible/korbibReadpage.php?version=GAE&book=jas&chap=4&sec=10",
        "ask": "야고보는 형제끼리 무엇을 하지 말라고 하나요?",
        "choices": [
          "비방하지 말라고",
          "돕지 말라고",
          "찾지 말라고"
        ],
        "answer": 0,
        "where": "야고보서 4장 11절"
      },
      {
        "d": "금",
        "ref": "스가랴 8장 16~17절",
        "url": "https://www.bskorea.or.kr/bible/korbibReadpage.php?version=GAE&book=zec&chap=8&sec=16",
        "ask": "하나님은 서로에게 어떤 말을 하라고 하시나요?",
        "choices": [
          "칭찬의 말만",
          "진실한 말",
          "긴 이야기"
        ],
        "answer": 1,
        "where": "스가랴 8장 16절"
      }
    ]
  },
  {
    "n": 44,
    "group": "열 가지 말씀",
    "title": "계명과 은혜",
    "q": "우리가 다 지키지 못하는 계명을 하나님은 왜 주셨을까요?",
    "refs": [
      "출애굽기 20장 17절",
      "로마서 3장 20절",
      "로마서 7장 24~25절"
    ],
    "confess": "탐내지 말라는 마지막 말씀은 마음 깊은 욕심까지 닿는다고 교회는 고백해 왔어요. 그 말씀 앞에 서면 믿는 사람도 이 땅에서는 순종의 작은 시작만 가질 뿐 온전히 지키지 못한다고요. 그래도 하나님의 모든 말씀을 따라 살기를 진심으로 시작하는 것이 하나님이 바라시는 걸음이라고요. 하나님이 계명을 엄하게 가르치시는 까닭은, 우리가 죄를 더 깊이 깨닫고 그리스도 안에서 용서와 의로움을 더 간절히 찾게 하시려는 것이라고 해요.",
    "short": "계명은 우리를 그리스도의 용서로 이끌어요",
    "base": "하이델베르크 44주일(113~115문) · 소요리문답 79~82문",
    "img": "../note/img/w/weekly-44.webp",
    "alt": "계명과 은혜 주의 상징 정물: 내려놓은 무거운 짐 보따리",
    "days": [
      {
        "d": "월",
        "ref": "출애굽기 20장 17절",
        "url": "https://www.bskorea.or.kr/bible/korbibReadpage.php?version=GAE&book=exo&chap=20&sec=17",
        "ask": "하나님은 이웃의 무엇을 탐내지 말라고 하시나요?",
        "choices": [
          "나이",
          "이름",
          "집"
        ],
        "answer": 2,
        "where": "출애굽기 20장 17절"
      },
      {
        "d": "화",
        "ref": "로마서 3장 19~21절",
        "url": "https://www.bskorea.or.kr/bible/korbibReadpage.php?version=GAE&book=rom&chap=3&sec=19",
        "ask": "바울은 율법으로 무엇을 깨닫는다고 하나요?",
        "choices": [
          "죄를",
          "재물을",
          "미래를"
        ],
        "answer": 0,
        "where": "로마서 3장 20절"
      },
      {
        "d": "수",
        "ref": "로마서 7장 7~9절",
        "url": "https://www.bskorea.or.kr/bible/korbibReadpage.php?version=GAE&book=rom&chap=7&sec=7",
        "ask": "바울은 무엇을 통해 죄를 알게 되었다고 하나요?",
        "choices": [
          "사람들의 말로",
          "율법으로",
          "자기 경험으로"
        ],
        "answer": 1,
        "where": "로마서 7장 7절"
      },
      {
        "d": "목",
        "ref": "갈라디아서 3장 22~24절",
        "url": "https://www.bskorea.or.kr/bible/korbibReadpage.php?version=GAE&book=gal&chap=3&sec=22",
        "ask": "율법은 우리를 누구께로 인도하는 초등교사라고 하나요?",
        "choices": [
          "모세께",
          "다윗께",
          "그리스도께"
        ],
        "answer": 2,
        "where": "갈라디아서 3장 24절"
      },
      {
        "d": "금",
        "ref": "요한일서 1장 8~10절",
        "url": "https://www.bskorea.or.kr/bible/korbibReadpage.php?version=GAE&book=1jn&chap=1&sec=8",
        "ask": "죄가 없다고 말하면 자신을 어떻게 하는 것인가요?",
        "choices": [
          "속이는 것",
          "구하는 것",
          "지키는 것"
        ],
        "answer": 0,
        "where": "요한일서 1장 8절"
      }
    ]
  },
  {
    "n": 45,
    "group": "기도",
    "title": "기도",
    "q": "왜 기도해야 하나요?",
    "refs": [
      "시편 50편 14~15절",
      "빌립보서 4장 6~7절",
      "마태복음 7장 7~8절"
    ],
    "confess": "기도는 하나님께 드리는 감사 가운데 가장 귀한 것이라고 교회는 고백해 왔어요. 하나님은 마음을 다해 쉬지 않고 구하고 감사하는 사람에게 은혜와 성령을 주신다고요. 그 기도는 내 필요와 부족을 하나님이 말씀으로 가르쳐 주신 대로 솔직히 아뢰고, 예수님 때문에 들어 주신다고 믿는 마음으로 드리는 것이라고 해요.",
    "short": "기도는 하나님께 드리는 가장 귀한 감사예요",
    "base": "하이델베르크 45주일(116~119문) · 소요리문답 98~99문",
    "img": "../note/img/w/weekly-45.webp",
    "alt": "기도 주의 상징 정물: 열린 창 앞 무릎 방석",
    "days": [
      {
        "d": "월",
        "ref": "시편 50편 14~15절",
        "url": "https://www.bskorea.or.kr/bible/korbibReadpage.php?version=GAE&book=psa&chap=50&sec=14",
        "ask": "환난 날에 하나님께 무엇을 하라고 하나요?",
        "choices": [
          "숨으라고",
          "부르라고",
          "떠나라고"
        ],
        "answer": 1,
        "where": "시편 50편 15절"
      },
      {
        "d": "화",
        "ref": "빌립보서 4장 6~7절",
        "url": "https://www.bskorea.or.kr/bible/korbibReadpage.php?version=GAE&book=php&chap=4&sec=6",
        "ask": "염려 대신 모든 일을 무엇으로 아뢰라고 하나요?",
        "choices": [
          "자랑과 침묵으로",
          "수고와 노력으로",
          "기도와 간구로"
        ],
        "answer": 2,
        "where": "빌립보서 4장 6절"
      },
      {
        "d": "수",
        "ref": "마태복음 7장 7~8절",
        "url": "https://www.bskorea.or.kr/bible/korbibReadpage.php?version=GAE&book=mat&chap=7&sec=7",
        "ask": "예수님은 구하는 사람이 어떻게 된다고 하나요?",
        "choices": [
          "받게 된다고",
          "숨겨진다고",
          "잃게 된다고"
        ],
        "answer": 0,
        "where": "마태복음 7장 8절"
      },
      {
        "d": "목",
        "ref": "데살로니가전서 5장 16~18절",
        "url": "https://www.bskorea.or.kr/bible/korbibReadpage.php?version=GAE&book=1th&chap=5&sec=16",
        "ask": "바울은 쉬지 말고 무엇을 하라고 하나요?",
        "choices": [
          "일하라고",
          "기도하라고",
          "달리라고"
        ],
        "answer": 1,
        "where": "데살로니가전서 5장 17절"
      },
      {
        "d": "금",
        "ref": "요한복음 16장 23~24절",
        "url": "https://www.bskorea.or.kr/bible/korbibReadpage.php?version=GAE&book=jhn&chap=16&sec=23",
        "ask": "예수님은 누구의 이름으로 구하라고 하시나요?",
        "choices": [
          "모세의 이름",
          "천사의 이름",
          "예수님의 이름"
        ],
        "answer": 2,
        "where": "요한복음 16장 24절"
      }
    ]
  },
  {
    "n": 46,
    "group": "기도",
    "title": "아버지 부르기",
    "q": "하나님을 '아버지'라 부르며 기도하라고 하신 까닭은 무엇일까요?",
    "refs": [
      "누가복음 11장 1~2절",
      "마태복음 7장 9~11절"
    ],
    "confess": "예수님이 기도를 '아버지'라는 부름으로 시작하게 하신 것은, 우리 마음에 자녀다운 존경과 믿음을 일으키시려는 뜻이라고 교회는 고백해 왔어요. 땅의 아버지가 자식에게 좋은 것을 주듯, 하나님은 예수님 때문에 우리 아버지가 되셨으니 더욱 기꺼이 들어 주신다고요. '하늘에 계신'이라는 말은 모든 것을 하실 수 있는 하나님께 몸과 영혼에 필요한 것을 기대할 수 있다는 뜻이라고 해요. 그래서 주님이 가르치신 기도는 하나님의 이름이 거룩히 높임받기를 먼저 구하는 것으로 이어져요.",
    "short": "기도는 자녀의 마음으로 아버지를 부르며 시작해요",
    "base": "하이델베르크 46주일(120~122문) · 소요리문답 100~101문",
    "img": "../note/img/w/weekly-46.webp",
    "alt": "아버지 부르기 주의 상징 정물: 빵과 물고기를 담은 바구니",
    "days": [
      {
        "d": "월",
        "ref": "누가복음 11장 1~3절",
        "url": "https://www.bskorea.or.kr/bible/korbibReadpage.php?version=GAE&book=luk&chap=11&sec=1",
        "ask": "예수님은 기도를 시작할 때 하나님을 어떻게 부르라고 하나요?",
        "choices": [
          "아버지",
          "왕",
          "스승"
        ],
        "answer": 0,
        "where": "누가복음 11장 2절"
      },
      {
        "d": "화",
        "ref": "마태복음 7장 9~11절",
        "url": "https://www.bskorea.or.kr/bible/korbibReadpage.php?version=GAE&book=mat&chap=7&sec=9",
        "ask": "아들이 떡을 달라 할 때 아버지가 주지 않을 것은 무엇인가요?",
        "choices": [
          "생선",
          "돌",
          "좋은 것"
        ],
        "answer": 1,
        "where": "마태복음 7장 9절"
      },
      {
        "d": "수",
        "ref": "마태복음 6장 5~6절",
        "url": "https://www.bskorea.or.kr/bible/korbibReadpage.php?version=GAE&book=mat&chap=6&sec=5",
        "ask": "예수님은 골방에서 누구께 기도하라고 하시나요?",
        "choices": [
          "무리에게",
          "선지자에게",
          "아버지께"
        ],
        "answer": 2,
        "where": "마태복음 6장 6절"
      },
      {
        "d": "목",
        "ref": "마태복음 6장 9절",
        "url": "https://www.bskorea.or.kr/bible/korbibReadpage.php?version=GAE&book=mat&chap=6&sec=9",
        "ask": "예수님은 누구를 부르며 기도를 시작하라고 하시나요?",
        "choices": [
          "하늘에 계신 아버지",
          "광야의 선지자",
          "성전의 제사장"
        ],
        "answer": 0,
        "where": "마태복음 6장 9절"
      },
      {
        "d": "금",
        "ref": "에베소서 3장 14~17절",
        "url": "https://www.bskorea.or.kr/bible/korbibReadpage.php?version=GAE&book=eph&chap=3&sec=14",
        "ask": "바울은 누구 앞에 무릎을 꿇는다고 하나요?",
        "choices": [
          "왕 앞에",
          "아버지 앞에",
          "사도 앞에"
        ],
        "answer": 1,
        "where": "에베소서 3장 14절"
      }
    ]
  },
  {
    "n": 47,
    "group": "기도",
    "title": "나라가 오기를",
    "q": "하나님의 나라가 오기를 구하는 기도는 무엇을 바라는 걸까요?",
    "refs": [
      "마태복음 6장 33절",
      "요한계시록 22장 20절"
    ],
    "confess": "하나님의 나라를 구하는 기도는 하나님이 말씀과 성령님으로 우리를 다스려 주시고, 우리가 날마다 더 그분께 맡기게 해 달라는 기도라고 교회는 고백해 왔어요. 또 하나님의 교회가 지켜지고 자라가기를 구하는 기도이기도 해요. 그리고 하나님이 모든 것을 온전히 다스리시는 날이 오기를 기다리는 기도라고 해요.",
    "short": "하나님이 다스리시는 나라가 오기를 바라는 기도예요",
    "base": "하이델베르크 47주일(123문) · 소요리문답 102문",
    "img": "../note/img/w/weekly-47.webp",
    "alt": "나라가 오기를 주의 상징 정물: 겨자씨, 자란 겨자 가지, 부푼 반죽",
    "days": [
      {
        "d": "월",
        "ref": "마태복음 6장 31~33절",
        "url": "https://www.bskorea.or.kr/bible/korbibReadpage.php?version=GAE&book=mat&chap=6&sec=31",
        "ask": "예수님은 먼저 무엇을 구하라고 하시나요?",
        "choices": [
          "먹을 것",
          "입을 것",
          "하나님의 나라"
        ],
        "answer": 2,
        "where": "마태복음 6장 33절"
      },
      {
        "d": "화",
        "ref": "요한계시록 22장 17~21절",
        "url": "https://www.bskorea.or.kr/bible/korbibReadpage.php?version=GAE&book=rev&chap=22&sec=17",
        "ask": "주 예수님이 속히 오신다는 말에 어떤 대답이 이어지나요?",
        "choices": [
          "아멘 오시옵소서",
          "멀리 떠나소서",
          "오래 기다리소서"
        ],
        "answer": 0,
        "where": "요한계시록 22장 20절"
      },
      {
        "d": "수",
        "ref": "마태복음 6장 10절",
        "url": "https://www.bskorea.or.kr/bible/korbibReadpage.php?version=GAE&book=mat&chap=6&sec=10",
        "ask": "예수님은 무엇이 임하기를 기도하라고 하시나요?",
        "choices": [
          "큰 부요",
          "하나님의 나라",
          "많은 명예"
        ],
        "answer": 1,
        "where": "마태복음 6장 10절"
      },
      {
        "d": "목",
        "ref": "누가복음 17장 20~21절",
        "url": "https://www.bskorea.or.kr/bible/korbibReadpage.php?version=GAE&book=luk&chap=17&sec=20",
        "ask": "예수님은 하나님의 나라가 어디에 있다고 말씀하시나요?",
        "choices": [
          "바다 너머",
          "산 꼭대기",
          "너희 안에"
        ],
        "answer": 2,
        "where": "누가복음 17장 21절"
      },
      {
        "d": "금",
        "ref": "로마서 14장 16~18절",
        "url": "https://www.bskorea.or.kr/bible/korbibReadpage.php?version=GAE&book=rom&chap=14&sec=16",
        "ask": "바울은 하나님의 나라가 먹고 마시는 것이 아니라 무엇이라고 하나요?",
        "choices": [
          "의와 평강과 희락",
          "힘과 재물과 명예",
          "지식과 능력과 말"
        ],
        "answer": 0,
        "where": "로마서 14장 17절"
      }
    ]
  },
  {
    "n": 48,
    "group": "기도",
    "title": "하나님의 뜻",
    "q": "내가 바라는 것과 하나님의 뜻이 다를 때는 어떻게 기도하나요?",
    "refs": [
      "마태복음 26장 39절",
      "로마서 12장 2절"
    ],
    "confess": "하나님의 뜻이 이루어지기를 구하는 기도는, 내 뜻을 내려놓고 오직 선하신 하나님의 뜻을 불평 없이 따르게 해 달라는 기도라고 교회는 고백해 왔어요. 사람마다 하나님이 맡기신 일이 있고, 그것을 하늘의 천사들처럼 기쁘게 해내게 해 달라는 기도이기도 해요. 예수님도 십자가를 앞두고 내 바람보다 아버지의 뜻을 앞에 두고 기도하셨다고 해요.",
    "short": "내 바람보다 선하신 하나님의 뜻을 구하는 기도예요",
    "base": "하이델베르크 48주일(124문) · 소요리문답 103문",
    "img": "../note/img/w/weekly-48.webp",
    "alt": "하나님의 뜻 주의 상징 정물: 올리브 짜는 돌과 잔",
    "days": [
      {
        "d": "월",
        "ref": "마태복음 26장 38~39절",
        "url": "https://www.bskorea.or.kr/bible/korbibReadpage.php?version=GAE&book=mat&chap=26&sec=38",
        "ask": "예수님은 자신의 원보다 무엇이 이루어지기를 기도하시나요?",
        "choices": [
          "제자들의 뜻",
          "아버지의 뜻",
          "무리의 뜻"
        ],
        "answer": 1,
        "where": "마태복음 26장 39절"
      },
      {
        "d": "화",
        "ref": "로마서 12장 1~2절",
        "url": "https://www.bskorea.or.kr/bible/korbibReadpage.php?version=GAE&book=rom&chap=12&sec=1",
        "ask": "바울은 무엇을 분별하라고 하나요?",
        "choices": [
          "사람의 평가",
          "세상의 재물",
          "하나님의 뜻"
        ],
        "answer": 2,
        "where": "로마서 12장 2절"
      },
      {
        "d": "수",
        "ref": "마태복음 6장 10절",
        "url": "https://www.bskorea.or.kr/bible/korbibReadpage.php?version=GAE&book=mat&chap=6&sec=10",
        "ask": "예수님은 하나님의 뜻이 어디에서와 같이 땅에서도 이루어지기를 구하나요?",
        "choices": [
          "하늘에서",
          "광야에서",
          "성전에서"
        ],
        "answer": 0,
        "where": "마태복음 6장 10절"
      },
      {
        "d": "목",
        "ref": "시편 143편 8~10절",
        "url": "https://www.bskorea.or.kr/bible/korbibReadpage.php?version=GAE&book=psa&chap=143&sec=8",
        "ask": "시인은 하나님께 무엇을 행하도록 가르쳐 달라고 하나요?",
        "choices": [
          "자신의 계획",
          "주의 뜻",
          "사람의 말"
        ],
        "answer": 1,
        "where": "시편 143편 10절"
      },
      {
        "d": "금",
        "ref": "누가복음 22장 41~43절",
        "url": "https://www.bskorea.or.kr/bible/korbibReadpage.php?version=GAE&book=luk&chap=22&sec=41",
        "ask": "예수님은 누구의 뜻이 이루어지기를 기도하시나요?",
        "choices": [
          "무리의 뜻",
          "제자의 뜻",
          "아버지의 뜻"
        ],
        "answer": 2,
        "where": "누가복음 22장 42절"
      }
    ]
  },
  {
    "n": 49,
    "group": "기도",
    "title": "일용할 양식",
    "q": "날마다 먹을 것을 구하는 기도는 어떤 마음에서 나올까요?",
    "refs": [
      "마태복음 6장 11절",
      "시편 127편 1~2절"
    ],
    "confess": "날마다 필요한 것을 구하는 기도는 모든 좋은 것이 하나님에게서 온다는 것을 인정하는 기도라고 교회는 고백해 왔어요. 우리의 걱정이나 수고, 하나님이 주신 선물도 하나님의 복이 없으면 쓸모가 없다고요. 그래서 이 기도는 하나님이 주신 것들 자체를 의지하던 마음을 내려놓고 오직 하나님께만 기대게 해 달라는 기도이기도 해요.",
    "short": "날마다 필요한 것은 하나님께 구해요",
    "base": "하이델베르크 49주일(125문) · 소요리문답 104문",
    "img": "../note/img/w/weekly-49.webp",
    "alt": "일용할 양식 주의 상징 정물: 하루치 빵 두 덩이",
    "days": [
      {
        "d": "월",
        "ref": "마태복음 6장 11절",
        "url": "https://www.bskorea.or.kr/bible/korbibReadpage.php?version=GAE&book=mat&chap=6&sec=11",
        "ask": "예수님은 무엇을 달라고 기도하라고 하시나요?",
        "choices": [
          "일용할 양식",
          "많은 재물",
          "높은 자리"
        ],
        "answer": 0,
        "where": "마태복음 6장 11절"
      },
      {
        "d": "화",
        "ref": "시편 127편 1~2절",
        "url": "https://www.bskorea.or.kr/bible/korbibReadpage.php?version=GAE&book=psa&chap=127&sec=1",
        "ask": "시인은 하나님이 사랑하시는 사람에게 무엇을 주신다고 하나요?",
        "choices": [
          "부요",
          "잠",
          "명예"
        ],
        "answer": 1,
        "where": "시편 127편 2절"
      },
      {
        "d": "수",
        "ref": "출애굽기 16장 15~18절",
        "url": "https://www.bskorea.or.kr/bible/korbibReadpage.php?version=GAE&book=exo&chap=16&sec=15",
        "ask": "광야의 백성은 무엇을 거두어 먹었나요?",
        "choices": [
          "메추라기만",
          "밀 이삭",
          "만나"
        ],
        "answer": 2,
        "where": "출애굽기 16장 15절"
      },
      {
        "d": "목",
        "ref": "잠언 30장 7~9절",
        "url": "https://www.bskorea.or.kr/bible/korbibReadpage.php?version=GAE&book=pro&chap=30&sec=7",
        "ask": "잠언은 자신에게 무엇을 먹여 달라고 구하나요?",
        "choices": [
          "필요한 양식",
          "많은 진미",
          "왕의 음식"
        ],
        "answer": 0,
        "where": "잠언 30장 8절"
      },
      {
        "d": "금",
        "ref": "마태복음 6장 25~27절",
        "url": "https://www.bskorea.or.kr/bible/korbibReadpage.php?version=GAE&book=mat&chap=6&sec=25",
        "ask": "예수님은 목숨을 위해 무엇을 염려하지 말라고 하시나요?",
        "choices": [
          "어디로 갈까",
          "무엇을 먹을까",
          "누가 찾아올까"
        ],
        "answer": 1,
        "where": "마태복음 6장 25절"
      }
    ]
  },
  {
    "n": 50,
    "group": "기도",
    "title": "용서",
    "q": "용서해 달라는 기도와 이웃을 용서하는 일은 어떻게 이어질까요?",
    "refs": [
      "에베소서 4장 32절",
      "마태복음 18장 21~22절"
    ],
    "confess": "용서를 구하는 기도는 예수님의 피 때문에 하나님이 우리의 죄와 아직 남아 있는 악한 마음을 더 이상 묻지 않으시기를 구하는 기도라고 교회는 고백해 왔어요. 우리가 이웃을 온 마음으로 용서하기로 마음먹는 것은, 하나님의 은혜가 우리 안에서 일하고 있다는 증거라고요. 하나님께 용서받은 기쁨이 이웃을 용서하는 힘이 된다고도 해요.",
    "short": "용서받은 은혜가 이웃을 용서하는 힘이 돼요",
    "base": "하이델베르크 50주일(126문) · 소요리문답 105문",
    "img": "../note/img/w/weekly-50.webp",
    "alt": "용서 주의 상징 정물: 둘로 찢은 빈 문서, 열린 문",
    "days": [
      {
        "d": "월",
        "ref": "에베소서 4장 31~32절",
        "url": "https://www.bskorea.or.kr/bible/korbibReadpage.php?version=GAE&book=eph&chap=4&sec=31",
        "ask": "하나님이 용서하신 것같이 서로 무엇을 하라고 하나요?",
        "choices": [
          "책망하라고",
          "따지라고",
          "용서하라고"
        ],
        "answer": 2,
        "where": "에베소서 4장 32절"
      },
      {
        "d": "화",
        "ref": "마태복음 18장 21~22절",
        "url": "https://www.bskorea.or.kr/bible/korbibReadpage.php?version=GAE&book=mat&chap=18&sec=21",
        "ask": "예수님은 몇 번까지 용서하라고 말씀하시나요?",
        "choices": [
          "일곱 번을 일흔 번까지",
          "일곱 번까지만",
          "세 번까지만"
        ],
        "answer": 0,
        "where": "마태복음 18장 22절"
      },
      {
        "d": "수",
        "ref": "마태복음 6장 12절",
        "url": "https://www.bskorea.or.kr/bible/korbibReadpage.php?version=GAE&book=mat&chap=6&sec=12",
        "ask": "예수님은 무엇을 용서해 달라고 기도하라고 하시나요?",
        "choices": [
          "수고를",
          "죄를",
          "가난을"
        ],
        "answer": 1,
        "where": "마태복음 6장 12절"
      },
      {
        "d": "목",
        "ref": "골로새서 3장 12~14절",
        "url": "https://www.bskorea.or.kr/bible/korbibReadpage.php?version=GAE&book=col&chap=3&sec=12",
        "ask": "누군가에게 불만이 있을 때 서로 무엇을 하라고 하나요?",
        "choices": [
          "다투라고",
          "떠나라고",
          "용납하고 용서하라고"
        ],
        "answer": 2,
        "where": "골로새서 3장 13절"
      },
      {
        "d": "금",
        "ref": "시편 103편 10~12절",
        "url": "https://www.bskorea.or.kr/bible/korbibReadpage.php?version=GAE&book=psa&chap=103&sec=10",
        "ask": "하나님은 우리의 죄과를 어느 방향만큼 멀리 옮기셨다고 하나요?",
        "choices": [
          "동이 서에서 먼 것만큼",
          "북이 남에서 먼 것만큼",
          "산이 바다에서 먼 것만큼"
        ],
        "answer": 0,
        "where": "시편 103편 12절"
      }
    ]
  },
  {
    "n": 51,
    "group": "기도",
    "title": "시험",
    "q": "시험에 들지 않게 지켜 달라는 기도는 왜 필요할까요?",
    "refs": [
      "마태복음 26장 41절",
      "고린도전서 10장 13절"
    ],
    "confess": "우리는 너무 약해서 한순간도 스스로 서 있을 수 없다고 교회는 고백해 왔어요. 게다가 마귀와 세상과 우리 자신의 욕심이 쉬지 않고 우리를 공격해서, 도움을 구하는 기도가 필요하다고요. 그래서 성령님이 우리를 붙들고 힘을 주셔서, 쓰러지지 않고 끝까지 싸워 이기게 해 달라고 기도해요.",
    "short": "약한 나를 성령님이 붙들어 달라고 기도해요",
    "base": "하이델베르크 51주일(127문) · 소요리문답 106문",
    "img": "../note/img/w/weekly-51.webp",
    "alt": "시험 주의 상징 정물: 밤 창가에 깨어 있는 등불",
    "days": [
      {
        "d": "월",
        "ref": "마태복음 26장 40~41절",
        "url": "https://www.bskorea.or.kr/bible/korbibReadpage.php?version=GAE&book=mat&chap=26&sec=40",
        "ask": "예수님은 시험에 들지 않게 무엇을 하라고 하시나요?",
        "choices": [
          "걷고 쉬라고",
          "깨어 기도하라고",
          "숨고 기다리라고"
        ],
        "answer": 1,
        "where": "마태복음 26장 41절"
      },
      {
        "d": "화",
        "ref": "고린도전서 10장 12~13절",
        "url": "https://www.bskorea.or.kr/bible/korbibReadpage.php?version=GAE&book=1co&chap=10&sec=12",
        "ask": "하나님은 시험 중에 무엇을 내셔서 감당하게 하시나요?",
        "choices": [
          "큰 보상을",
          "쉬운 약속을",
          "피할 길을"
        ],
        "answer": 2,
        "where": "고린도전서 10장 13절"
      },
      {
        "d": "수",
        "ref": "마태복음 6장 13절",
        "url": "https://www.bskorea.or.kr/bible/korbibReadpage.php?version=GAE&book=mat&chap=6&sec=13",
        "ask": "예수님은 누구에게서 구해 달라고 기도하라고 하시나요?",
        "choices": [
          "악에서",
          "사람들에게서",
          "일에서"
        ],
        "answer": 0,
        "where": "마태복음 6장 13절"
      },
      {
        "d": "목",
        "ref": "에베소서 6장 10~12절",
        "url": "https://www.bskorea.or.kr/bible/korbibReadpage.php?version=GAE&book=eph&chap=6&sec=10",
        "ask": "바울은 누구 안에서 힘을 얻으라고 하나요?",
        "choices": [
          "자신 안에서",
          "주 안에서",
          "왕 안에서"
        ],
        "answer": 1,
        "where": "에베소서 6장 10절"
      },
      {
        "d": "금",
        "ref": "야고보서 1장 12~15절",
        "url": "https://www.bskorea.or.kr/bible/korbibReadpage.php?version=GAE&book=jas&chap=1&sec=12",
        "ask": "욕심이 잉태하면 무엇을 낳는다고 하나요?",
        "choices": [
          "지혜를",
          "평안을",
          "죄를"
        ],
        "answer": 2,
        "where": "야고보서 1장 15절"
      }
    ]
  },
  {
    "n": 52,
    "group": "기도",
    "title": "아멘",
    "q": "기도를 마칠 때 하는 '아멘'에는 어떤 마음이 담겨 있을까요?",
    "refs": [
      "로마서 11장 36절",
      "요한일서 5장 14~15절"
    ],
    "confess": "개신교 예배에서는 주님이 가르치신 기도를 '하나님이 왕이시고 능력과 영광이 영원히 그분께 있다'는 고백으로 마쳐 왔어요. 하나님은 무엇이든 하실 수 있는 분이어서 우리에게 좋은 것을 주실 수 있고, 그래서 영광은 우리가 아니라 그분의 이름이 받으셔야 한다고 교회는 고백해 왔어요. '아멘'은 '참으로 그렇게 되기를'이라는 뜻이어서, 내가 간절히 바라는 것보다 하나님이 이 기도를 들으심이 훨씬 확실하다는 믿음을 담는다고 해요.",
    "short": "아멘은 하나님이 들으신다는 믿음의 대답이에요",
    "base": "하이델베르크 52주일(128~129문) · 소요리문답 107문",
    "img": "../note/img/w/weekly-52.webp",
    "alt": "아멘 주의 상징 정물: 다 탄 초, 창으로 드는 새해 새벽빛",
    "days": [
      {
        "d": "월",
        "ref": "로마서 11장 34~36절",
        "url": "https://www.bskorea.or.kr/bible/korbibReadpage.php?version=GAE&book=rom&chap=11&sec=34",
        "ask": "바울은 누구에게 영광이 영원히 있다고 하나요?",
        "choices": [
          "하나님께",
          "천사에게",
          "우리에게"
        ],
        "answer": 0,
        "where": "로마서 11장 36절"
      },
      {
        "d": "화",
        "ref": "요한일서 5장 14~15절",
        "url": "https://www.bskorea.or.kr/bible/korbibReadpage.php?version=GAE&book=1jn&chap=5&sec=14",
        "ask": "하나님의 뜻대로 구하면 하나님이 어떻게 하신다고 하나요?",
        "choices": [
          "외면하신다고",
          "들으신다고",
          "미루신다고"
        ],
        "answer": 1,
        "where": "요한일서 5장 14절"
      },
      {
        "d": "수",
        "ref": "고린도후서 1장 18~20절",
        "url": "https://www.bskorea.or.kr/bible/korbibReadpage.php?version=GAE&book=2co&chap=1&sec=18",
        "ask": "하나님의 약속은 예수님 안에서 무엇이 되었다고 하나요?",
        "choices": [
          "보류가",
          "의문이",
          "예가"
        ],
        "answer": 2,
        "where": "고린도후서 1장 20절"
      },
      {
        "d": "목",
        "ref": "요한계시록 3장 13~14절",
        "url": "https://www.bskorea.or.kr/bible/korbibReadpage.php?version=GAE&book=rev&chap=3&sec=13",
        "ask": "라오디게아 교회에 말씀하시는 분은 자신을 무엇이라 부르시나요?",
        "choices": [
          "아멘",
          "왕의 종",
          "광야의 소리"
        ],
        "answer": 0,
        "where": "요한계시록 3장 14절"
      },
      {
        "d": "금",
        "ref": "시편 72편 18~19절",
        "url": "https://www.bskorea.or.kr/bible/korbibReadpage.php?version=GAE&book=psa&chap=72&sec=18",
        "ask": "하나님의 영광을 찬양하는 말 끝에 무엇이라고 하나요?",
        "choices": [
          "할렐루야 한 번",
          "아멘 아멘",
          "평안 평안"
        ],
        "answer": 1,
        "where": "시편 72편 19절"
      }
    ]
  }
]
};
