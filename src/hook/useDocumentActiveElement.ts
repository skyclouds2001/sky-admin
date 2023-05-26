import { computed, type ComputedRef, shallowRef } from 'vue'
import { useEventListener } from '@/hook'

const useDocumentActiveElement = (): ComputedRef<Element | null> => {
  const activeElement = shallowRef(document.activeElement)

  useEventListener(window, 'blur', () => {
    activeElement.value = document.activeElement
  })

  useEventListener(window, 'focus', () => {
    activeElement.value = document.activeElement
  })

  return computed(() => activeElement.value)
}

export default useDocumentActiveElement
