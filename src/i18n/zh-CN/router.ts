const router = {
  '/': '首页',
  '/table': '表格',
  '/table/base': '基础表格',
  '/form': '表单',
  '/form/base': '基础表单',
  '/chart': '图表',
  '/chart/bar': '柱状图',
  '/chart/line': '折线图',
  '/chart/pie': '饼图',
  '/chart/scatter': '散点图',
  '/route': '嵌套菜单',
  '/route/1': '嵌套菜单-1',
  '/route/2': '嵌套菜单-2',
  '/route/2/1': '嵌套菜单-2-1',
  '/route/2/2': '嵌套菜单-2-2',
  '/route/2/2/1': '嵌套菜单-2-2-1',
  '/route/2/2/2': '嵌套菜单-2-2-2',
  '/route/2/2/3': '嵌套菜单-2-2-3',
  '/route/2/3': '嵌套菜单-2-3',
  '/route/3': '嵌套菜单-3',
  '/docs': '文档',
  '/docs/word-preview': 'Word 预览',
  '/docs/excel-preview': 'Excel 预览',
  '/docs/ppt-preview': 'PPT 预览',
  '/docs/pdf-preview': 'PDF 预览',
  '/feature': '功能',
  '/feature/bar-code': '条形码',
  '/feature/qrcode': '二维码',
  '/feature/image-editor': '图片编辑器',
  '/feature/encode-decode': '编码',
  '/feature/encrypt-decrypt': '密码',
  '/feature/code-highlight': '代码高亮',
  '/feature/camera-record': '视频录制',
  '/feature/screen-record': '屏幕录制',
  '/error': '异常',
  '/error/403': '403',
  '/error/404': '404',
  '/link': '链接',
  '/link/github': 'GitHub (外链)',
  '/link/juejin': '掘金 (外链)',
  '/link/vite': 'Vite (内链)',
  '/link/vue': 'Vue (内链)',
  '/link/:to': '内链',
  '/link/https%3A%2F%2Fcn': {
    vitejs: {
      'dev%2F': 'Vite',
    },
    vuejs: {
      'org%2F': 'Vue',
    },
  },
  '/about': '关于',
}

export default router
