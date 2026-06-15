const CACHE_VERSION = 'v1.0.4';
const CACHE_NAME = `openrights-sl-${CACHE_VERSION}`;

const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './recommender.html',
  './generator.html',
  './comparison.html',
  './about.html',
  './chatbot.html',
  './scanner.html',
  './analyzer.html',
  './registry.html',
  './dashboard.html',
  './batch.html',
  './profile.html',
  './privacy.html',
  './presentation.html',
  './404.html',
  './offline.html',
  './css/style.css',
  './js/utils.js',
  './js/i18n.js',
  './js/recommender.js',
  './js/generator.js',
  './js/chat.js',
  './js/analyzer.js',
  './js/registry.js',
  './js/dashboard.js',
  './js/batch.js',
  './data/licenses.json',
  './manifest.json'
];

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(ASSETS_TO_CACHE))
      .catch((err) => console.warn('Cache install error:', err))
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames
          .filter(name =>
            name.startsWith('openrights-sl-') &&
            name !== CACHE_NAME
          )
          .map(name => {
            console.log('Deleting old cache:', name);
            return caches.delete(name);
          })
      );
    }).then(() => {
      return self.clients.claim();
    })
  );
});

self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  if (event.request.method !== 'GET') return;

  // Network first for HTML pages
  if (event.request.destination === 'document') {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, clone);
          });
          return response;
        })
        .catch(() => {
          return caches.match(event.request)
            .then(cached => cached || caches.match('./offline.html'));
        })
    );
    return;
  }

  // Network first for JS, CSS, JSON (ensures fresh files on navigation)
  if (event.request.destination === 'script' ||
    event.request.destination === 'style' ||
    url.pathname.endsWith('.json')) {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
          return response;
        })
        .catch(() => caches.match(event.request)
          .then(cached => cached || caches.match('./offline.html'))
        )
    );
    return;
  }

  // Network only for API calls
  if (url.hostname === 'api.groq.com' ||
    url.hostname === 'api.jsonbin.io' ||
    url.hostname === 'api.github.com') {
    event.respondWith(
      fetch(event.request).catch(() => {
        return new Response(
          JSON.stringify({
            error: 'You are offline. This feature requires internet.'
          }),
          {
            headers: {
              'Content-Type': 'application/json'
            }
          }
        );
      })
    );
    return;
  }

  // Default: cache first for everything else
  event.respondWith(
    caches.match(event.request)
      .then(cached => cached || fetch(event.request))
      .catch(() => caches.match('./offline.html'))
  );
});
