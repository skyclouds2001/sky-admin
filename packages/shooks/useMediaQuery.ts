import { ref, type Ref } from 'vue'
import { useEventListener } from '@/hook'

const useMediaQuery = (
  query: string
): {
  isSupported: boolean
  matchMediaQuery: Ref<boolean>
} => {
  const isSupported = 'matchMedia' in window && typeof window.matchMedia === 'function'

  const mediaQuery = window.matchMedia(query)

  const matches = ref(mediaQuery.matches)

  useEventListener<MediaQueryList, MediaQueryListEventMap, 'change'>(mediaQuery, 'change', (e) => {
    matches.value = e.matches
  })

  return {
    isSupported,
    matchMediaQuery: matches,
  }
}

export default useMediaQuery
