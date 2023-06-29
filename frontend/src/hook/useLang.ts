import { ref, unref, type Ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { locale } from 'dayjs'
import { Lang, isLang } from '@/enum'
import { usePreferredLanguages, useStorage } from '@skyclouds2001/vhooks'

const useLang = (): {
  lang: Ref<Lang>
} => {
  const preferredLanguage = unref(usePreferredLanguages()).at(0)

  const i18n = useI18n()

  const data = useStorage<Lang>('lang', {
    prefix: 'sky-admin-0.0.0',
  })

  /**
   * 语言
   */
  const language = ref(data.value !== null ? data.value : isLang(preferredLanguage) ? preferredLanguage : Lang.zhCN)

  watch(
    data,
    (current) => {
      switch (current) {
        case Lang.zhCN:
          i18n.locale.value = Lang.zhCN
          locale('zh-cn')
          language.value = Lang.zhCN
          break
        case Lang.enUS:
          i18n.locale.value = Lang.enUS
          locale('en')
          language.value = Lang.enUS
          break
      }
    },
    {
      immediate: true,
    }
  )

  watch(
    language,
    (current) => {
      switch (current) {
        case Lang.zhCN:
          i18n.locale.value = Lang.zhCN
          locale('zh-cn')
          data.value = Lang.zhCN
          break
        case Lang.enUS:
          i18n.locale.value = Lang.enUS
          locale('en')
          data.value = Lang.enUS
          break
      }
    },
    {
      immediate: true,
    }
  )

  return {
    lang: language,
  }
}

export default useLang
