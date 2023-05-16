import { createApp } from 'vue'
import App from '@/App.vue'
import router from '@/router'
import store from '@/store'
import i18n from '@/i18n'
import '@/style/global.css'
import '@/style/mode.scss'

createApp(App).use(router).use(store).use(i18n).mount('#app')
