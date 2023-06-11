import { ref, type Ref } from 'vue'
import { useEventListener } from '.'

const usePreferredLanguages = (): Ref<readonly string[]> => {
  const languages = ref(navigator.languages)

  useEventListener(window, 'languagechange', () => {
    languages.value = navigator.languages
  })

  return languages
}

export default usePreferredLanguages
