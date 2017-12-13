/**
 * copied from https://developers.google.com/web/ilt/pwa/caching-files-with-service-worker (2017-12-13)
 */
self.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.open('files').then(function (cache) {
            return cache.match(event.request).then(function (response) {
                if (response) {
                    console.log("serve data fromcache...", response);
                } else {
                    console.log("serve data from network...")
                }
                return response || fetch(event.request).then(function (response) {
                    //cache.put(event.request, response.clone());
                    return response;
                });
            });
        })
    );
});
