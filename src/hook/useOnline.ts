import { ref, computed, onMounted, onBeforeUnmount, type ComputedRef } from 'vue'

const useOnline = (): {
  isOnline: ComputedRef<boolean>
} => {
  /**
   * 网络状态
   */
  const online = ref(window.navigator.onLine)

  /**
   * 网络状态连接事件回调方法
   */
  const handleOnline = (): void => {
    online.value = true
  }

  /**
   * 网络状态断开事件回调方法
   */
  const handleOffline = (): void => {
    online.value = false
  }

  onMounted(() => {
    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)
  })

  onBeforeUnmount(() => {
    window.removeEventListener('online', handleOnline)
    window.removeEventListener('offline', handleOffline)
  })

  return {
    isOnline: computed(() => online.value),
  }
}

export default useOnline
