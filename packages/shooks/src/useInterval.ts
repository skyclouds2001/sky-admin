import { readonly, ref, type Ref } from 'vue'
import { tryOnScopeDispose } from '.'

const useInterval = (
  fn: () => void,
  timeout: number,
  options: {
    immediate?: boolean
    immediateCallback?: boolean
  } = {}
): {
  isActive: Readonly<Ref<boolean>>
  resume: () => void
  pause: () => void
} => {
  const { immediate = true, immediateCallback = false } = options

  const isActive = ref(false)

  let id: number | null = null

  const resume = (): void => {
    pause()

    if (timeout >= 0) {
      isActive.value = true
      id = window.setInterval(fn, timeout)
      if (immediateCallback) fn()
    }
  }

  const pause = (): void => {
    isActive.value = false

    if (id !== null) {
      window.clearInterval(id)
      id = null
    }
  }

  if (immediate) {
    resume()
  }

  tryOnScopeDispose(pause)

  return {
    isActive: readonly(isActive),
    resume,
    pause,
  }
}

export default useInterval
