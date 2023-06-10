import { computed, type ComputedRef, ref } from 'vue'
import { useEventListener } from '.'

const useDocumentVisibility = (): ComputedRef<DocumentVisibilityState> => {
  const visibility = ref(document.visibilityState)

  useEventListener(document, 'visibilitychange', () => {
    visibility.value = document.visibilityState
  })

  return computed(() => visibility.value)
}

export default useDocumentVisibility
