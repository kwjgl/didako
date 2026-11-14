/*
 * 홈 화면 앱(PWA)용 작은 도우미. 앱 화면 파일을 휴대폰에 한 벌 남겨 두었다가, 인터넷이 끊기거나 느릴 때 그걸로 연다.
 * 코이데와 같은 방식이다: 늘 인터넷의 새 파일을 먼저 받아서(받으면 남겨 둔 것도 바꿈) 고친 화면이 바로 보인다. 브라우저에 남은 사본은 쓰지 않고 서버에 확인한다.
 * 그림(img/)은 바뀌는 일이 드물어 남겨 둔 사본을 먼저 쓴다. 그림을 바꾸면 CACHE 번호를 올려 새로 받게 한다.
 * 아래 CACHE 번호는 남겨 둔 사본의 이름표다. 번호를 올리면 예전 사본을 지운다(AGENTS.md 서비스워커 캐시).
 * 데모에는 서버가 없다. 같은 주소의 파일만 다루고, 글꼴 같은 다른 주소의 요청은 건드리지 않는다.
 */
const CACHE = 'didako-note-v97';
const SHELL = ['./', 'index.html', 'config.js', 'splash.js', 'design-styles.css', 'demo-data.js', 'questions-data.js', 'places.js', 'walks-data.js', 'map.html', 'map-places.js', 'words-ko.js', 'vendor/tiptap-2.27.3.js', 'manifest.webmanifest', 'icons/icon-192.png', 'icons/icon-512.png', 'icons/icon-maskable-512.png', 'icons/apple-touch-icon.png', 'icons/favicon-32.png'];
// 나의 배지 그림은 처음 열 때 한꺼번에 받느라 늦게 떴다. 앱을 받을 때 함께 받아 둔다(S-60). 하나를 못 받아도 설치는 계속한다
const PRE_IMG = ['a-home', 'a-style', 'a-sync', 'f-first', 'm-map', 'm-year', 'q-first', 'q-found', 't-hold', 'w-open', 'walk-first', 'x-first'].map(k => `img/badges/${k}.webp`)
  .concat(['fruit-01', 'fruit-02', 'fruit-03', 'fruit-04', 'fruit-05', 'fruit-06', 'fruit-07', 'fruit-08', 'fruit-09', 'vine'].map(k => `img/vine/badges/${k}.webp`));

self.addEventListener('install', e => {
  // GitHub Pages가 파일을 잠시 그대로 쓰라고 해도 새로 받도록 사본을 쓰지 않고 요청한다
  e.waitUntil(caches.open(CACHE).then(c => Promise.all(SHELL.map(u => c.add(new Request(u, { cache: 'reload' }))))
    .then(() => Promise.all(PRE_IMG.map(u => c.add(new Request(u, { cache: 'reload' })).catch(() => {}))))).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k.startsWith('didako-note-') && k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const req = e.request, url = new URL(req.url);
  if (req.method !== 'GET' || url.origin !== location.origin) return;
  if (!url.pathname.startsWith(new URL('./', location).pathname)) return;
  if (url.pathname.includes('/img/')) {
    e.respondWith(caches.match(req).then(async cached => {
      if (cached) return cached;
      const res = await fetch(new Request(req.url, { cache: 'no-cache', credentials: 'same-origin' }));
      if (res.ok) {
        try { const c = await caches.open(CACHE); await c.put(req, res.clone()); } catch (_) { /* 사본을 남기지 못해도 받은 그림은 보여 준다 */ }
      }
      return res;
    }).catch(() => Response.error()));
    return;
  }
  // GitHub Pages가 파일을 10분 동안 그대로 쓰라고 해도, 서버에 바뀌었는지 늘 물어본다(바뀌지 않았으면 확인만 하고 끝난다).
  //  화면 주소 요청(navigate)에는 옵션을 붙일 수 없어서 주소로 새 요청을 만든다 (코이데와 같다)
  e.respondWith(fetch(new Request(req.url, { cache: 'no-cache', credentials: 'same-origin' })).then(res => {
    if (res.ok) { const copy = res.clone(); caches.open(CACHE).then(c => c.put(req, copy)); }
    return res;
  // 실패하면 남겨 둔 사본. 사본이 없을 때 화면 주소만 첫 화면으로 대신하고, 나머지는 실패 그대로 돌려준다
  }).catch(() => caches.match(req, { ignoreSearch: true }).then(r => r || (req.mode === 'navigate' ? caches.match('./') : Response.error()))));
});
