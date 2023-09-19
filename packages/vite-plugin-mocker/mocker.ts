import type { Mapper } from './types'

declare const self: ServiceWorkerGlobalScope

const mappers = new Map<Request, Response>()

self.addEventListener('install', (e) => {
  e.waitUntil(
    fetch('/mappers.json')
      .then((data) => data.json())
      .then((mappers: Mapper[]) =>
        self.caches.open('mappers').then((cache) => {
          return Promise.all(
            mappers.map((mapper) => {
              return cache.put(new Request(mapper.url), new Response(JSON.stringify(mapper.data)))
            })
          )
        })
      )
  )
})

self.addEventListener('activate', (e) => {
  e.waitUntil(self.clients.claim())
})

self.addEventListener('fetch', (e) => {
  if (mappers.has(e.request)) {
    e.respondWith(Response.json(mappers.get(e.request)))
  }
})
