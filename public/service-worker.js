// const CACHE_NAME = 'my-app-cache';
// const urlsToCache = [
//   '/',
//   '/index.html',
// //   '/styles/main.css',
// //   '/script/main.js'
// ];

// self.addEventListener('install', (e) => {
//     console.log('Service Worker installing.')
//     // Add a call to skipWaiting here if you want the new SW to activate immediately.
//     self.skipWaiting();
//   })

// self.addEventListener('activate', (e) => {
//     console.log('Service Worker activating.')
//   })

// self.addEventListener('fetch', (e) => {
//     console.log(e.request.url);
//     // e.respondWith(
//     //   caches.match(e.request).then((response) => response || fetch(e.request)),
//     // );

//     // e.waitUntil(
//     //     caches.open(CACHE_NAME)
//     //       .then((cache) => {
//     //         return cache.addAll(urlsToCache);
//     //       })
//     //   );
//   });