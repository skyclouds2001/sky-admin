import { ref, watch, type Ref } from 'vue'

const useColorWeakness = (): {
  isColorWeakness: Ref<boolean>
} => {
  /**
   * 是否使用色弱模式
   */
  const isColorWeakness = ref(document.documentElement.classList.contains('color-weakness'))

  watch(isColorWeakness, (current) => {
    if (current) {
      document.documentElement.classList.add('color-weakness')
    } else {
      document.documentElement.classList.remove('color-weakness')
    }
  })

  return {
    isColorWeakness,
  }
}

export default useColorWeakness
