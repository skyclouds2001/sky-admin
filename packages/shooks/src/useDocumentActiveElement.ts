import { shallowReadonly, shallowRef, type ShallowRef } from 'vue'
import { useEventListener } from '.'

const useDocumentActiveElement = (): Readonly<ShallowRef<Element | null>> => {
  const activeElement = shallowRef(document.activeElement)

  useEventListener(window, 'blur', () => {
    activeElement.value = document.activeElement
  })

  useEventListener(window, 'focus', () => {
    activeElement.value = document.activeElement
  })

  return shallowReadonly(activeElement)
}

export default useDocumentActiveElement
