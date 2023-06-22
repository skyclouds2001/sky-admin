import { defineStore } from 'pinia'
import type { Tab } from '@/model'

const useTabsStore = defineStore('tabs', {
  state() {
    return {
      /** 标签页 */
      tabs: [
        {
          name: '首页',
          path: '/home',
          isView: true,
        },
      ] as Array<Tab & { isView: boolean }>,
      /** 当前标签页 */
      currentTab: '/home',
    }
  },
})

export default useTabsStore
