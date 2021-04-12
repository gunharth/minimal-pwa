const version = "minimal-pwa-v1";

self.addEventListener('install', function(event) {
    event.waitUntil(
      caches
        .open(version) // version 1
        .then((cache) =>
          cache.addAll([
            "index.html",
            "icon196.png",
            "icon512.png",
            "manifest.webmanifest",
          ])
        )
    );
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
      caches
        .open(version)
        .then(function (cache) {
          return cache.match(event.request);
        })
        .then(function (response) {
          return response || fetch(event.request);
        })
    );
});
