import { computed, type ComputedRef, ref, type Ref, unref, watch } from 'vue'
import { Theme, isTheme } from '@/enum'
import { usePreferredTheme, useStorage } from 'shooks'

const useTheme = (): {
  theme: Ref<Theme>
  isLight: ComputedRef<boolean>
  isDark: ComputedRef<boolean>
  toLight: () => void
  toDark: () => void
  toggleTheme: () => void
} => {
  const preferredTheme = unref(usePreferredTheme())

  const data = useStorage<Theme>('theme', {
    prefix: 'sky-admin-0.0.0',
  })

  /**
   * 主题
   */
  const theme = ref(data.value !== null ? data.value : isTheme(preferredTheme) ? preferredTheme : Theme.LIGHT)

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
    data,
    (current) => {
      switch (current) {
        case Theme.LIGHT:
          theme.value = Theme.LIGHT
          document.documentElement.classList.add(Theme.LIGHT)
          document.documentElement.classList.remove(Theme.DARK)
          break
        case Theme.DARK:
          theme.value = Theme.DARK
          document.documentElement.classList.add(Theme.DARK)
          document.documentElement.classList.remove(Theme.LIGHT)
          break
      }
    },
    {
      immediate: true,
    }
  )

  watch(
    theme,
    (current) => {
      switch (current) {
        case Theme.LIGHT:
          data.value = Theme.LIGHT
          document.documentElement.classList.add(Theme.LIGHT)
          document.documentElement.classList.remove(Theme.DARK)
          break
        case Theme.DARK:
          data.value = Theme.DARK
          document.documentElement.classList.add(Theme.DARK)
          document.documentElement.classList.remove(Theme.LIGHT)
          break
      }
    },
    {
      immediate: true,
    }
  )

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
