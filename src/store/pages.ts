import { defineStore } from 'pinia'

export interface Page {
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
