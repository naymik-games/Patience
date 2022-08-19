var cacheName = 'Patience v.10';
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
  '/classes/cruel.js',
  '/classes/freecell.js',
  '/classes/golf.js',
  '/classes/scorpion.js',
  '/classes/alternations.js',
  '/classes/spiderette.js',
  '/classes/pyramid.js',
  '/classes/montecarlo.js',
  '/classes/missmilligan.js',
  '/classes/backersdozen.js',
  '/classes/fortyandeight.js',
  '/classes/carGame.js',


  '/assets/sprites/blank.png',



  '/assets/sprites/icons.png',

  '/assets/sprites/cards_largeindex.png',
  '/assets/sprites/cards_modern.png',
  '/assets/sprites/cards_sixties_2.png',



  '/assets/sprites/cards_apollo.png',
  '/assets/sprites/cards_civ.png',
  '/assets/sprites/cards_classic.png',
  '/assets/sprites/cards_draw.png',
  '/assets/sprites/cards_minimal.png',
  '/assets/sprites/cards_mobile.png',
  '/assets/sprites/cards_thin.png',
  '/assets/sprites/cards_pixeldark.png',
  '/assets/sprites/cards_windows7.png',

  '/assets/sprites/backs.png',

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