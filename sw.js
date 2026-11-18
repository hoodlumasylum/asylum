/* Self-unregistering service worker: clear caches so visitors are not stuck on the old site. */
self.addEventListener("install", function (event) {
  self.skipWaiting();
});

self.addEventListener("activate", function (event) {
  event.waitUntil((async function () {
    var keys = await caches.keys();
    await Promise.all(keys.map(function (key) { return caches.delete(key); }));
    await self.registration.unregister();
    var clients = await self.clients.matchAll({ type: "window" });
    await Promise.all(clients.map(function (client) { return client.navigate(client.url); }));
  })());
});
