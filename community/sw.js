/*
 * 홈 화면 앱(PWA)용 작은 도우미. 앱 화면 파일을 휴대폰에 한 벌 남겨 두었다가, 인터넷이 끊기거나 느릴 때 그걸로 연다.
 * 코이데와 같은 방식이다: 늘 인터넷의 새 파일을 먼저 받아서(받으면 남겨 둔 것도 바꿈) 고친 화면이 바로 보인다. 브라우저에 남은 사본은 쓰지 않고 서버에 확인한다.
 * 아래 CACHE 번호는 남겨 둔 사본의 이름표다. 번호를 올리면 예전 사본을 지운다(AGENTS.md 서비스워커 캐시).
 * 같은 주소의 파일만 다룬다. 글꼴, Supabase 서버 같은 다른 주소의 요청은 건드리지 않는다.
 */
const CACHE = 'didako-cm-v20';
const SHELL = ['./', 'index.html', 'config.js', 'design-styles.css', 'covers.js', 'demo-data.js', 'book-gospel.js', 'book-prophets.js', 'book-trinity.js', 'walks-books.js', 'sb.js', 'cm-api.js', '../note/places.js', 'manifest.webmanifest', 'icons/icon-192.png', 'icons/icon-512.png', 'icons/icon-maskable-512.png', 'icons/apple-touch-icon.png', 'icons/favicon-32.png'];

self.addEventListener('install', e => {
  // GitHub Pages가 파일을 잠시 그대로 쓰라고 해도 새로 받도록 사본을 쓰지 않고 요청한다
  e.waitUntil(caches.open(CACHE).then(c => Promise.all(SHELL.map(u => c.add(new Request(u, { cache: 'reload' }))))).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  // 노트(/note/)와 같은 주소라 노트의 사본(didako-note-…)은 남기고, 이 앱의 예전 사본(didako-cm-v…)만 지운다
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k.startsWith('didako-cm-v') && k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const req = e.request, url = new URL(req.url);
  if (req.method !== 'GET' || url.origin !== location.origin) return;
  // 그림(표지, 이번 주의 질문 그림 등)은 남겨 둔 사본을 바로 보이고, 새 그림은 뒤에서 받아 바꿔 둔다.
  //  화면을 다시 그릴 때마다 서버에 물어보느라 그림이 비었다가 들어오는(반짝이는) 것을 막는다(2026-11-10). note/ 그림도 같은 주소라 함께 다룬다
  if (req.destination === 'image') {
    e.respondWith(caches.open(CACHE).then(c => c.match(req, { ignoreSearch: true }).then(hit => {
      const net = fetch(req).then(res => { if (res.ok) c.put(req, res.clone()); return res; });
      if (hit) { e.waitUntil(net.catch(() => {})); return hit; }
      return net;
    })));
    return;
  }
  // 세 앱이 함께 쓰는 메뉴 파일은 note/에 있어도 이 앱의 사본으로 열 수 있게 한다.
  const sharedPlaces = req.destination === 'script' && url.pathname === new URL('../note/places.js', location).pathname;
  if (!sharedPlaces && !url.pathname.startsWith(new URL('./', location).pathname)) return;
  // GitHub Pages가 파일을 10분 동안 그대로 쓰라고 해도, 서버에 바뀌었는지 늘 물어본다(바뀌지 않았으면 확인만 하고 끝난다).
  //  화면 주소 요청(navigate)에는 옵션을 붙일 수 없어서 주소로 새 요청을 만든다 (코이데와 같다)
  e.respondWith(fetch(new Request(req.url, { cache: 'no-cache', credentials: 'same-origin' })).then(res => {
    if (res.ok) { const copy = res.clone(); caches.open(CACHE).then(c => c.put(req, copy)); }
    return res;
  // 실패하면 남겨 둔 사본. 사본이 없을 때 화면 주소만 첫 화면으로 대신하고, 나머지는 실패 그대로 돌려준다
  }).catch(() => caches.match(req, { ignoreSearch: true, ...(sharedPlaces ? { cacheName: CACHE } : {}) }).then(r => r || (req.mode === 'navigate' ? caches.match('./') : Response.error()))));
});
