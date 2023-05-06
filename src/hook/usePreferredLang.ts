import { ref, type Ref } from 'vue'
import { Lang } from '@/enum'
import { useEventListener } from '@/hook'
import { isLang } from '@/util'

const usePreferredLang = (): Ref<Lang> => {
  const lang = ref(isLang(window.navigator.language) ? window.navigator.language : Lang.zhCN)

  useEventListener(window, 'languagechange', () => {
    lang.value = isLang(window.navigator.language) ? window.navigator.language : Lang.zhCN
  })

  return lang
}

export default usePreferredLang
