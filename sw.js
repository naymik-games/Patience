var cacheName = 'Patience v.05';
var filesToCache = [
  '/',
  '/index.html',
  '/game.js',
  '/phaser.min.js',



  '/scenes/preload.js',
  '/scenes/startGame.js',
  '/scenes/gameOver.js',
  '/scenes/pauseGame.js',
  '/scenes/UI.js',

  '/assets/fonts/topaz.png',
  '/assets/fonts/topaz.xml',

  '/classes/klondike.js',
  '/classes/settings.js',
  '/classes/yukon.js',
  '/classes/canfield.js',
  '/classes/acesup.js',
  '/classes/carGame.js',


  '/assets/sprites/blank.png',



  '/assets/sprites/icons.png',

  '/assets/sprites/cards_largeindex.png',
  '/assets/sprites/cards_modern.png',
  '/assets/sprites/cards_sixties_2.png',
  '/assets/sprites/cards_simple.png',
  '/assets/sprites/cards_black_simple.png',
  '/assets/sprites/cards_real.png',
  '/assets/sprites/cards_apollo.png',
  '/assets/sprites/cards_civ.png',
  '/assets/sprites/cards_classic.png',
  '/assets/sprites/backs.png',
  //'https://cdn.jsdelivr.net/gh/photonstorm/phaser@3.10.1/dist/phaser.min.js'
];
self.addEventListener('install', function (event) {
  console.log('sw install');
  event.waitUntil(
    caches.open(cacheName).then(function (cache) {
      console.log('sw caching files');
      return cache.addAll(filesToCache);
    }).catch(function (err) {
      console.log(err);
    })
  );
});

self.addEventListener('fetch', (event) => {
  console.log('sw fetch');
  console.log(event.request.url);
  event.respondWith(
    caches.match(event.request).then(function (response) {
      return response || fetch(event.request);
    }).catch(function (error) {
      console.log(error);
    })
  );
});

self.addEventListener('activate', function (event) {
  console.log('sw activate');
  event.waitUntil(
    caches.keys().then(function (keyList) {
      return Promise.all(keyList.map(function (key) {
        if (key !== cacheName) {
          console.log('sw removing old cache', key);
          return caches.delete(key);
        }
      }));
    })
  );
});