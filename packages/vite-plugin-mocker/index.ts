import fs from 'node:fs'
import type { Plugin } from 'vite'

const Mocker = (mappers: string = 'mappers.json'): Plugin => {
  return {
    name: 'vite-plugin-mocker',
    transformIndexHtml: {
      order: 'pre',
      handler: () => [
        {
          tag: 'script',
          attrs: {
            type: 'module',
            src: '/client.ts',
          },
          children: '',
          injectTo: 'head-prepend',
        },
      ],
    },
    configureServer: (server) => {
      server.middlewares.use((req, res, next) => {
        if (req.url === '/mappers.json') {
          res.write(fs.readFileSync(mappers))
          res.end()
        }
        next()
      })
    },
  }
}

export default Mocker
