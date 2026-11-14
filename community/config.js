// 디다코 공동체 설정(didako에만 있는 실제 값). gbs 저장소의 community/config.js는 비어 있고, 이 파일은 gbs에서 덮어쓰지 않는다
// 주소와 키가 차 있으면 Supabase로 돈다. 여닫기는 서버의 didako_setting.community_open(off·admins·on)
window.DIDAKO_CONFIG = {
  HUB_URL: '', KAKAO_REST_KEY: '', REDIRECT_URI: '',   // 쓰지 않는다(교회 앱에서 따라온 칸)
  SUPABASE_URL: 'https://knzibzjnpkcpelwfqdvx.supabase.co',  // 공개 값(노트와 같은 값)
  SUPABASE_KEY: 'sb_publishable_zWrybkJVwpzQ04XnUoxnSA_keakooJI'   // publishable 키(공개 값). secret(service_role) 키는 절대 넣지 않는다
};
