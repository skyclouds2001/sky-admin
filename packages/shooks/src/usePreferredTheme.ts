import { ref, type Ref } from 'vue'
import useMediaQuery from './useMediaQuery'

const usePreferredTheme = (): Ref<'light' | 'dark'> => {
  const mediaQuery = useMediaQuery('(prefers-color-scheme: dark)')

  return ref(mediaQuery.isSupported && mediaQuery.matchMediaQuery.value ? 'dark' : 'light')
}

export default usePreferredTheme
