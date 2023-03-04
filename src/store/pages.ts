import { defineStore } from 'pinia'
import type { Page } from '@/model'

const usePagesStore = defineStore('pages', {
  state() {
    return {
      /** 路径页 */
      pages: [
        {
          name: '首页',
          path: '/',
        },
      ] as Page[],
    }
  },
})

export default usePagesStore
