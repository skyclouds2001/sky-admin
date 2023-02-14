import { createRouter, createWebHistory } from 'vue-router'
import { pick } from 'lodash-es'
import { useTabsStore, usePagesStore, type Tab, type Page } from '@/store'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    // 首页
    {
      name: '首页',
      path: '/',
      component: () => import('@/views/HomePage.vue'),
    },

    // 嵌套菜单
    {
      name: '嵌套菜单-1',
      path: '/route/1',
      component: () => import('@/views/route/RouteFirst.vue'),
    },
    {
      name: '嵌套菜单-2',
      path: '/route/2',
      component: () => import('@/views/route/RouteSecond.vue'),
      children: [
        {
          name: '嵌套菜单-2-1',
          path: '/route/2/1',
          component: () => import('@/views/route/RouteSecondFirst.vue'),
        },
        {
          name: '嵌套菜单-2-2',
          path: '/route/2/2',
          component: () => import('@/views/route/RouteSecondSecond.vue'),
          children: [
            {
              name: '嵌套菜单-2-2-1',
              path: '/route/2/2/1',
              component: () => import('@/views/route/RouteSecondSecondFirst.vue'),
            },
            {
              name: '嵌套菜单-2-2-2',
              path: '/route/2/2/2',
              component: () => import('@/views/route/RouteSecondSecondSecond.vue'),
            },
            {
              name: '嵌套菜单-2-2-3',
              path: '/route/2/2/3',
              component: () => import('@/views/route/RouteSecondSecondThird.vue'),
            },
          ],
        },
        {
          name: '嵌套菜单-2-3',
          path: '/route/2/3',
          component: () => import('@/views/route/RouteSecondThird.vue'),
        },
      ],
    },
    {
      name: '嵌套菜单-3',
      path: '/route/3',
      component: () => import('@/views/route/RouteThird.vue'),
    },

    // 文档
    {
      name: '文档',
      path: '/docs',
      redirect: '/docs/word-preview',
      children: [
        {
          name: 'Word 预览',
          path: '/docs/word-preview',
          component: () => import('@/views/docs/WordPreview.vue'),
        },
        {
          name: 'Excel 预览',
          path: '/docs/excel-preview',
          component: () => import('@/views/docs/ExcelPreview.vue'),
        },
        {
          name: 'PPT 预览',
          path: '/docs/ppt-preview',
          component: () => import('@/views/docs/PPTPreview.vue'),
        },
        {
          name: 'PDF 预览',
          path: '/docs/pdf-preview',
          component: () => import('@/views/docs/PDFPreview.vue'),
        },
      ],
    },

    // 关于
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
