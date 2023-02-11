import { defineStore } from 'pinia'

interface Tab {
  name: string
  path: string
}

export const useTabsStore = defineStore('tabs', {
  state() {
    return {
      tabs: [
        {
          name: '首页',
          path: '/home',
        },
      ] as Tab[],
    }
  },
})
