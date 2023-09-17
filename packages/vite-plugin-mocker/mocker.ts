import { type Mapper } from './types'

const mappers = new Map<Request, Response>()

self.addEventListener('fetch', (e: FetchEvent) => {
  if (Reflect.has(mappers, e.request.url)) {
    e.respondWith(Response.json(mappers[e.request.url]))
  }
})

self.addEventListener('message', (e: MessageEvent) => {
  const data: Mapper[] = JSON.parse(e.data)

  for (const v of data) {
    mappers.set(new Request(v.url), new Response(v.data))
  }
})
