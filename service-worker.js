/**
 * ============================================================
 *  Muhammad Qasim Portfolio - Optimized Service Worker
 *  Strategy: Stale-While-Revalidate for instant offline loading
 *  Version 2.0
 * ============================================================
 */

const CACHE_NAME   = 'qasim-portfolio-v4';
const STATIC_CACHE = 'qasim-static-v4';
const CDN_CACHE    = 'qasim-cdn-v4';

// ---- Core local assets to pre-cache on install ----
const LOCAL_ASSETS = [
  './',
  './index.html',
  './assets/css/style.css',
  './assets/js/script.js',
  './assets/js/animations.js',
  './assets/images/Qasim.Png',
  './assets/images/my-avatar.png',
  './assets/images/data-analysis.png',
  './assets/images/training-model.png',
  './assets/images/deployment.png',
  './assets/images/consultency.png',
  './assets/images/icon-quote.svg',
  './assets/images/logo.svg',
  './assets/images/logo-1-color.png',
  './assets/images/logo-2-color.png',
  './assets/images/logo-3-color.png',
  './assets/images/logo-4-color.png',
  './assets/images/logo-5-color.png',
  './assets/images/logo-6-color.png',
  './manifest.json'
];

// ---- External CDN domains to intercept and cache ----
const CDN_HOSTS = [
  'cdnjs.cloudflare.com',      // Three.js + tsParticles
  'cdn.jsdelivr.net',          // EmailJS
  'unpkg.com',                 // Ionicons
  'fonts.googleapis.com',      // Google Fonts CSS
  'fonts.gstatic.com',         // Google Fonts files
  'upload.wikimedia.org',      // Kaggle logo
];

// =============================================
// INSTALL: Pre-cache all critical local assets
// =============================================
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then(cache => {
        console.log('[SW] Pre-caching core local assets...');
        return cache.addAll(LOCAL_ASSETS).catch(err => {
          console.warn('[SW] Some assets could not be pre-cached:', err);
        });
      })
      .then(() => self.skipWaiting())
  );
});

// =============================================
// ACTIVATE: Remove all old caches
// =============================================
self.addEventListener('activate', event => {
  const validCaches = [CACHE_NAME, STATIC_CACHE, CDN_CACHE];
  event.waitUntil(
    caches.keys().then(cacheNames =>
      Promise.all(
        cacheNames.map(name => {
          if (!validCaches.includes(name)) {
            console.log('[SW] Deleting old cache:', name);
            return caches.delete(name);
          }
        })
      )
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

// =============================================
// FETCH: Stale-While-Revalidate for all assets
// =============================================
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  // Only handle GET requests
  if (request.method !== 'GET') return;

  // ---- Determine if this is a CDN request ----
  const isCdnRequest = CDN_HOSTS.some(host => url.hostname.includes(host));

  if (isCdnRequest) {
    // CDN: Cache-First strategy (CDN files rarely change)
    event.respondWith(
      caches.open(CDN_CACHE).then(cache =>
        cache.match(request).then(cachedRes => {
          if (cachedRes) {
            // Serve from cache instantly, update in background
            fetch(request)
              .then(netRes => {
                if (netRes && netRes.status === 200) {
                  cache.put(request, netRes.clone());
                }
              })
              .catch(() => {/* ignore network errors for CDN revalidation */});
            return cachedRes;
          }
          // Not in cache yet — fetch and cache it
          return fetch(request).then(netRes => {
            if (netRes && netRes.status === 200) {
              cache.put(request, netRes.clone());
            }
            return netRes;
          }).catch(() => {
            // If CDN totally offline, try other caches
            return caches.match(request);
          });
        })
      )
    );
    return;
  }

  // ---- Local assets: Network-First for main JS files, Stale-While-Revalidate for others ----
  if (url.origin === self.location.origin) {
    const isCoreScript = url.pathname.endsWith('/script.js') || url.pathname.endsWith('/animations.js') || url.pathname.endsWith('/style.css');

    if (isCoreScript) {
      // Network-First strategy: always fetch live updates when online, fallback to cache when offline
      event.respondWith(
        fetch(request)
          .then(netRes => {
            if (netRes && netRes.status === 200) {
              const netResClone = netRes.clone();
              caches.open(STATIC_CACHE).then(cache => cache.put(request, netResClone));
            }
            return netRes;
          })
          .catch(() => {
            return caches.match(request);
          })
      );
      return;
    }

    // Default Stale-While-Revalidate for other local assets
    event.respondWith(
      caches.open(STATIC_CACHE).then(cache =>
        cache.match(request).then(cachedRes => {
          // Revalidate in the background regardless
          const fetchPromise = fetch(request).then(netRes => {
            if (netRes && netRes.status === 200) {
              cache.put(request, netRes.clone());
            }
            return netRes;
          }).catch(() => null);

          // Serve cached immediately if available, otherwise wait for network
          if (cachedRes) {
            return cachedRes; // Instant response from cache!
          }

          return fetchPromise.then(netRes => {
            if (netRes) return netRes;
            // Totally offline + not cached → return index.html as fallback
            if (request.headers.get('accept') && request.headers.get('accept').includes('text/html')) {
              return caches.match('./index.html');
            }
          });
        })
      )
    );
    return;
  }
});
