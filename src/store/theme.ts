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
      themeStore.setTheme(Theme.LIGHT)
    } else {
      themeStore.setTheme(Theme.DARK)
    }
  })

  toggleThemeClass(themeMedia.matches ? Theme.LIGHT : Theme.DARK)

  return themeMedia.matches ? Theme.LIGHT : Theme.DARK
}

/**
 * 更改主题类方法
 *
 * @param current 当前主题
 */
const toggleThemeClass = (current: Theme): void => {
  if (current === Theme.LIGHT) {
    document.documentElement.classList.add(Theme.LIGHT)
    document.documentElement.classList.remove(Theme.DARK)
  } else {
    document.documentElement.classList.add(Theme.DARK)
    document.documentElement.classList.remove(Theme.LIGHT)
  }
}

const useThemeStore = defineStore('theme', () => {
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

  /**
   * 判断是否为亮色主题
   *
   * @returns 判断结果
   */
  const isLight = (): boolean => theme.value === Theme.LIGHT

  /**
   * 判断是否为暗色主题
   *
   * @returns 判断结果
   */
  const isDark = (): boolean => theme.value === Theme.DARK

  /**
   * 切换 Theme 方法
   */
  const toggleTheme = (): void => {
    setTheme(theme.value === Theme.LIGHT ? Theme.DARK : Theme.LIGHT)
  }

  return {
    getTheme,
    setTheme,
    isLight,
    isDark,
    toggleTheme,
  }
})

export default useThemeStore
