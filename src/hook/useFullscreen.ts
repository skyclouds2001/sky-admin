import { computed, type ComputedRef, ref } from 'vue'
import { useEventListener } from '@/hook'

const useFullscreen = (
  target: HTMLElement = document.documentElement,
  options?: FullscreenOptions
): {
  isSupported: boolean
  isFullscreen: ComputedRef<boolean>
  enter: () => void
  exit: () => void
  toggle: () => void
} => {
  /**
   * 标记用户是否启用全屏功能
   */
  const isSupported = 'fullscreenElement' in document && 'requestFullscreen' in HTMLElement.prototype && 'exitFullscreen' in document && document.fullscreenEnabled

  /**
   * 当前全屏状态
   */
  const isFullscreen = ref(document.fullscreenElement === target)

  /**
   * 进入全屏状态方法
   */
  const enter = (): void => {
    if (!isSupported) return

    void target.requestFullscreen(options)
    isFullscreen.value = true
  }

  /**
   * 退出全屏状态方法
   */
  const exit = (): void => {
    if (!isSupported) return

    void document.exitFullscreen()
    isFullscreen.value = false
  }

  /**
   * 切换全屏状态方法
   */
  const toggle = (): void => {
    isFullscreen.value ? exit() : enter()
  }

  useEventListener(document, 'fullscreenchange', () => {
    isFullscreen.value = document.fullscreenElement === target
  })

  return {
    isSupported,
    isFullscreen: computed(() => isFullscreen.value),
    enter,
    exit,
    toggle,
  }
}

export default useFullscreen
