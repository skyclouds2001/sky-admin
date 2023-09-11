import { createRouter, createWebHistory } from 'vue-router'
import { useStorage } from '@sky-fly/shooks'
import { INDEX_ROUTE } from '@/config'
import { LayoutContainer } from '@/layout'
import { usePagesStore, useTabsStore } from '@/store'
import { openPage } from '@/util'

const router = createRouter({
  history: createWebHistory(),
  routes,

  scrollBehavior: (_to, _from, savedPosition) => {
    return savedPosition != null
      ? savedPosition
      : {
          top: 0,
          left: 0,
          behavior: 'smooth',
        }
  },
})

const storage = useStorage<string>('token', {
  prefix: 'sky-admin-0.0.0',
})

router.beforeEach((to) => {
  // 检测是否为外链（非内链），若是外链则跳转打开新页面
  if (to.path.includes('/link') && to.params.mode === 'external') {
    openPage(decodeURIComponent(to.path.slice(1).split('/')[1]))
    return false
  }

  // 检测是否已登录
  if (to.path !== '/login' && storage.value === null) {
    return {
      path: '/login',
    }
  }

  return true
})

router.afterEach((to) => {
  // 登录页不执行 tab 和 page 操作
  if (to.path === '/login') return

  // 更新 tabsStore 内的 tabs 数据
  useTabsStore().$patch((state) => {
    if (state.tabs.findIndex((v) => v.path === to.path) === -1) {
      state.tabs.push({
        path: to.path,
        isView: to.meta.isView,
      })
    }
    if (state.tabs.findIndex((v) => v.path === INDEX_ROUTE) === -1) {
      state.tabs.unshift({
        path: INDEX_ROUTE,
        isView: true,
      })
    }
    state.currentTab = to.path
  })

  // 更新 pagesStore 内的 pages 数据
  usePagesStore().$patch((state) => {
    state.pages = to.matched
      .map((v) => ({
        path: v.path,
        isView: v.meta.isView,
      }))
      .filter((v) => v.path !== '/')
    if (to.path !== INDEX_ROUTE) {
      state.pages.unshift({
        path: INDEX_ROUTE,
        isView: true,
      })
    }
  })
})

export default router
