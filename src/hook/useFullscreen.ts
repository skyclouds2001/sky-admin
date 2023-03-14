import { ref, computed, onMounted, onBeforeUnmount, type ComputedRef } from 'vue'

const useFullscreen = (): {
  enabledFullscreen: boolean
  isFullscreen: ComputedRef<boolean>
  openFullscreen: () => void
  exitFullscreen: () => void
  toggleFullscreen: () => void
} => {
  const status = ref(document.fullscreenElement !== null)

  const enabledFullscreen = document.fullscreenEnabled

  const isFullscreen = computed(() => status.value)

  const openFullscreen = (): void => {
    void document.documentElement.requestFullscreen()
  }

  const exitFullscreen = (): void => {
    void document.exitFullscreen()
  }

  const toggleFullscreen = (): void => {
    if (!status.value) {
      void document.documentElement.requestFullscreen()
    } else {
      void document.exitFullscreen()
    }
  }

  const handleFullscreenStatusChange = (): void => {
    status.value = document.fullscreenElement !== null
  }

  onMounted(() => {
    document.addEventListener('fullscreenchange', handleFullscreenStatusChange)
  })

  onBeforeUnmount(() => {
    document.removeEventListener('fullscreenchange', handleFullscreenStatusChange)
  })

  return {
    enabledFullscreen,
    isFullscreen,
    openFullscreen,
    exitFullscreen,
    toggleFullscreen,
  }
}

export default useFullscreen
