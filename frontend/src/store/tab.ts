import { defineStore } from 'pinia'

const useTabsStore = defineStore('tabs', {
  state() {
    return {
      /** 标签页 */
      tabs: [] as Array<Record<'path', string> & Record<'isView', boolean>>,
      /** 当前标签页 */
      currentTab: '/',
    }
  },
})

export default useTabsStore
