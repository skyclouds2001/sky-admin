import { computed, type ComputedRef, ref } from 'vue'
import { useEventListener } from '@/hook'

const useWindowFocus = (): ComputedRef<boolean> => {
  const isFocus = ref(document.hasFocus())

  useEventListener(window, 'focus', () => {
    isFocus.value = true
  })

  useEventListener(window, 'blur', () => {
    isFocus.value = false
  })

  return computed(() => isFocus.value)
}

export default useWindowFocus
