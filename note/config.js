// 디다코 노트 설정(didako에만 있는 실제 값). gbs 저장소의 note/config.js는 비어 있고, 이 파일은 gbs에서 덮어쓰지 않는다
window.DIDAKO_CONFIG = {
  HUB_URL: '',   // 2026-11-20 비움: 기본 서버(허브)를 끄는 중이다. 되돌리려면 git 기록의 옛 주소를 다시 넣는다
  KAKAO_REST_KEY: '797c76e7cc40eb0fb93ca86e6d1bb62e',
  REDIRECT_URI: 'https://didako.koinobia.com/note/',
  // 노트 로그인과 동기화의 새 길(gbs docs/setup.md 3-4). 이미 예전 길로 로그인한 기기는 그대로 예전 길에 남는다
  NOTE_BACKEND: 'supabase',
  SUPABASE_URL: 'https://knzibzjnpkcpelwfqdvx.supabase.co',  // 공개 값(코이데와 같은 프로젝트)
  SUPABASE_KEY: 'sb_publishable_zWrybkJVwpzQ04XnUoxnSA_keakooJI',   // publishable 키(공개 값). secret(service_role) 키는 절대 넣지 않는다
  // 알림(웹 푸시) 공개 열쇠. 비우면 더보기 › 앱 설정에 알림 줄이 없다(공개 값, 비밀 열쇠는 Supabase에만 있다)
  PUSH_KEY: 'BGqC5a_zTqB3EzsEKyRME1KPPy6uGXiUN7XaNKwXv9jw-MS3aj01IR8sLI8m8_fDFX9KdLv1wUJa7fz_PGTCkIs'
};
