import { onMounted, onBeforeUnmount, ref, type Ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { locale } from 'dayjs'
import { Lang } from '@/enum'

const useLang = (): {
  lang: Ref<Lang>
} => {
  const i18n = useI18n()

  /**
   * 语言字符串转语言枚举方法
   *
   * @param lang - 语言字符串
   * @returns - 语言枚举
   */
  const stringToLang = (lang: string | null): Lang => {
    switch (lang) {
      case 'zh-CN':
        return Lang.zhCN
      case 'en-US':
        return Lang.enUS
      default:
        return Lang.zhCN
    }
  }

  /**
   * 语言
   */
  const lang = ref<Lang>(stringToLang(window.localStorage.getItem('lang')))

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

  /**
   * 语言存储变化回调方法
   *
   * @param e 存储事件
   */
  const handleLangStorageChange = (e: StorageEvent): void => {
    if (e.key === 'lang') {
      lang.value = stringToLang(e.newValue)
    }
  }

  onMounted(() => {
    window.addEventListener('storage', handleLangStorageChange)
  })

  onBeforeUnmount(() => {
    window.removeEventListener('storage', handleLangStorageChange)
  })

  return {
    lang,
  }
}

export default useLang
