import type { Mapper } from './types'

declare const self: ServiceWorkerGlobalScope

const CACHE_NAME = 'mappers'

self.addEventListener('install', (e) => {
  e.waitUntil(self.skipWaiting())

  e.waitUntil(self.registration.navigationPreload.enable())

  e.waitUntil(
    fetch('/mappers.json')
      .then((data) => data.json())
      .then((mappers: Mapper[]) =>
        self.caches.open(CACHE_NAME).then((cache) =>
          Promise.all(
            mappers.map((mapper) => {
              const { url, method = 'GET', data = {}, headers = {} } = mapper

              // resolve response data
              let resolvedData: string | FormData | URLSearchParams
              if (typeof data === 'string') {
                resolvedData = data
              } else {
                switch (headers['Content-Type']) {
                  case 'application/x-www-form-urlencoded': {
                    const usp = new URLSearchParams()
                    Object.entries(data).forEach(([key, value]) => {
                      usp.append(key, value)
                    })
                    resolvedData = usp

                    break
                  }
                  case 'application/json': {
                    resolvedData = JSON.stringify(data)

                    break
                  }
                  case 'multipart/form-data': {
                    const fd = new FormData()
                    Object.entries(data).forEach(([key, value]) => {
                      if (Array.isArray(value)) {
                        value.forEach((v) => {
                          fd.append(key, v)
                        })
                      } else {
                        fd.append(key, value)
                      }
                    })
                    resolvedData = fd

                    break
                  }
                  case 'text/plain': {
                    resolvedData = String(data)

                    break
                  }
                  default: {
                    resolvedData = String(data)

                    break
                  }
                }
              }

              // generate headers
              const h = new Headers()
              Object.entries(headers).forEach(([key, value]) => {
                h.append(key, value)
              })

              return cache.put(
                new Request(url, {
                  method,
                }),
                new Response(resolvedData, {
                  headers: h,
                })
              )
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
    self.caches
      .match(e.request, {
        cacheName: CACHE_NAME,
      })
      .then(
        (res) =>
          res ??
          fetch(e.request).then((res) =>
            self.caches.open(CACHE_NAME).then((cache) => {
              cache.put(e.request, res)

              return res
            })
          )
      )
  )
})

self.registration.addEventListener('updatefound', () => {
  self.registration.active != null && self.registration.update()
})
