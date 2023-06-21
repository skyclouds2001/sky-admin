import { readonly, ref, type Ref } from 'vue'
import { tryOnScopeDispose } from '.'

const useTimeout = (
  fn: () => void,
  timeout: number,
  options: {
    immediate?: boolean
  } = {}
): {
  isPending: Readonly<Ref<boolean>>
  start: () => void
  stop: () => void
} => {
  const { immediate = true } = options

  const isPending = ref(false)

  let id: number | null = null

  const start = (): void => {
    stop()

    isPending.value = true
    id = window.setTimeout(() => {
      isPending.value = false
      id = null

      fn()
    }, timeout)
  }

  const stop = (): void => {
    isPending.value = false

    if (id !== null) {
      window.clearTimeout(id)
      id = null
    }
  }

  if (immediate) {
    start()
  }

  tryOnScopeDispose(stop)

  return {
    isPending: readonly(isPending),
    start,
    stop,
  }
}

export default useTimeout
