import { ref, type Ref, watch } from 'vue'

const useFont = (): Ref<string> => {
  const font = ref('system-ui')

  watch(
    font,
    (font) => {
      document.documentElement.style.setProperty('font-family', font, 'important')
    },
    {
      immediate: true,
    }
  )

  return font
}

export default useFont
