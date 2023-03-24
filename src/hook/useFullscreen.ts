import { ref, computed, onMounted, onBeforeUnmount, type ComputedRef } from 'vue'
import { ElMessage } from 'element-plus'

const useFullscreen = (): {
  enabledFullscreen: boolean
  isFullscreen: ComputedRef<boolean>
  openFullscreen: () => void
  exitFullscreen: () => void
  toggleFullscreen: () => void
} => {
  /**
   * 当前全屏状态
   */
  const status = ref(document.fullscreenElement !== null)

  /**
   * 标记用户是否启用全屏功能
   */
  const enabledFullscreen = document.fullscreenEnabled

  /**
   * 当前全屏状态（只读）
   */
  const isFullscreen = computed(() => status.value)

  /**
   * 进入全屏状态方法
   */
  const openFullscreen = (): void => {
    void document.documentElement.requestFullscreen()
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
    if (!status.value) {
      void document.documentElement.requestFullscreen()
    } else {
      void document.exitFullscreen()
    }
  }

  /**
   * 全屏状态改变回调方法
   */
  const handleFullscreenStatusChange = (): void => {
    status.value = document.fullscreenElement !== null
  }

  /**
   * 改变全屏状态错误回调方法
   */
  const handleFullscreenError = (): void => {
    ElMessage({
      message: '进入全屏模式失败',
      type: 'error',
      showClose: true,
      center: true,
    })
  }

  onMounted(() => {
    document.addEventListener('fullscreenchange', handleFullscreenStatusChange)
    document.addEventListener('fullscreenerror', handleFullscreenError)
  })

  onBeforeUnmount(() => {
    document.removeEventListener('fullscreenchange', handleFullscreenStatusChange)
    document.removeEventListener('fullscreenerror', handleFullscreenError)
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
