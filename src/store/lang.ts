import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { Lang } from '@/enum'

const initialLang = (): Lang => {
  let res: Lang
  switch (navigator.language) {
    case 'zh-CN':
      res = Lang.zhCN
      break
    case 'en-US':
      res = Lang.enUS
      break
    default:
      res = Lang.zhCN
      break
  }
  return res
}

const useLangStore = defineStore('lang', () => {
  const i18n = useI18n()

  /**
   * 语言值
   */
  const lang = ref<Lang>(initialLang())

  /**
   * 获取语言方法
   */
  const getLang = computed(() => lang)

  /**
   * 设置语言方法
   *
   * @param current 当前主题
   */
  const setLang = (current: Lang): void => {
    i18n.locale.value = current
    lang.value = current
  }

  return {
    getLang,
    setLang,
  }
})

export default useLangStore
