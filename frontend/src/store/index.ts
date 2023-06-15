import { createPinia } from 'pinia'

const store = createPinia()

export default store

export { default as useMenuStore } from './menu'

export { default as usePagesStore } from './page'

export { default as useTabsStore } from './tab'
