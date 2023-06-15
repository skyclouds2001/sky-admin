import { readonly, ref, type Ref } from 'vue'
import { useEventListener } from '.'

const useWindowSize = (): {
  width: Readonly<Ref<number>>
  height: Readonly<Ref<number>>
} => {
  const width = ref(Infinity)
  const height = ref(Infinity)

  const update = (): void => {
    width.value = window.innerWidth
    height.value = window.innerHeight
  }

  useEventListener(window, 'resize', update)

  update()

  return {
    width: readonly(width),
    height: readonly(height),
  }
}

export default useWindowSize
