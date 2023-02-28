import { defineStore } from 'pinia'

/**
 * 标签页数据结构
 */
export interface Tab {
  /** 页面名称 */
  name: string
  /** 页面路径 */
  path: string
}

const useTabsStore = defineStore('tabs', {
  state() {
    return {
      /** 标签页 */
      tabs: [
        {
          name: '首页',
          path: '/',
        },
      ] as Tab[],
      /** 当前标签页 */
      currentTab: '/',
    }
  },
})

export default useTabsStore
