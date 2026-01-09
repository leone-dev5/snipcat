const CACHE_VERSION = "1.0.1_initial";

self.addEventListener("install", event => {
    self.skipWaiting();

    event.waitUntil(
        caches.open(CACHE_VERSION).then(cache => {
            return cache.addAll([
               "/src/compile/cat-seed/canva/layout/canva-layout/canva-element.js",
               "/src/compile/cat-seed/canva/layout/canva-layout/position.js",
               "/src/compile/cat-seed/canva/layout/canva-layout/scroll.js",
               "/src/compile/cat-seed/canva/layout/canva-layout/screen.js",
               "/src/compile/cat-seed/canva/layout/canva-layout/size.js",
               "/src/compile/cat-seed/canva/layout/toolbars/toolbars.css",
               "/src/compile/cat-seed/canva/uploads/upload.js",
               "/src/compile/cat-seed/canva/overlay/overlay-menu/submenu.js"
            ]);
        })
    );
});

/* ====== ACTIVATE ====== */
self.addEventListener("activate", event => {
    event.waitUntil(
        caches.keys().then(keys => {
            return Promise.all(
                keys.map(key => {
                    if (key !== CACHE_VERSION) {
                        return caches.delete(key);
                    }
                })
            );
        })
    );

    self.clients.claim();
});

/* ====== FETCH ====== */
self.addEventListener("fetch", event => {
    event.respondWith(
        caches.match(event.request).then(cached => {
            return cached || fetch(event.request);
            
        })
    );
});

console.log(`Está instalado ${(CACHE_VERSION)}`);
