import { ref, type Ref } from 'vue'
import { useEventListener } from '.'

const usePreferredLang = (): Ref<string> => {
  const lang = ref(navigator.language)

  useEventListener(window, 'languagechange', () => {
    lang.value = navigator.language
  })

  return lang
}

export default usePreferredLang
