import { readonly, ref, type Ref } from 'vue'
import { tryOnScopeDispose } from '.'

const useIdleCallback = (
  fn: (idleDeadline: IdleDeadline) => void,
  options: {
    immediate?: boolean
    timeout?: number
  } = {}
): {
  isActive: Readonly<Ref<boolean>>
  resume: () => void
  pause: () => void
} => {
  const { immediate = true, timeout } = options

  const isActive = ref(false)

  let id: number | null = null

  const loop = (idleDeadline: IdleDeadline): void => {
    fn(idleDeadline)
    id = window.requestIdleCallback(loop, timeout !== undefined ? { timeout } : {})
  }

  const resume = (): void => {
    if (!isActive.value && id === null) {
      isActive.value = true
      id = window.requestIdleCallback(loop, timeout !== undefined ? { timeout } : {})
    }
  }

  const pause = (): void => {
    if (isActive.value && id !== null) {
      isActive.value = false
      window.cancelIdleCallback(id)
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

export default useIdleCallback
