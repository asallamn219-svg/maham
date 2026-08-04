const CACHE_NAME = 'task-manager-cache-v1';
const urlsToCache = [
  '/Al-maham/',
  '/Al-maham/index.html',
  '/Al-maham/manifest.json',
  '/Al-maham/icons/icon-192.png',
  '/Al-maham/icons/icon-512.png'
];

// تثبيت Service Worker وتخزين الملفات الأساسية
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

// تفعيل النسخة الجديدة وحذف الكاش القديم
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// استقبال طلبات الشبكة وتقديمها من الكاش إذا وجدت
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});