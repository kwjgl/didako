/* 아이폰 앱(native/didako) 안에서만 일하는 작은 다리.
   노트에서 고른 색 테마와 화면 모드를 앱에 알려 주면, 앱이 홈 화면 위젯에 전해서 위젯 색이 노트와 같아진다.
   사파리·홈 화면 앱(웹)에는 앱이 만든 통로(window.webkit.messageHandlers.didakoWidget)가 없어서 아무 일도 하지 않는다.
   보내는 것은 색 테마 이름과 화면 모드 이름뿐이다. 기록·메모·이름·로그인 정보는 보내지 않는다(AGENTS.md 데이터와 비밀값). */
(function () {
  var h = window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers.didakoWidget;
  if (!h) return;
  var ACCENTS = ['green', 'amber', 'blue', 'rose', 'ink', 'paper'], MODES = ['auto', 'light', 'dark'], last = '';
  // 노트가 이 기기에 적어 둔 화면 설정(didako-note-display)을 읽어서, 바뀌었을 때만 보낸다
  function sync() {
    try {
      var d = JSON.parse(localStorage.getItem('didako-note-display') || '{}');
      var accent = ACCENTS.indexOf(d.accent) >= 0 ? d.accent : 'paper', mode = MODES.indexOf(d.mode) >= 0 ? d.mode : 'auto';
      var key = accent + '/' + mode;
      if (key === last) return;
      last = key;
      h.postMessage({ accent: accent, mode: mode });
    } catch (e) { /* 보내지 못해도 노트는 그대로 쓴다 */ }
  }
  window.DidakoWidget = { sync: sync };
  sync();
})();
