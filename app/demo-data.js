// 디다코 데모 자료. 시안 README "시안 공통 예시"와 같은 내용이고, 이름과 내용은 모두 지어낸 예시다.
// 성경 본문은 싣지 않고 장절만 쓴다. 다음 화면들(책장, 나의 기록, 사랑방 등)도 이 한 곳을 같이 쓴다.
// 오늘은 10월 22일(목)이고, 이번 주 과는 10월 25일 주일의 요한복음 제3과다.
window.DIDAKO_DEMO = {
  today: '10월 22일(목)',
  // 위쪽 배지: 회원·리더는 사랑방, 목사님·관리자는 부서를 보인다(설계서 7장 시안끼리 맞추는 약속)
  church: { dept: '청장년부', room: '2-20 사랑방' },
  // state: past 지났음 / now 이번 주 / prep 준비 중 / upcoming 다가오는 과
  books: [
    {
      id: 'john', title: '요한복음', period: '2026년 9월부터', closed: false,
      lessons: [
        { no: 1, name: '빛으로 오신 분', ref: '요한복음 1:1~14', date: '10월 11일 주일', state: 'past' },
        { no: 2, name: '생명의 떡', ref: '요한복음 6:35~51', date: '10월 18일 주일', state: 'past' },
        { no: 3, name: '참포도나무', ref: '요한복음 15:1~8', date: '10월 25일 주일', state: 'now', intro: '예수님께 붙어 있을 때 어떤 열매가 맺히는지, 이번 주 말씀을 함께 살펴봐요.' },
        { no: 4, name: '성령을 약속하신 예수님', ref: '요한복음 16:5~15', date: '11월 1일 주일', state: 'prep' }
      ]
    },
    {
      id: 'genesis', title: '창세기', period: '2026년 9월부터', closed: false,
      lessons: [
        { no: 1, name: '빛이 있으라', ref: '창세기 1:1~5', date: '10월 4일 주일', state: 'past' },
        { no: 2, name: '아브람의 부르심', ref: '창세기 12:1~9', date: '11월 8일 주일', state: 'upcoming', intro: '아브람이 익숙한 곳을 떠나 부르심을 따라 나서는 이야기를 함께 살펴봐요.' }
      ]
    },
    {
      id: 'mark', title: '마가복음', period: '2026.3~4', closed: true,
      lessons: [
        { no: 1, name: '광야의 소리', ref: '마가복음 1:1~13', date: '3월 8일 주일', state: 'past' },
        { no: 2, name: '그물을 버려두고', ref: '마가복음 1:14~20', date: '3월 15일 주일', state: 'past' },
        { no: 3, name: '일어나 걸어가라', ref: '마가복음 2:1~12', date: '3월 22일 주일', state: 'past' },
        { no: 4, name: '폭풍 속의 평안', ref: '마가복음 4:35~41', date: '3월 29일 주일', state: 'past' },
        { no: 5, name: '어린아이를 받아들이면', ref: '마가복음 9:33~37', date: '4월 5일 주일', state: 'past' }
      ]
    },
    {
      id: 'psalms', title: '시편 묵상', period: '2025.11~2026.1', closed: true,
      lessons: [
        { no: 1, name: '복 있는 사람', ref: '시편 1:1~6', date: '12월 7일 주일', state: 'past' },
        { no: 2, name: '주는 나의 목자', ref: '시편 23:1~6', date: '12월 14일 주일', state: 'past' },
        { no: 3, name: '깊은 곳에서', ref: '시편 130:1~8', date: '12월 21일 주일', state: 'past' },
        { no: 4, name: '내 영혼아 찬양하라', ref: '시편 103:1~5', date: '12월 28일 주일', state: 'past' }
      ]
    }
  ],
  // 이번 주(10월 25일 주일)의 과. main은 요한복음 제3과, alt는 "교재 번갈아 쓰기 예시"(창세기 제2과를 이번 주로 옮긴 모습)
  thisWeek: {
    date: '10월 25일 주일',
    main: { book: 'john', no: 3 },
    alt: { book: 'genesis', no: 2 }
  },
  // 지난주 작은 실천(내가 지난주 모임 끝에 남긴 것)과 "오늘 남길 것" 예시
  lastWeek: { lesson: '제2과 · 생명의 떡', action: '식사 전에 가족에게 먼저 고마운 일 하나 말하기' },
  sampleKeep: { sentence: '붙어 있는 것이 먼저라는 말이 오래 남았다.', action: '출근길에 15장을 한 번 더 읽기', ref: '요한복음 15:1~8' },
  // 명단. 사랑방 화면에서 쓴다. 이름과 연결 상태만 있고 기록과 관련된 것은 없다
  rooms: {
    mine: {
      name: '2-20 사랑방',
      leader: '김도윤',
      coLeader: '이서연',
      members: ['박민재(나)', '정하늘', '최우진', '한지우', '오다온', '서하준', '문채원'],
      pending: ['윤서준', '강나은']
    },
    others: { '2부': ['2-21', '2-22'], '1부': ['1-12', '1-13'] }
  }
};
