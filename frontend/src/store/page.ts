import { defineStore } from 'pinia'

const usePagesStore = defineStore('pages', {
  state() {
    return {
      /** 路径页 */
      pages: [] as Array<Record<'path', string>>,
    }
  },
})

export default usePagesStore
