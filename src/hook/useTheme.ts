import { computed, type ComputedRef, ref, type Ref, watch } from 'vue'
import { Theme } from '@/enum'
import { usePreferredTheme, useStorage } from '@/hook'
import { isTheme } from '@/util'

const useTheme = (): {
  theme: Ref<Theme>
  isLight: ComputedRef<boolean>
  isDark: ComputedRef<boolean>
  toLight: () => void
  toDark: () => void
  toggleTheme: () => void
} => {
  const data = useStorage('theme')

  /**
   * 主题
   */
  const theme = ref(isTheme(data.value) ? (data as Ref<Theme>) : usePreferredTheme())

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
