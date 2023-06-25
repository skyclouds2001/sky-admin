import { createPinia } from 'pinia'

const store = createPinia()

export default store

export { default as usePagesStore } from './page'

export { default as useTabsStore } from './tab'

export const SettingDrawerKey = Symbol('setting')

export const MenuCollapseKey = Symbol('menu')
