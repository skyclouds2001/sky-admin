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
      name: '关于',
      path: '/about',
      component: () => import('@/views/AboutPage.vue'),
    },
  ],
})

router.beforeEach((to) => {
  const route = pick(to, ['path', 'name'])
  // 处理 route 路由名称
  if (/\/route/.test(route.path)) {
    route.name = '嵌套菜单'
    route.name += Array.isArray(to.params.id) ? to.params.id.reduce((pre, cur) => pre + '-' + cur, '') : ''
  }

  // 自动修改 Tab
  const tabsStore = useTabsStore()
  if (tabsStore.tabs.findIndex((v) => v.path === to.path) === -1) {
    tabsStore.$patch((state) => {
      state.tabs.push(route as Tab)
      state.currentTab = to.path
    })
  } else {
    tabsStore.currentTab = to.path
  }

  // 自动更新 Page
})

export default router
