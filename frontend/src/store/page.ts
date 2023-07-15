import { defineStore } from 'pinia'
import type { Page } from '@/model'

const usePagesStore = defineStore('pages', {
  state() {
    return {
      /** 路径页 */
      pages: [] as Page[],
    }
  },
})

export default usePagesStore
