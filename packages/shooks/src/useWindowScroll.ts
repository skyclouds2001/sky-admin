import { computed, type ComputedRef, ref } from 'vue'
import { useEventListener } from '.'

const useWindowScroll = (): {
  x: ComputedRef<number>
  y: ComputedRef<number>
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
    x: computed(() => x.value),
    y: computed(() => y.value),
  }
}

export default useWindowScroll
