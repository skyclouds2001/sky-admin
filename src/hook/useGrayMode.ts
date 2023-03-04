import { ref, computed, type ComputedRef } from 'vue'

const useGrayMode = (): {
  isGrayMode: ComputedRef<boolean>
  toggleGrayMode: () => void
} => {
  const initial = document.querySelector('html')?.classList.contains('grey-mode') ?? false
  const status = ref(initial)

  const isGrayMode = computed(() => status.value)

  const toggleGrayMode = (): void => {
    status.value = !status.value
    document.querySelector('html')?.classList.toggle('grey-mode')
  }

  return {
    isGrayMode,
    toggleGrayMode,
  }
}

export default useGrayMode
