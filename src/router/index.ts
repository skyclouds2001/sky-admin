import { createRouter, createWebHistory } from 'vue-router'
import { pick } from 'lodash-es'
import { useTabsStore, usePagesStore, type Tab, type Page } from '@/store'
import { openNewPageInNewTab } from '@/util'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    // 首页
    {
      name: '首页',
      path: '/',
      component: () => import('@/views/HomePage.vue'),
    },

    // 图表
    {
      name: '图表',
      path: '/chart',
      redirect: '/chart/bar',
      children: [
        {
          name: '柱状图',
          path: '/chart/bar',
          component: () => import('@/views/chart/BarChart.vue'),
        },
        {
          name: '饼图',
          path: '/chart/pie',
          component: () => import('@/views/chart/PieChart.vue'),
        },
      ],
    },

    // 嵌套菜单
    {
      name: '嵌套菜单',
      path: '/route',
      children: [
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
      ],
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
  // 检测是否为外链
  if (to.path.includes('http')) {
    openNewPageInNewTab(to.path.slice(1))
    return false
  }

  // 自动修改 tabsStore 内的 tabs 数据
  const tabsStore = useTabsStore()
  tabsStore.$patch((state) => {
    if (tabsStore.tabs.findIndex((v) => v.path === to.path) === -1) {
      state.tabs.push(pick(to, ['path', 'name']) as Tab)
    }
    state.currentTab = to.path
  })

  // 自动更新 pagesStore 内的 pages 数据
  const pagesStore = usePagesStore()
  pagesStore.$patch((state) => {
    state.pages = to.matched.map((v) => pick(v, ['path', 'name']) as Page)
    if (to.path !== '/') {
      state.pages.unshift({
        name: '首页',
        path: '/',
      })
    }
  })
})

export default router
