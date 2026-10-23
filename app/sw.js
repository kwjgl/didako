/*
 * 홈 화면 앱(PWA)용 작은 도우미. 앱 화면 파일을 휴대폰에 한 벌 남겨 두었다가, 인터넷이 끊기거나 느릴 때 그걸로 연다.
 * 코이데와 같은 방식이다: 늘 인터넷의 새 파일을 먼저 받아서(받으면 남겨 둔 것도 바꿈) 고친 화면이 바로 보인다. 브라우저에 남은 사본은 쓰지 않고 서버에 확인한다.
 * 아래 CACHE 번호는 남겨 둔 사본의 이름표다. 번호를 올리면 예전 사본을 지운다(AGENTS.md 서비스워커 캐시).
 * 데모에는 서버가 없다. 같은 주소의 파일만 다루고, 글꼴 같은 다른 주소의 요청은 건드리지 않는다.
 */
const CACHE = 'didako-v3';
const SHELL = ['./', 'index.html', 'design-styles.css', 'demo-data.js', 'manifest.webmanifest', 'icons/icon-192.png', 'icons/icon-512.png', 'icons/icon-maskable-512.png', 'icons/apple-touch-icon.png', 'icons/favicon-32.png'];

self.addEventListener('install', e => {
  // GitHub Pages가 파일을 잠시 그대로 쓰라고 해도 새로 받도록 사본을 쓰지 않고 요청한다
  e.waitUntil(caches.open(CACHE).then(c => Promise.all(SHELL.map(u => c.add(new Request(u, { cache: 'reload' }))))).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const req = e.request, url = new URL(req.url);
  if (req.method !== 'GET' || url.origin !== location.origin) return;
  if (!url.pathname.startsWith(new URL('./', location).pathname)) return;
  // GitHub Pages가 파일을 10분 동안 그대로 쓰라고 해도, 서버에 바뀌었는지 늘 물어본다(바뀌지 않았으면 확인만 하고 끝난다).
  //  화면 주소 요청(navigate)에는 옵션을 붙일 수 없어서 주소로 새 요청을 만든다 (코이데와 같다)
  e.respondWith(fetch(new Request(req.url, { cache: 'no-cache', credentials: 'same-origin' })).then(res => {
    if (res.ok) { const copy = res.clone(); caches.open(CACHE).then(c => c.put(req, copy)); }
    return res;
  // 실패하면 남겨 둔 사본. 사본이 없을 때 화면 주소만 첫 화면으로 대신하고, 나머지는 실패 그대로 돌려준다
  }).catch(() => caches.match(req, { ignoreSearch: true }).then(r => r || (req.mode === 'navigate' ? caches.match('./') : Response.error()))));
});
