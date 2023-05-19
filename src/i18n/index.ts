import { createI18n } from 'vue-i18n'
import { Lang } from '@/enum'
import zh_CN from '@/locale/zh-CN'
import en_US from '@/locale/en-US'

const i18n = createI18n<[typeof zh_CN, typeof en_US], 'zh-CN' | 'en-US', false>({
  legacy: false,
  globalInjection: false,
  locale: Lang.zhCN,
  fallbackLocale: [Lang.zhCN, Lang.enUS],
  messages: {
    'zh-CN': zh_CN,
    'en-US': en_US,
  },
})

export default i18n
