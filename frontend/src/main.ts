import { createApp } from 'vue'
import App from '@/App.vue'
import router from '@/router'
import store from '@/store'
import i18n from '@/i18n'
import '@/style/global.css'
import '@/style/mode.css'

const app = createApp(App)

app.config.performance = true

app.use(router)

app.use(store)

app.use(i18n)

app.mount('#app')
