import { ref, type Ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { locale } from 'dayjs'
import { Lang } from '@/enum'
import { useEventListener, usePreferredLang } from '@/hook'

const isLang = (lang: unknown): lang is Lang => {
  return typeof lang === 'string' && ['zh-CN', 'en-US'].includes(lang)
}

const useLang = (): {
  lang: Ref<Lang>
} => {
  const i18n = useI18n()

  const val = window.localStorage.getItem('lang')

  /**
   * 语言
   */
  const lang = ref(isLang(val) ? val : usePreferredLang())

  watch(
    lang,
    (current) => {
      switch (current) {
        case Lang.zhCN:
          i18n.locale.value = Lang.zhCN
          locale('zh-cn')
          window.localStorage.setItem('lang', Lang.zhCN)
          break
        case Lang.enUS:
          i18n.locale.value = Lang.enUS
          locale('en')
          window.localStorage.setItem('lang', Lang.enUS)
          break
      }
    },
    {
      immediate: true,
    }
  )

  useEventListener(window, 'storage', (e) => {
    if (e.key === 'lang') {
      lang.value = isLang(e.newValue) ? e.newValue : Lang.zhCN
    }
  })

  return {
    lang,
  }
}

export default useLang
