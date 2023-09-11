const mappers = Object.fromEntries([])

self.addEventListener('fetch', (e) => {
  if (Reflect.has(mappers, e.request.url)) {
    e.respondWith(Response.json(mappers[e.request.url]))
  }
})
