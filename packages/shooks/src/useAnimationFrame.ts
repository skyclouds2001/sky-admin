import { readonly, ref, type Ref } from 'vue'
import { tryOnScopeDispose } from '.'

const useAnimationFrame = (
  fn: (time: DOMHighResTimeStamp) => void,
  options: {
    immediate?: boolean
  } = {}
): {
  isActive: Readonly<Ref<boolean>>
  resume: () => void
  pause: () => void
} => {
  const { immediate = true } = options

  const isActive = ref(false)

  let id: number | null = null

  const loop = (time: number): void => {
    fn(time)
    id = window.requestAnimationFrame(loop)
  }

  const resume = (): void => {
    if (!isActive.value && id === null) {
      isActive.value = true
      id = window.requestAnimationFrame(loop)
    }
  }

  const pause = (): void => {
    if (isActive.value && id !== null) {
      isActive.value = false
      window.cancelAnimationFrame(id)
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

export default useAnimationFrame
