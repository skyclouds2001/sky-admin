import { createPinia } from 'pinia'

const store = createPinia()

export default store

export { default as usePagesStore } from './pages'

export { default as useTabsStore } from './tabs'

export { default as useMenuStore } from './menu'
