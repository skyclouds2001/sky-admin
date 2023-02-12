import { createRouter, createWebHistory } from 'vue-router'
import { pick } from 'lodash-es'
import { useTabsStore, usePagesStore, type Tab, type Page } from '@/store'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      name: '首页',
      path: '/',
      component: () => import('@/views/HomePage.vue'),
    },
    {
      name: '嵌套菜单',
      path: '/route/:id*',
      component: () => import('@/views/RoutePage.vue'),
    },
    {
      name: '预览文档',
      path: '/docs',
      redirect: '/docs/word-preview',
      children: [
        {
          name: '预览 Word',
          path: '/docs/word-preview',
          component: () => import('@/views/docs/WordPreview.vue'),
        },
        {
          name: '预览 Excel',
          path: '/docs/excel-preview',
          component: () => import('@/views/docs/ExcelPreview.vue'),
        },
        {
          name: '预览 PPT',
          path: '/docs/ppt-preview',
          component: () => import('@/views/docs/PPTPreview.vue'),
        },
        {
          name: '预览 PDF',
          path: '/docs/pdf-preview',
          component: () => import('@/views/docs/PDFPreview.vue'),
        },
      ],
    },
    {
      name: '关于',
      path: '/about',
      component: () => import('@/views/AboutPage.vue'),
    },
  ],
})

router.beforeEach((to) => {
  const route = pick(to, ['path', 'name'])
  const matched = to.matched.map((v) => pick(v, ['path', 'name']) as Page)

  // 处理 route 路由名称
  if (/\/route/.test(route.path)) {
    route.name = '嵌套菜单'
    route.name += Array.isArray(to.params.id) ? to.params.id.reduce((pre, cur) => pre + '-' + cur, '') : ''
  }

  // 自动修改 Tab
  const tabsStore = useTabsStore()
  tabsStore.$patch((state) => {
    if (tabsStore.tabs.findIndex((v) => v.path === to.path) === -1) {
      state.tabs.push(route as Tab)
    }
    state.currentTab = to.path
  })

  // 自动更新 Page
  const pagesStore = usePagesStore()
  pagesStore.$patch((state) => {
    state.pages = matched
    if (route.path !== '/') {
      state.pages.unshift({
        name: '首页',
        path: '/',
      })
    }
  })
})

export default router
