import { defineStore } from 'pinia'

export interface Tab {
  name: string
  path: string
}

export const useTabsStore = defineStore('tabs', {
  state() {
    return {
      tabs: [
        {
          name: '首页',
          path: '/',
        },
      ] as Tab[],
      currentTab: '/',
    }
  },
})
