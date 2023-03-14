import { ref, watch, type Ref } from 'vue'

const useGrayMode = (): {
  isGrayMode: Ref<boolean>
} => {
  const isGrayMode = ref(document.documentElement.classList.contains('grey-mode'))

  watch(isGrayMode, (current) => {
    if (current) {
      document.documentElement.classList.add('grey-mode')
    } else {
      document.documentElement.classList.remove('grey-mode')
    }
  })

  return {
    isGrayMode,
  }
}

export default useGrayMode
