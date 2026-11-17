// 따라 하기 연습 페이지(?tutorial)용 메모리 저장소. 디다코 노트 practice.js를 본뜬 공동체 연습용 저장소다.
//  <body> 맨 앞에서 splash.js보다 먼저 불러, 앱 스크립트가 저장소를 읽기 전에 바꾼다. ?tutorial이 아니면 아무것도 하지 않는다.
//  연습한 것이 진짜 기록·로그인·화면 기억에 닿지 않게 localStorage를 이 창의 메모리 판으로 바꾼다(창을 닫으면 사라진다).
//  읽기만 하는 것은 화면 설정(밝은·어두운 화면, 색 테마, 큰 글씨) 하나다: 쓰던 화면 그대로 보이게. 쓰기는 메모리에만 간다.
//  연습 페이지는 서버와 이야기하지 않는다(index.html이 ?tutorial에서는 데모처럼 돈다). 시작 화면도 띄우지 않는다.
(() => {
  if (!new URLSearchParams(location.search).has('tutorial')) return;
  const mem = new Map(), real = (() => { try { return window.localStorage; } catch (e) { return null; } })();
  const SEE = 'didako-note-display';   // 읽기만 하는 열쇠
  const store = {
    getItem: k => mem.has(k) ? mem.get(k) : k === SEE && real ? real.getItem(k) : null,
    setItem: (k, v) => { mem.set(String(k), String(v)); },
    removeItem: k => { mem.set(String(k), null); },
    clear: () => mem.clear(), key: () => null, get length() { return mem.size; }
  };
  try { Object.defineProperty(window, 'localStorage', { value: store, configurable: true }); } catch (e) { /* 막히면 기기 저장소를 그대로(index.html이 연습 중에는 쓰지 않는다) */ }
})();
