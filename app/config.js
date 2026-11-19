// 디다코 공동체 앱 설정. 여기가 비어 있으면 데모(서버 없이 이 브라우저에만)로 돈다.
// gbs 저장소에서는 늘 비워 둔다. 실제 값은 공개 저장소 didako의 app/config.js에만 넣는다(docs/setup.md).
// 디다코 노트(note/config.js)와 같은 서버·같은 카카오 앱을 쓴다. 다른 것은 REDIRECT_URI뿐이다
window.DIDAKO_CONFIG = {
  // 코이데 기본 서버(apps-script/hub) 웹 앱 주소. 카카오 로그인과 교회 코드를 맡는다
  HUB_URL: '',
  // 카카오 개발자 앱(코이노비아)의 REST API 키. 로그인 화면 주소에 들어가는 공개 값이다(Client Secret은 넣지 않는다)
  KAKAO_REST_KEY: '',
  // 카카오에 등록한 이 앱의 주소. 예: https://didako.koinobia.com/app/
  REDIRECT_URI: '',
  // 새 길(Supabase) 설정 (3단계-1, docs/setup.md 3-6). 아래 셋이 모두 차 있으면 위의 기본 서버(HUB_URL…) 대신 Supabase로 돈다. 비워 두면 위 설정대로(옛 길이나 데모)다.
  // gbs 저장소에서는 늘 비워 둔다. 값은 didako 저장소의 app/config.js에만 넣는다(노트·공동체와 같은 주소·키).
  SUPABASE_URL: 'https://knzibzjnpkcpelwfqdvx.supabase.co',   // https://<프로젝트ref>.supabase.co (공개 값)
  SUPABASE_KEY: 'sb_publishable_zWrybkJVwpzQ04XnUoxnSA_keakooJI',   // publishable 키만. secret(service_role) 키는 절대 넣지 않는다
  CHURCH_BACKEND: 'supabase'  // 'supabase'면 디다코 교회를 Supabase로 돌린다. 비우면 지금 그대로(Apps Script 또는 데모)
};
