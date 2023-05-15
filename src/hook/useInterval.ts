import { getCurrentScope, onScopeDispose, readonly, ref, type Ref } from 'vue'

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
  parse: () => void
} => {
  const { immediate = true, immediateCallback = false } = options

  const isActive = ref(false)

  let id: number | null = null

  const resume = (): void => {
    parse()

    if (timeout >= 0) {
      isActive.value = true
      id = window.setInterval(fn, timeout)
      if (immediateCallback) fn()
    }
  }

  const parse = (): void => {
    isActive.value = false

    if (id !== null) {
      window.clearInterval(id)
      id = null
    }
  }

  if (immediate) {
    resume()
  }

  if (getCurrentScope() !== undefined) {
    onScopeDispose(parse)
  }

  return {
    isActive: readonly(isActive),
    resume,
    parse,
  }
}

export default useInterval
