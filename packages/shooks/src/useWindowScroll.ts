import { readonly, ref, type Ref } from 'vue'
import { useEventListener } from '.'

const useWindowScroll = (): {
  x: Readonly<Ref<number>>
  y: Readonly<Ref<number>>
} => {
  const x = ref(0)
  const y = ref(0)

  const update = (): void => {
    x.value = window.scrollX
    y.value = window.scrollY
  }

  useEventListener(window, 'scroll', update)

  update()

  return {
    x: readonly(x),
    y: readonly(y),
  }
}

export default useWindowScroll
