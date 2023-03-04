import { createRouter, createWebHistory } from 'vue-router'
import type { Tab, Page } from '@/model'
import { useTabsStore, usePagesStore } from '@/store'
import { openNewPageInNewTab } from '@/util'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    // 首页
    {
      name: Symbol('/'),
      path: '/',
      component: () => import('@/views/HomePage.vue'),
      meta: { title: '首页' },
    },

    // 表单
    {
      name: Symbol('/form'),
      path: '/form',
      redirect: '/form/base',
      meta: { title: '表单' },
      children: [
        {
          name: Symbol('/form/base'),
          path: '/form/base',
          component: () => import('@/views/form/BaseForm.vue'),
          meta: { title: '基础表单' },
        },
      ],
    },

    // 图表
    {
      name: Symbol('/chart'),
      path: '/chart',
      redirect: '/chart/bar',
      meta: { title: '图表' },
      children: [
        {
          name: Symbol('/chart/bar'),
          path: '/chart/bar',
          component: () => import('@/views/chart/BarChart.vue'),
          meta: { title: '柱状图' },
        },
        {
          name: Symbol('/chart/line'),
          path: '/chart/line',
          component: () => import('@/views/chart/LineChart.vue'),
          meta: { title: '折线图' },
        },
        {
          name: Symbol('/chart/pie'),
          path: '/chart/pie',
          component: () => import('@/views/chart/PieChart.vue'),
          meta: { title: '饼图' },
        },
        {
          name: Symbol('/chart/scatter'),
          path: '/chart/scatter',
          component: () => import('@/views/chart/ScatterChart.vue'),
          meta: { title: '散点图' },
        },
      ],
    },

    // 嵌套菜单
    {
      name: Symbol('/route'),
      path: '/route',
      redirect: '/route/1',
      meta: { title: '嵌套菜单' },
      children: [
        {
          name: Symbol('/route/1'),
          path: '/route/1',
          component: () => import('@/views/route/RouteFirst.vue'),
          meta: { title: '嵌套菜单-1' },
        },
        {
          name: Symbol('/route/2'),
          path: '/route/2',
          component: () => import('@/views/route/RouteSecond.vue'),
          meta: { title: '嵌套菜单-2' },
          children: [
            {
              name: Symbol('/route/2/1'),
              path: '/route/2/1',
              component: () => import('@/views/route/RouteSecondFirst.vue'),
              meta: { title: '嵌套菜单-2-1' },
            },
            {
              name: Symbol('/route/2/2'),
              path: '/route/2/2',
              component: () => import('@/views/route/RouteSecondSecond.vue'),
              meta: { title: '嵌套菜单-2-2' },
              children: [
                {
                  name: Symbol('/route/2/2/1'),
                  path: '/route/2/2/1',
                  component: () => import('@/views/route/RouteSecondSecondFirst.vue'),
                  meta: { title: '嵌套菜单-2-2-1' },
                },
                {
                  name: Symbol('/route/2/2/2'),
                  path: '/route/2/2/2',
                  component: () => import('@/views/route/RouteSecondSecondSecond.vue'),
                  meta: { title: '嵌套菜单-2-2-2' },
                },
                {
                  name: Symbol('/route/2/2/3'),
                  path: '/route/2/2/3',
                  component: () => import('@/views/route/RouteSecondSecondThird.vue'),
                  meta: { title: '嵌套菜单-2-2-3' },
                },
              ],
            },
            {
              name: Symbol('/route/2/3'),
              path: '/route/2/3',
              component: () => import('@/views/route/RouteSecondThird.vue'),
              meta: { title: '嵌套菜单-2-3' },
            },
          ],
        },
        {
          name: Symbol('/route/3'),
          path: '/route/3',
          component: () => import('@/views/route/RouteThird.vue'),
          meta: { title: '嵌套菜单-3' },
        },
      ],
    },

    // 文档
    {
      name: Symbol('/docs'),
      path: '/docs',
      redirect: '/docs/word-preview',
      meta: { title: '文档' },
      children: [
        {
          name: Symbol('/docs/word-preview'),
          path: '/docs/word-preview',
          component: () => import('@/views/docs/WordPreview.vue'),
          meta: { title: 'Word 预览' },
        },
        {
          name: Symbol('/docs/excel-preview'),
          path: '/docs/excel-preview',
          component: () => import('@/views/docs/ExcelPreview.vue'),
          meta: { title: 'Excel 预览' },
        },
        {
          name: Symbol('/docs/ppt-preview'),
          path: '/docs/ppt-preview',
          component: () => import('@/views/docs/PPTPreview.vue'),
          meta: { title: 'PPT 预览' },
        },
        {
          name: Symbol('/docs/pdf-preview'),
          path: '/docs/pdf-preview',
          component: () => import('@/views/docs/PDFPreview.vue'),
          meta: { title: 'PDF 预览' },
        },
      ],
    },

    // 功能
    {
      name: Symbol('/feature'),
      path: '/feature',
      redirect: '/feature/bar-code',
      meta: { title: '功能' },
      children: [
        {
          name: Symbol('/feature/bar-code'),
          path: '/feature/bar-code',
          component: () => import('@/views/feature/BarCode.vue'),
          meta: { title: '条形码' },
        },
        {
          name: Symbol('/feature/qrcode'),
          path: '/feature/qrcode',
          component: () => import('@/views/feature/QrCode.vue'),
          meta: { title: '二维码' },
        },
        {
          name: Symbol('/feature/image-editor'),
          path: '/feature/image-editor',
          component: () => import('@/views/feature/ImageEditor.vue'),
          meta: { title: '图片编辑器' },
        },
      ],
    },

    // 外链
    {
      name: Symbol('/link/:to'),
      path: '/link/:to',
      component: () => import('@/views/link/LinkPage.vue'),
      meta: { title: '外链' },
    },

    // 关于
    {
      name: Symbol('/about'),
      path: '/about',
      component: () => import('@/views/AboutPage.vue'),
      meta: { title: '关于' },
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition !== null) {
      return savedPosition
    } else {
      return {
        top: 0,
        behavior: 'smooth',
      }
    }
  },
})

router.beforeEach((to) => {
  // 检测是否为外链（非内链）
  if (to.path.includes('https://')) {
    openNewPageInNewTab(to.path.slice(1))
    return false
  }

  // 自动修改 tabsStore 内的 tabs 数据
  const tabsStore = useTabsStore()
  tabsStore.$patch((state) => {
    if (tabsStore.tabs.findIndex((v) => v.path === to.path) === -1) {
      const tab: Tab = {
        name: to.meta.title as string,
        path: to.path,
      }
      state.tabs.push(tab)
    }
    state.currentTab = to.path
  })

  // 自动更新 pagesStore 内的 pages 数据
  const pagesStore = usePagesStore()
  pagesStore.$patch((state) => {
    state.pages = to.matched.map((v) => {
      const page: Page = {
        name: v.meta.title as string,
        path: v.path,
      }
      return page
    })
    if (to.path !== '/') {
      state.pages.unshift({
        name: '首页',
        path: '/',
      })
    }
  })
})

export default router
