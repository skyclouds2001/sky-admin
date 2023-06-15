import { readonly, ref, type Ref } from 'vue'
import { useEventListener } from '.'

const useDocumentReadyState = (): Readonly<Ref<DocumentReadyState>> => {
  const readyState = ref(document.readyState)

  useEventListener(document, 'readystatechange', () => {
    readyState.value = document.readyState
  })

  return readonly(readyState)
}

export default useDocumentReadyState
