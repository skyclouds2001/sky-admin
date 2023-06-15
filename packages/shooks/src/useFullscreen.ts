import { readonly, ref, type Ref } from 'vue'
import { useEventListener } from '.'

const useFullscreen = (
  target: HTMLElement = document.documentElement,
  options?: FullscreenOptions,
  onError?: (e: Event) => void
): {
  isSupported: boolean
  isFullscreen: Readonly<Ref<boolean>>
  enter: () => Promise<void>
  exit: () => Promise<void>
  toggle: () => Promise<void>
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
  const enter = async (): Promise<void> => {
    if (!isSupported) return

    await target.requestFullscreen(options)

    isFullscreen.value = true
  }

  /**
   * 退出全屏状态方法
   */
  const exit = async (): Promise<void> => {
    if (!isSupported) return

    await document.exitFullscreen()
    isFullscreen.value = false
  }

  /**
   * 切换全屏状态方法
   */
  const toggle = async (): Promise<void> => {
    await (isFullscreen.value ? exit() : enter())
  }

  if (isSupported) {
    useEventListener(document, 'fullscreenchange', () => {
      isFullscreen.value = document.fullscreenElement === target
    })

    if (onError !== undefined) {
      useEventListener(document, 'fullscreenerror', onError)
    }
  }

  return {
    isSupported,
    isFullscreen: readonly(isFullscreen),
    enter,
    exit,
    toggle,
  }
}

export default useFullscreen
