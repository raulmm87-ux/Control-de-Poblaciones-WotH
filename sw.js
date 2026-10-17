/* Service worker DESACTIVADOR (diagnóstico F4): borra las cachés y se da de baja.
   No hay manejador fetch: todo va directo a la red. No toca localStorage (los datos no se tocan).
   Versión de publicación: woth-1.0.0-f4b. Para volver al service worker normal, restaurar el sw.js de woth-1.0.0-f4a. */
const CACHE = 'woth-1.0.0-f4b';

self.addEventListener('install', () => self.skipWaiting());

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(ks => Promise.all(ks.map(k => caches.delete(k))))
      .then(() => self.registration.unregister())
  );
});
