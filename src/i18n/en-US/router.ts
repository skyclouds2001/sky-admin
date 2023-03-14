const router = {
  '/': 'Home',
  '/table': 'Table',
  '/table/base': 'Base Table',
  '/form': 'Form',
  '/form/base': 'Base Form',
  '/chart': 'Chart',
  '/chart/bar': 'Bar Chart',
  '/chart/line': 'line Chart',
  '/chart/pie': 'Pie Chart',
  '/chart/scatter': 'Scatter Chart',
  '/route': 'NestMenu',
  '/route/1': 'NestMenu-1',
  '/route/2': 'NestMenu-2',
  '/route/2/1': 'NestMenu-2-1',
  '/route/2/2': 'NestMenu-2-2',
  '/route/2/2/1': 'NestMenu-2-2-1',
  '/route/2/2/2': 'NestMenu-2-2-2',
  '/route/2/2/3': 'NestMenu-2-2-3',
  '/route/2/3': 'NestMenu-2-3',
  '/route/3': 'NestMenu-3',
  '/docs': 'Docs',
  '/docs/word-preview': 'Word Preview',
  '/docs/excel-preview': 'Excel Preview',
  '/docs/ppt-preview': 'PPT Preview',
  '/docs/pdf-preview': 'PDF Preview',
  '/feature': 'Feature',
  '/feature/bar-code': 'Bar Code',
  '/feature/qrcode': 'QRCode',
  '/feature/image-editor': 'Image Editor',
  '/feature/encode-decode': 'Encode',
  '/feature/encrypt-decrypt': 'Crypto',
  '/link': 'Link',
  '/link/github': 'GitHub (External Link)',
  '/link/juejin': 'JueJin (External Link)',
  '/link/vite': 'Vite (Internal Link)',
  '/link/vue': 'Vue (Internal Link)',
  '/link/:to': 'Internal Link',
  '/link/https%3A%2F%2Fcn': {
    vitejs: {
      'dev%2F': 'Vite',
    },
    vuejs: {
      'org%2F': 'Vue',
    },
  },
  '/about': 'About',
}

export default router
