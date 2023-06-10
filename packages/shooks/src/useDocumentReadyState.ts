import { computed, type ComputedRef, ref } from 'vue'
import { useEventListener } from '.'

const useDocumentReadyState = (): ComputedRef<DocumentReadyState> => {
  const readyState = ref(document.readyState)

  useEventListener(document, 'readystatechange', () => {
    readyState.value = document.readyState
  })

  return computed(() => readyState.value)
}

export default useDocumentReadyState
