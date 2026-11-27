// Retire the previous caching worker. Do not intercept requests.
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    for (const key of await caches.keys()) {
      if (/^(portfolio|static|dynamic|pages)-v[0-9]+$/.test(key) || key === 'analytics-queue') await caches.delete(key);
    }
    await self.registration.unregister();
    await self.clients.claim();
  })());
});
