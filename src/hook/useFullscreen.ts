import { ref, computed, type ComputedRef } from 'vue'
import { ElMessage } from 'element-plus'
import { useEventListener } from '@/hook'

const useFullscreen = (
  target: HTMLElement = document.documentElement
): {
  isSupported: boolean
  isFullscreen: ComputedRef<boolean>
  enterFullscreen: () => void
  exitFullscreen: () => void
  toggleFullscreen: () => void
} => {
  /**
   * 标记用户是否启用全屏功能
   */
  const isSupported = document.fullscreenEnabled && 'fullscreenElement' in document && 'requestFullscreen' in HTMLElement && 'exitFullscreen' in document

  /**
   * 当前全屏状态
   */
  const isFullscreen = ref(document.fullscreenElement !== null)

  /**
   * 进入全屏状态方法
   */
  const enterFullscreen = (): void => {
    void target.requestFullscreen()
  }

  /**
   * 退出全屏状态方法
   */
  const exitFullscreen = (): void => {
    void document.exitFullscreen()
  }

  /**
   * 切换全屏状态方法
   */
  const toggleFullscreen = (): void => {
    if (!isFullscreen.value) {
      enterFullscreen()
    } else {
      exitFullscreen()
    }
  }

  useEventListener(document, 'fullscreenchange', () => {
    isFullscreen.value = document.fullscreenElement !== null
  })

  useEventListener(document, 'fullscreenerror', () => {
    ElMessage({
      message: '进入全屏模式失败',
      type: 'error',
      showClose: true,
      center: true,
    })
  })

  return {
    isSupported,
    isFullscreen: computed(() => isFullscreen.value),
    enterFullscreen,
    exitFullscreen,
    toggleFullscreen,
  }
}

export default useFullscreen
