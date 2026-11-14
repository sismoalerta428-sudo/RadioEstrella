/* Radio Estrella - service worker
   Guarda una copia de la app para que abra rápido y aunque falle el internet.
   Siempre intenta primero la versión nueva. La música NO se guarda: va en vivo. */
const CACHE = 'radioestrella-v1';
const BASE = ['./', 'index.html', 'manifest.json', 'icon-192.png'];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(BASE)).catch(() => {}));
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((ks) => Promise.all(ks.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

/* Primero internet; si falla, la copia guardada. Solo archivos de este mismo sitio
   (la música, YouTube y la base de datos son de otros sitios y no se tocan). */
self.addEventListener('fetch', (e) => {
  const r = e.request;
  if (r.method !== 'GET' || new URL(r.url).origin !== self.location.origin) return;
  e.respondWith(
    fetch(r)
      .then((res) => {
        if (res && res.ok && res.status === 200) {
          const copia = res.clone();
          caches.open(CACHE).then((c) => c.put(r, copia)).catch(() => {});
        }
        return res;
      })
      .catch(() => caches.match(r).then((x) => x || caches.match('index.html')))
  );
});
