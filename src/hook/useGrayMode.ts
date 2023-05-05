import { ref, type Ref, watch } from 'vue'

const useGrayMode = (): {
  isGrayMode: Ref<boolean>
} => {
  /**
   * 是否使用灰色模式
   */
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
