import { ref, type Ref } from 'vue'
import { Theme } from '@/enum'
import { useMediaQuery } from '@/hook'

const usePreferredTheme = (): Ref<Theme> => {
  const mediaQuery = useMediaQuery('(prefers-color-scheme: dark)')

  return ref(mediaQuery.isSupported && mediaQuery.matchMediaQuery.value ? Theme.DARK : Theme.LIGHT)
}

export default usePreferredTheme
