import type { Mapper } from './types'

declare const self: ServiceWorkerGlobalScope

self.addEventListener('install', (e) => {
  self.skipWaiting()

  e.waitUntil(
    fetch('/mappers.json')
      .then((data) => data.json())
      .then((mappers: Mapper[]) =>
        self.caches.open('mappers').then((cache) =>
          Promise.all(
            mappers.map((mapper) => {
              return cache.put(new Request(mapper.url), new Response(JSON.stringify(mapper.data ?? {})))
            })
          )
        )
      )
  )
})

self.addEventListener('activate', (e) => {
  e.waitUntil(self.clients.claim())
})

self.addEventListener('fetch', (e) => {
  e.respondWith(
    self.caches.open('mappers').then((cache) =>
      cache.match(e.request).then((response) => {
        return response ?? fetch(e.request)
      })
    )
  )
})
