const CACHE_NAME = 'pharma-stock-v2';
const ASSETS = [
    './',
    './index.html',
    './manifest.json',
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css',
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js',
    'https://unpkg.com/dexie/dist/dexie.js',
    'https://unpkg.com/html5-qrcode'
];

self.addEventListener('install', (e) => {
    e.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS)));
});

self.addEventListener('fetch', (e) => {
    if (e.request.url.includes('script.google.com')) {
        e.respondWith(fetch(e.request));
    } else {
        e.respondWith(caches.match(e.request).then((r) => r || fetch(e.request)));
    }
});