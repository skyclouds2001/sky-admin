import { readonly, ref, type Ref } from 'vue'
import { useEventListener } from '.'

const useWindowFocus = (): Readonly<Ref<boolean>> => {
  const isFocus = ref(document.hasFocus())

  useEventListener(window, 'focus', () => {
    isFocus.value = true
  })

  useEventListener(window, 'blur', () => {
    isFocus.value = false
  })

  return readonly(isFocus)
}

export default useWindowFocus
