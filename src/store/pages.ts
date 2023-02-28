import { defineStore } from 'pinia'

/**
 * 数据结构
 */
export interface Page {
  /** 页面名称 */
  name: string
  /** 页面路径 */
  path: string
}

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
