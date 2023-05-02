import { computed, type ComputedRef, onBeforeUnmount, onMounted, ref, type Ref, watch } from 'vue'
import { Theme } from '@/enum'

const useTheme = (): {
  theme: Ref<Theme>
  isLight: ComputedRef<boolean>
  isDark: ComputedRef<boolean>
  toLight: () => void
  toDark: () => void
  toggleTheme: () => void
} => {
  /**
   * 主题字符串转主题枚举方法
   * @param theme - 主题字符串
   * @returns - 主题枚举
   */
  const stringToTheme = (theme: string | null): Theme => {
    switch (theme) {
      case 'light':
        return Theme.LIGHT
      case 'dark':
        return Theme.DARK
      default:
        return Theme.LIGHT
    }
  }

  /**
   * 主题
   */
  const theme = ref<Theme>(stringToTheme(window.localStorage.getItem('theme')))

  /**
   * 判断是否为亮色主题
   * @returns - 判断结果
   */
  const isLight = computed(() => theme.value === Theme.LIGHT)

  /**
   * 判断是否为暗色主题
   * @returns - 判断结果
   */
  const isDark = computed(() => theme.value === Theme.DARK)

  /**
   * 转换为亮色主题
   */
  const toLight = (): void => {
    theme.value = Theme.LIGHT
  }

  /**
   * 转换为暗色主题
   */
  const toDark = (): void => {
    theme.value = Theme.DARK
  }

  /**
   * 切换 Theme 方法
   */
  const toggleTheme = (): void => {
    theme.value = theme.value === Theme.LIGHT ? Theme.DARK : Theme.LIGHT
  }

  watch(
    theme,
    (current) => {
      switch (current) {
        case Theme.LIGHT:
          window.localStorage.setItem('theme', Theme.LIGHT)
          document.documentElement.classList.add(Theme.LIGHT)
          document.documentElement.classList.remove(Theme.DARK)
          break
        case Theme.DARK:
          window.localStorage.setItem('theme', Theme.DARK)
          document.documentElement.classList.add(Theme.DARK)
          document.documentElement.classList.remove(Theme.LIGHT)
          break
      }
    },
    {
      immediate: true,
    }
  )

  /**
   * 主题存储变化回调方法
   * @param e 存储事件
   */
  const handleThemeStorageChange = (e: StorageEvent): void => {
    if (e.key === 'theme') {
      theme.value = stringToTheme(e.newValue)
    }
  }

  onMounted(() => {
    window.addEventListener('storage', handleThemeStorageChange)
  })

  onBeforeUnmount(() => {
    window.removeEventListener('storage', handleThemeStorageChange)
  })

  return {
    theme,
    isLight,
    isDark,
    toLight,
    toDark,
    toggleTheme,
  }
}

export default useTheme
