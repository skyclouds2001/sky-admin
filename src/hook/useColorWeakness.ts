import { ref, watch, type Ref } from 'vue'

const useColorWeakness = (): {
  isColorWeakness: Ref<boolean>
} => {
  const initial = document.querySelector('html')?.classList.contains('color-weakness') ?? false
  const isColorWeakness = ref(initial)

  watch(isColorWeakness, () => {
    document.querySelector('html')?.classList.toggle('color-weakness')
  })

  return {
    isColorWeakness,
  }
}

export default useColorWeakness
