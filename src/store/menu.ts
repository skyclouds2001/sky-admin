import { defineStore } from 'pinia'

const useMenuStore = defineStore('menu', {
  state() {
    return {
      isCollapse: false,
    }
  },
})

export default useMenuStore
