// The files we want to cache
var CACHE_NAME = 'ravi-cache-v1';
var urlsToCache = [
  'index.html',
  'sw.js',
  'sw-init.js',
  'js/app.js',
  'js/md-data-table.js',
  'js/data3.js',
  'js/data6.js',
  'css/md-data-table.css',
  'js/import/angular-material.min.css',
  'js/import/angular.min.js',
  'js/import/angular-animate.min.js',
  'js/import/angular-aria.min.js',
  'js/import/angular-messages.min.js',
  'js/import/angular-material.min.js',
  'js/import/jquery-2.2.1.min.js',
  'icons/ic_signal_wifi_4_bar_white_24px.svg',
  'icons/ic_signal_wifi_off_white_24px.svg'
];

self.addEventListener('install', function(event) {
  console.log('I am in install \n');
  console.log(event);
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('active', function(event) {
  console.log('I am in activate');
  var cacheWhitelist = ['my-site-cache-v1'];
  console.log(event);
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', function(event) {
  console.log('I am in fetch');
  console.log(event);
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Cache hit - return response
        console.log("Returning cached page");
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});
