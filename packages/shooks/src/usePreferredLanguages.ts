import { readonly, ref, type Ref } from 'vue'
import { useEventListener } from '.'

const usePreferredLanguages = (): Readonly<Ref<readonly string[]>> => {
  const languages = ref(navigator.languages)

  useEventListener(window, 'languagechange', () => {
    languages.value = navigator.languages
  })

  return readonly(languages)
}

export default usePreferredLanguages
