import { readonly, ref, type Ref } from 'vue'
import { useMediaQuery } from '.'

const usePreferredTheme = (): Readonly<Ref<'light' | 'dark'>> => {
  const mediaQuery = useMediaQuery('(prefers-color-scheme: dark)')

  return readonly(ref(mediaQuery.isSupported && mediaQuery.matchMediaQuery.value ? 'dark' : 'light'))
}

export default usePreferredTheme
