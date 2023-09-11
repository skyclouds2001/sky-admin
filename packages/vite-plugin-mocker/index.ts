import { type Plugin } from 'vite'

const Mocker = (): Plugin => {
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
  }
}

export default Mocker
