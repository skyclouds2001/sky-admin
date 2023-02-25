import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { Theme } from '@/enum'

/**
 * 获取初始主题
 *
 * 根据系统主题设置
 *
 * 并添加主题切换事件监听器
 *
 * @returns 初始主题
 */
const initialTheme = (): Theme => {
  const themeMedia = window.matchMedia('(prefers-color-scheme: light)')

  themeMedia.addEventListener('change', (e) => {
    const themeStore = useThemeStore()
    if (e.matches) {
      themeStore.setTheme(Theme.Light)
    } else {
      themeStore.setTheme(Theme.DARK)
    }
  })

  toggleThemeClass(themeMedia.matches ? Theme.Light : Theme.DARK)

  return themeMedia.matches ? Theme.Light : Theme.DARK
}

/**
 * 更改主题类方法
 *
 * @param current 当前主题
 */
const toggleThemeClass = (current: Theme): void => {
  if (current === Theme.Light) {
    document.documentElement.classList.add(Theme.Light)
    document.documentElement.classList.remove(Theme.DARK)
  } else {
    document.documentElement.classList.add(Theme.DARK)
    document.documentElement.classList.remove(Theme.Light)
  }
}

export const useThemeStore = defineStore('theme', () => {
  /**
   * 主题值
   */
  const theme = ref<Theme>(initialTheme())

  /**
   * 获取主题方法
   */
  const getTheme = computed(() => theme)

  /**
   * 设置主题方法
   *
   * @param current 当前主题
   */
  const setTheme = (current: Theme): void => {
    theme.value = current
    toggleThemeClass(current)
  }

  return {
    getTheme,
    setTheme,
  }
})
