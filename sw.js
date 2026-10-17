/* Service worker · red primero, caché como respaldo sin conexión.
   Sube el número de versión en cada publicación para renovar la caché. */
const CACHE = 'woth-1.0.0-f4a';
const CORE = ['./', 'index.html', 'supabase.js', 'manifest.webmanifest'];
const ICONS = ['icons/icon-192.png', 'icons/icon-512.png', 'icons/icon-maskable-512.png', 'icons/apple-touch-icon.png'];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE)
      .then(c => c.addAll(CORE).then(() => Promise.all(ICONS.map(u => c.add(u).catch(() => {})))))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const r = e.request;
  if (r.method !== 'GET' || new URL(r.url).origin !== location.origin) return; // solo archivos propios
  e.respondWith(
    fetch(r)
      .then(res => {
        // Safari/iOS rechaza (pantalla en blanco) las respuestas redirigidas servidas por el service worker:
        // se reconstruye la respuesta sin la marca de redirección.
        const out = res.redirected
          ? new Response(res.body, { status: res.status, statusText: res.statusText, headers: res.headers })
          : res;
        if (out.ok) { const cp = out.clone(); caches.open(CACHE).then(c => c.put(r, cp)); }
        return out;
      })
      .catch(() => caches.match(r, { ignoreSearch: true }).then(m => m || (r.mode === 'navigate' ? caches.match('index.html') : Response.error())))
  );
});
