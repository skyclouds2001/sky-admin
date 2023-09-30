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
              const { url, data = {}, headers = {} } = mapper

              // resolve response data
              let resolvedData: string | FormData
              if (typeof data === 'string') {
                resolvedData = data
              } else {
                switch (headers['Content-Type']) {
                  case 'application/x-www-form-urlencoded': {
                    const usp = new URLSearchParams()
                    Object.entries(data).forEach(([key, value]) => {
                      usp.append(key, value)
                    })
                    resolvedData = usp.toString()

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

              return cache.put(new Request(url), new Response(resolvedData))
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
