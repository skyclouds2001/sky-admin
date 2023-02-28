import { createI18n } from 'vue-i18n'
import { Lang } from '@/enum'
import zhCN from './zh-CN'
import enUS from './en-US'

const i18n = createI18n({
  legacy: false,
  globalInjection: false,
  locale: Lang.zhCN,
  fallbackLocale: [Lang.zhCN, Lang.enUS],
  messages: {
    'zh-CN': {
      ...zhCN,
    },
    'en-US': {
      ...enUS,
    },
  },
})

export default i18n
