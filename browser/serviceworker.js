/* eslint-disable no-undef */

const staticCacheName = 'pages-cache-v1'

self.addEventListener('install', event => {
  // this is a workaround to prevent a chromium bug from throwing an error https://bugs.chromium.org/p/chromium/issues/detail?id=823392
  if (event.request && event.request.cache === 'only-if-cached' && event.request.mode !== 'same-origin') {
    return
  }
  self.skipWaiting()
  event.waitUntil(
    caches.open(staticCacheName)
      .then(cache => cache.addAll(serviceWorkerOption.assets))
  )
})

self.addEventListener('fetch', event => {
  // see comment on line 6
  if (event.request && event.request.cache === 'only-if-cached' && event.request.mode !== 'same-origin') {
    return
  }

  if (event.request && event.request.url === `${self.location.origin}/sw/checkForNewVersion`) {
    event.respondWith(
      isThereANewVersion().then(newVersion => {
        const responseBody = new Blob([JSON.stringify({newVersion})], {type : 'application/json'})
        return new Response(responseBody)
      })
    )
    return
  }

  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) return response
        return fetch(event.request.clone())

        /* Later on, if we want to cache responses from the apis, it would happen here
         .then(response => {
           // TODO - Respond with custom 404 page
           return caches.open(staticCacheName).then(cache => {
             cache.put(event.request.url, response.clone())
             return response
           })
         })
        */

      })
      .catch(error => {
        // TODO - Respond with custom offline page
        console.error('Network request error ', error)
        throw error
      })
  )
})

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames =>
      Promise.all(
        cacheNames.map(cacheName => {
          if (!serviceWorkerOption.assets.includes(cacheName)) {
            return caches.delete(cacheName)
          }
        })
      )
    )
  )
})

const currentVersion = serviceWorkerOption.assets
  .find(asset => asset.startsWith('/assets/index.'))
  .match(/^\/assets\/index\.(.+?)\.js$/)[1]

function isThereANewVersion() {
  return fetch('/focus')
    .then(response => response.text())
    .then(html => {
      const matches = html.match(/assets\/index\.(.+?)\.js/)
      if (!matches) {
        console.error('Unable to check new version, html does not have link to assets/index', html)
        return false
      }
      const latestVersion = matches[1]
      return latestVersion !== currentVersion
    })
}
