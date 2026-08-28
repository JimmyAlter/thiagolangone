/* Offline shell for the Organizador app. Scope: /app/ */
const VERSION = 'organizador-v1';
const SHELL = [
  '/app/',
  '/app/manifest.webmanifest',
  '/app/icons/icon-192.png',
  '/app/icons/apple-touch-icon.png',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(VERSION).then((cache) => cache.addAll(SHELL)).catch(() => undefined)
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((key) => key !== VERSION).map((key) => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('message', (event) => {
  if (event.data?.type === 'SKIP_WAITING') self.skipWaiting();
});

/** Navigations: fresh when online, cached shell when not. */
async function handleNavigation(request) {
  try {
    const response = await fetch(request);
    const cache = await caches.open(VERSION);
    cache.put('/app/', response.clone());
    return response;
  } catch {
    const cached = (await caches.match('/app/')) || (await caches.match('/app/index.html'));
    return cached || Response.error();
  }
}

/** Hashed build assets never change under the same URL, so cache wins. */
async function cacheFirst(request) {
  const cached = await caches.match(request);
  if (cached) return cached;
  const response = await fetch(request);
  if (response.ok) {
    const cache = await caches.open(VERSION);
    cache.put(request, response.clone());
  }
  return response;
}

/** Everything else: serve cache immediately, refresh it in the background. */
async function staleWhileRevalidate(request) {
  const cached = await caches.match(request);
  const network = fetch(request)
    .then(async (response) => {
      if (response.ok) {
        const cache = await caches.open(VERSION);
        cache.put(request, response.clone());
      }
      return response;
    })
    .catch(() => cached);
  return cached || network;
}

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  if (request.mode === 'navigate') {
    event.respondWith(handleNavigation(request));
    return;
  }
  if (url.pathname.startsWith('/assets/')) {
    event.respondWith(cacheFirst(request));
    return;
  }
  if (url.pathname.startsWith('/app/')) {
    event.respondWith(staleWhileRevalidate(request));
  }
});
