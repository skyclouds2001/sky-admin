import { type Plugin } from 'vite'
import { type Mapper } from './types'

const Mocker = (mappers: Mapper[]): Plugin => {
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
        {
          tag: 'script',
          attrs: {
            type: 'mappers',
          },
          children: JSON.stringify(mappers),
          injectTo: 'head-prepend',
        },
      ],
    },
  }
}

export default Mocker
