import { defineStore } from 'pinia'

export const useMainStore = defineStore('main', {
  state() {
    return {
      count: 0,
    }
  },
  actions: {
    increase() {
      ++this.count
    },
    decrease() {
      --this.count
    },
  },
})
