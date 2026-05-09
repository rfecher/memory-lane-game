const CACHE_NAME = 'memory-lane-v2'
const OLD_CACHES = ['memory-lane-v1']
// These paths are relative to the service worker's scope (/memory-lane-game/)
const APP_SHELL = ['index.html', 'manifest.json']

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL)))
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => OLD_CACHES.includes(k)).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  )
})

self.addEventListener('fetch', (event) => {
  const url = event.request.url
  // Don't cache photos — they're added by the game owner after deployment
  // and would get stuck with cached 404s
  if (url.includes('/photos/')) return
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request).then((fetchResponse) => {
        return caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, fetchResponse.clone())
          return fetchResponse
        })
      })
    })
  )
})
