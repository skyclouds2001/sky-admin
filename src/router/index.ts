import { createRouter, createWebHistory } from 'vue-router'
import { pick } from 'lodash-es'
import { useTabsStore, usePagesStore, type Tab, type Page } from '@/store'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      name: '首页',
      path: '/home',
      component: () => import('@/views/HomePage.vue'),
      alias: '/',
    },
    {
      name: '嵌套菜单',
      path: '/route',
      children: [
        {
          name: 'route-1',
          path: '/route/1',
          component: () => import(''),
        },
        {
          name: 'route-2',
          path: '/route/2',
          component: () => import(''),
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
  const tabsStore = useTabsStore()
  if (tabsStore.tabs.findIndex((v) => v.path === to.path) === -1) {
    tabsStore.$patch((state) => {
      state.tabs.push(pick(to, ['path', 'name']) as Tab)
      state.currentTab = to.path
    })
  } else {
    tabsStore.currentTab = to.path
  }
})

export default router
