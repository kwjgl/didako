# community

디다코 공동체(교회 조직에 묶이지 않는 작은 모임)의 화면이에요. 디다코 교회(`app/`)를 통째로 복사해 공동체에 맞게 고친 것이라 모양과 동작이 거의 같아요(`docs/design.md` 결정 기록 2026-11-12). `config.js`가 비어 있으면(또는 주소 끝에 `?demo`) **데모**로 돌고, 쓴 것은 이 기기(localStorage)에만 남아요. `config.js`에 Supabase 주소와 키가 있으면 **실제 서버**(Supabase, `supabase/002_didako_community.sql`)로 돌아요: 로그인, 내 공동체, 만들기, 초대 링크, 신청과 승인, 내보내기, 지금 읽는 책과 과. 켜는 순서는 `docs/setup.md` 3-5예요. 모임장이 쓴 교재의 서버 저장과 넘기기·나가기·신고·끝맺기는 다음 일(2단계-2)이에요.

## 교회 앱과 다른 것

- 역할은 모임장과 회원 둘뿐이에요. 한 사람은 3곳까지, 한 공동체는 12명까지, 들어오는 길은 모임장의 초대 링크(7일)뿐이에요.
- 위쪽 이름표는 공동체 이름과 역할이고, 누르면 내 공동체 사이를 바꿔요. 데모에는 모임장인 곳(금요 말씀 모임)과 회원인 곳(새벽 창세기 모임)이 들어 있어요.
- 첫 접속(`#start/list`, `#start/new`, `#start/join`, `#start/wait`): 내 공동체 목록, 공동체 만들기, 초대 링크로 들어오기 신청.
- 책장: 질문으로 묵상하기 연재(`../note/walks-data.js`를 `walks-books.js`가 교재 모양으로 바꿔요) + 디다코 기본 교재(`book-gospel.js`, `book-prophets.js`) + 모임장이 이 공동체에서 쓴 교재. 지금 읽는 책과 과는 모임장만 바꿔요.
- 교재 관리와 과 편집은 모임장만 열어요. 배포·공개 범위·대상 모임이 없고, 쓰면 그 공동체 책장에 바로 보여요. 쓴 교재는 그 공동체 안에서만 보여요.
- 배포, 사랑방 전체 보기, 관리(부서 관리, 교회 전체, 연도 개편) 화면은 없어요.
- 기록은 이 기기에만 남아요. 디다코 노트의 동기화에 맡기지 않아요.

## 파일

- `index.html`: 앱 한 장. 교회 앱에서 따라온 실제 모드 코드(`LIVE`, `HUB_URL`)는 쓰지 않아요. Supabase로 도는 길은 `SB` 갈래에 있어요(설정이 비면 한 줄도 다르게 돌지 않아요).
- `config.js`: 설정. gbs에서는 늘 비워 둬요. 실제 값(`SUPABASE_URL`, publishable `SUPABASE_KEY`)은 didako에만 넣어요.
- `sb.js`: Supabase 로그인과 서버 함수 부르기(`window.DidakoSb`). 로그인은 디다코 노트와 같은 세션 자리(`didako-note-sb`)를 함께 써요. supabase-js는 `../note/vendor/supabase.js`를 늦게 불러와요.
- `cm-api.js`: 서버 답을 데모 자료 모양으로 바꾸는 얇은 층(`window.DidakoCm`).
- `walks-books.js`: 데모 자료에서 교회 것(예시 교재, 명단, 관리)을 빼고 연재를 꽂아요.
- `demo-data.js`, `covers.js`, `design-styles.css`, `book-*.js`, `img/`, `icons/`: 교회 앱과 같은 파일이에요.
- `sw.js`: `CACHE`는 `didako-cm-v○`. `community/` 파일을 바꾸면 하나 올려요.

저장 자리는 모두 `didako-cm-`로 시작해서 교회 앱의 기록과 섞이지 않아요. 화면 설정(`didako-note-display`)만 노트·교회와 함께 써요.

실제 서버에서 더 쓰는 저장 자리: `didako-cm-sbh`(로그인한 계정의 해시. 계정 번호 대신 둬요), `didako-cm-sb-cache.해시`(계정마다 내 공동체의 마지막 답 사본. 인터넷이 없어도 먼저 그려요), `didako-cm-join`(초대 링크로 받은 토큰. 로그인하러 다녀와도 남게 둬요). 로그인 세션 `didako-note-sb`는 노트와 함께 써요.
