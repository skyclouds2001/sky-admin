import { defineStore } from 'pinia'

interface Page {
  name: string
  path: string
}

export const usePagesStore = defineStore('pages', {
  state() {
    return {
      pages: [] as Page[],
    }
  },
})
