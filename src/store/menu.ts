import { defineStore } from 'pinia'

export const useMenuStore = defineStore('menu', {
  state() {
    return {
      isCollapse: false,
    }
  },
})
