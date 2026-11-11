// 디다코 공동체 앱 설정. 여기가 비어 있으면 데모(서버 없이 이 브라우저에만)로 돈다.
// gbs 저장소에서는 늘 비워 둔다. 실제 값은 공개 저장소 didako의 app/config.js에만 넣는다(docs/setup.md).
// 디다코 노트(note/config.js)와 같은 서버·같은 카카오 앱을 쓴다. 다른 것은 REDIRECT_URI뿐이다
window.DIDAKO_CONFIG = {
  // 코이데 기본 서버(apps-script/hub) 웹 앱 주소. 카카오 로그인과 교회 코드를 맡는다
  HUB_URL: '',
  // 카카오 개발자 앱(코이노비아)의 REST API 키. 로그인 화면 주소에 들어가는 공개 값이다(Client Secret은 넣지 않는다)
  KAKAO_REST_KEY: '',
  // 카카오에 등록한 이 앱의 주소. 예: https://didako.koinobia.com/app/
  REDIRECT_URI: ''
};
