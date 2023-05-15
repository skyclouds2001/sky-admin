import { getCurrentScope, onScopeDispose, readonly, ref, type Ref } from 'vue'

const useAnimationFrame = (
  fn: (time: DOMHighResTimeStamp) => void,
  options: {
    immediate?: boolean
  } = {}
): {
  isActive: Readonly<Ref<boolean>>
  resume: () => void
  parse: () => void
} => {
  const { immediate = true } = options

  const isActive = ref(false)

  let id: number | null = null

  const resume = (): void => {
    if (!isActive.value) {
      isActive.value = true
      id = window.requestAnimationFrame(fn)
    }
  }

  const parse = (): void => {
    if (isActive.value && id !== null) {
      isActive.value = false
      window.cancelAnimationFrame(id)
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

export default useAnimationFrame
