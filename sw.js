
/**
 * copied from https://developers.google.com/web/ilt/pwa/caching-files-with-service-worker (2017-12-13)
 */
self.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.open('files').then(function (cache) {
            console.log('[SW] handle request event', event.request);            
            return cache.match(event.request).then(function (response) {
                if (response) {
                    console.log("[SW] serve data fromcache...", response);
                } 
                return response || fetch(event.request).then(function (response) {
                    console.log("[SW] load data from network...")                    
                    //cache.put(event.request, response.clone());
                    return response;
                });
            });
        })
    );
});
