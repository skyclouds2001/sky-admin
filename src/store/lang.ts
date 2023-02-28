import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { Lang } from '@/enum'

export const useLangStore = defineStore('lang', () => {
  const i18n = useI18n()

  /**
   * 语言值
   */
  const lang = ref<Lang>(Lang.zhCN)

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
