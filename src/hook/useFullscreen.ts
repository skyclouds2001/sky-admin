import { ref, computed, type ComputedRef } from 'vue'

const useFullscreen = (): {
  enabledFullscreen: boolean
  isFullscreen: ComputedRef<boolean>
  toggleFullscreen: () => void
} => {
  const initial = document.fullscreenElement !== null
  const status = ref(initial)

  const enabledFullscreen = document.fullscreenEnabled

  const isFullscreen = computed(() => status.value)

  const toggleFullscreen = (): void => {
    status.value = !status.value
    if (status.value) {
      void document.documentElement.requestFullscreen()
    } else {
      void document.exitFullscreen()
    }
  }

  document.addEventListener('fullscreenchange', (e) => {
    console.log(e)
  })

  return {
    enabledFullscreen,
    isFullscreen,
    toggleFullscreen,
  }
}

export default useFullscreen
