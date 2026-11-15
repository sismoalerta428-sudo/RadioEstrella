// Radio Estrella: guarda la página para abrir más rápido. La música y los datos siempre van en vivo.
const V = "radio-estrella-v1";
const SHELL = ["./", "index.html", "manifest.json", "icon-192.png", "icon-512.png", "apple-touch-icon.png"];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(V).then((c) => c.addAll(SHELL)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys()
      .then((ks) => Promise.all(ks.filter((k) => k !== V).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});
self.addEventListener("fetch", (e) => {
  const u = new URL(e.request.url);
  if (e.request.method !== "GET" || u.origin !== location.origin) return; // Supabase, YouTube, etc.: siempre en vivo
  if (u.pathname.includes("/admin/")) return;                               // el panel del DJ nunca se guarda
  e.respondWith(
    fetch(e.request)
      .then((r) => { const c = r.clone(); caches.open(V).then((x) => x.put(e.request, c)); return r; })
      .catch(() => caches.match(e.request).then((m) => m || caches.match("index.html")))
  );
});
