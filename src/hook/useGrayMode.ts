import { ref, watch, type Ref } from 'vue'

const useGrayMode = (): {
  isGrayMode: Ref<boolean>
} => {
  const initial = document.querySelector('html')?.classList.contains('grey-mode') ?? false
  const isGrayMode = ref(initial)

  watch(isGrayMode, () => {
    document.querySelector('html')?.classList.toggle('grey-mode')
  })

  return {
    isGrayMode,
  }
}

export default useGrayMode
