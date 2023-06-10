import { computed, type ComputedRef, ref } from 'vue'
import { useEventListener } from '.'

const useWindowSize = (): {
  width: ComputedRef<number>
  height: ComputedRef<number>
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
    width: computed(() => width.value),
    height: computed(() => height.value),
  }
}

export default useWindowSize
