
/**
 * copied from https://developers.google.com/web/ilt/pwa/caching-files-with-service-worker (2017-12-13)
 */
self.addEventListener('fetch', function (event) {
    var path = new URL(event.request.url).pathname;
    if(path.startsWith('/location')){
        event.respondWith(
            caches.open('files').then(function (cache) {
                console.log('[SW] handle request event', event.request);            
                return cache.match(event.request).then(function (response) {
                    if (response) {
                        console.log("[SW] serve data from cache...", response);
                    } 
                    return response || fetch(event.request).then(function (response) {
                        console.log("[SW] load data from network...")                    
                        return response;
                    });
                });
            })
        );
    }else if(path.startsWith('/cache')){
        var url = new URL(event.request.url);
        url.pathname = path.slice(6); // removes "/cache" prefix     
        event.respondWith(
            caches.open('cache').then(function (cache) {
                console.log('[SW-Cache] handle request event', url);            
                return cache.match(url).then(function (response) {
                    if (response) {
                        console.log("[SW-Cache] serve data from cache...", response);
                    } 
                    return response || fetch(url).then(function (response) {
                        console.log("[SW-Cache] load data from network and add data to cache...")                    
                        cache.put(url, response.clone());
                        return response;
                    });
                });
            })
        );
    }
});
