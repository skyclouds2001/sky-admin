import { ref, type Ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { locale } from 'dayjs'
import { Lang } from '@/enum'
import { usePreferredLang, useStorage } from '@/hook'
import { isLang } from '@/util'

const useLang = (): {
  lang: Ref<Lang>
} => {
  const i18n = useI18n()

  const { data } = useStorage('lang')

  /**
   * 语言
   */
  const lang = ref(isLang(data.value) ? (data as Ref<Lang>) : usePreferredLang())

  watch(
    lang,
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
    lang,
  }
}

export default useLang
