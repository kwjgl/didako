/* 디다코 노트 데모의 예시 자료(한 곳에 모았다).
   오늘의 질문 409개와 이번 주의 질문 52개는 여기가 아니라 questions-data.js에 있다(docs/의 AI 초안과 art/bible-questions/의 그림에서 note/tools/make-data.py가 만든다).
   내 기록의 예시 이름과 글은 화면 시안(prototype/mulpyo)의 지어낸 예시다.
   weeklyExtra는 캔버스 보드(M7b, M30)에 있던 이번 주의 질문 예시의 덧붙임이다. 보드 예시는 이제 52개 가운데 1주와 같은 글이라 그 주(1주)에만 붙인다. */
window.NOTE_DATA = {
  /* 이번 주의 질문 가운데 보드 예시가 붙어 있던 주(주 번호가 키).
     lastYear는 작년의 내 생각(보드 M7b의 예시 글), keys는 "이 질문에 닿는 내 질문"을 찾을 때만 쓰는 낱말이고 화면에는 보이지 않는다(보드 M30의 예시 카드가 나오게 한 데모용) */
  weeklyExtra: {
    1: { lastYear: '솔직히 잘 모르겠어요. 죽음은 아직 멀게 느껴져요', keys: '기도 낫지' }
  },

  /* 말씀을 열며의 세 줄(GBS 앱 app/demo-data.js와 같은 글) */
  openLines: ['아버지께서 주신 말씀을', '말씀이 가리키는 예수님 안에서', '성령님이 깨닫게 해 주시기를'],

  /* 하나씩 쓰기 ① 문장 틀(한 번에 하나씩 돌린다. 틀 안의 ___가 내가 채울 곳) */
  frames: ['정말 궁금한 건 ___야', '왜 ___일까?', '하나님은 왜 ___하셨을까?', '___라면 어떻게 했을까?'],

  /* 내 기록의 예시(캔버스 M2·M5b·M6·M11·M19~M22·M24~M26·T9~T12의 지어낸 글을 모았다). 설정(톱니)의 "예시 기록 채우기"가 이 기록을 채운다.
     날짜는 모두 "채운 날 기준 n일 전"(daysAgo)이다. touchedDaysAgo는 마지막으로 만진 때, trail은 지나온 길에 읽기 전용으로 보이는 탐구 노트 카드(kind 'note')와 "알게 된 것"(kind 'got')이다.
     탐구 노트가 따로 있는 질문(아래 ex)은 노트 카드를 노트에서 만들어 보여 주므로 trail에 'note'를 두지 않는다.
     q(state 'found')는 짝이 된 발견을 q: <질문 id>로 가리킨다. q 없는 발견은 "남겨 둔 ! 발견"이다. */
  notes: {
    qs: [
      { id: 'sq1', text: '아브라함은 정말 두렵지 않았을까?', ref: '창세기 22장', daysAgo: 234, touchedDaysAgo: 9, state: 'found',
        trail: [{ kind: 'got', daysAgo: 178, text: '순종은 두려움이 없는 것이 아니라고 했어요' }] },
      { id: 'sq2', text: '왜 기도해도 낫지 않을까?', ref: '시편 13편 1절', daysAgo: 147, touchedDaysAgo: 20, state: 'found',
        trail: [{ kind: 'got', daysAgo: 21, text: '묻는 것도 믿음이에요' }] },
      { id: 'sq3', text: '기도하면 정말 바뀔까?', ref: '마태복음 7장 7절', daysAgo: 133, touchedDaysAgo: 8, state: 'holding' },
      { id: 'sq4', text: '용서는 어디까지 해야 할까?', ref: '마태복음 18장', daysAgo: 650, touchedDaysAgo: 70, state: 'holding' },
      { id: 'sq5', text: '왜 하필 포도나무였을까?', ref: '요한복음 15장 1절', daysAgo: 107, touchedDaysAgo: 3, state: 'holding', parent: 'sq9',
        trail: [{ kind: 'note', daysAgo: 85, text: '포도원은 구약에서 이스라엘을 말했대요' }, { kind: 'got', daysAgo: 37, text: '붙어 있으면 열매는 따라온다고 하셨어요' }] },
      { id: 'sq6', text: '하나님은 왜 대답하지 않으실 때가 있을까?', ref: '시편 22편', daysAgo: 73, touchedDaysAgo: 25, state: 'holding' },
      { id: 'sq7', text: '고난 중에도 하나님은 좋으신 분일까?', ref: '욥기', daysAgo: 438, touchedDaysAgo: 60, state: 'holding' },
      { id: 'sq9', text: '붙어 있다는 건 무슨 뜻일까', ref: '', daysAgo: 140, touchedDaysAgo: 130, state: 'holding' }
    ],
    fs: [
      { id: 'sf1', text: '순종은 감정이 아니라 방향이었어요', daysAgo: 8, touchedDaysAgo: 8, q: 'sq1' },
      { id: 'sf2', text: '기다리는 것도 기도였어요', daysAgo: 20, touchedDaysAgo: 20, q: 'sq2' },
      { id: 'sl1', text: '열매는 노력이 아니라 붙어 있는 것에서 나와요. 내가 애써서 맺으려 하면 지치는데, 붙어 있으면 때가 되어 맺혀요. 이번 주에는 잘하려는 마음보다 먼저 말씀 앞에 머무는 시간을 지키고 싶어요.', daysAgo: 8, touchedDaysAgo: 8 },
      { id: 'sl2', text: '용서는 내 힘이 아니라 받은 은혜에서 시작돼요', daysAgo: 85, touchedDaysAgo: 85 },
      { id: 'sl3', text: '기다림도 하나님이 일하시는 시간이었어요. 아무 일도 없는 것 같던 때에 마음이 자라고 있었어요.', daysAgo: 29, touchedDaysAgo: 5 },
      { id: 'sl4', text: '포도나무에 붙어 있는 가지처럼 살고 싶어요', daysAgo: 120, touchedDaysAgo: 120 },
      { id: 'sl5', text: '두려움 속에서도 먼저 길을 나서는 것이 믿음이에요', daysAgo: 100, touchedDaysAgo: 100 }
    ],
    /* 탐구 노트 예시(캔버스 M7·M9·M29·T1·T6과 M7 아래 지난 탐구 줄). current가 지금 탐구하는 질문이다.
       steps는 ①~⑤에 쓴 글, ok는 [적었어요]로 마친 단계, added는 ②에 넣은 오늘의 질문(s2), last는 가장 최근에 적은 단계(0부터).
       mode 'free'(자유롭게 쓰기)인 노트는 자유 글(free)이 비어 있는 채로 열린다. 보드에 단계 글이 없는 노트는 비워 두었다 */
    ex: [
      { q: 'sq2', mode: 'steps', current: true, daysAgo: 22, touchedDaysAgo: 20, since: '2026-07', last: 1,
        steps: ['정말 궁금한 건 기도해도 왜 낫지 않는지야', '시편 13편 1절\n다윗도 나처럼 물었어요', '', '', ''],
        ok: [true, true, false, false, false], refs: ['시편 13편 1절'],
        added: { s2: { q: '언제까지 나를 잊고 계시겠어요?', ref: '시편 13편 1절' }, s3: null } },
      { q: 'sq4', mode: 'steps', daysAgo: 50, touchedDaysAgo: 50, steps: ['', '', '', '', ''] },
      { q: 'sq7', mode: 'free', daysAgo: 85, touchedDaysAgo: 85 },
      { q: 'sq1', mode: 'steps', daysAgo: 204, touchedDaysAgo: 204, last: 0, ok: [true, false, false, false, false],
        steps: ['정말 궁금한 건 두려움이 없었는지야', '', '', '', ''] }
    ]
  },

  /* 복구용 낱말: 처음에는 캔버스 M8i의 예시 여섯 개, '새로 만들기'는 아래 낱말 더미에서 여섯 개를 뽑는다(데모: 실제 낱말은 2단계) */
  words: ['바다', '들꽃', '등불', '별빛', '시냇물', '새벽'],
  wordPool: ['바다', '하늘', '구름', '나무', '언덕', '별빛', '시냇물', '들꽃', '오솔길', '아침', '등불', '씨앗', '바람', '노을', '돌다리', '종소리', '호수', '새벽', '빗방울', '초원']
};
