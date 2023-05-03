import { ref, computed, type ComputedRef, type Ref } from 'vue'
import { useEventListener } from '@/hook'

const useOnline = (): {
  isOnline: ComputedRef<boolean>
} => {
  /**
   * 网络状态
   */
  const online = ref(window.navigator.onLine)

  /**
   * 网络连接时间
   */
  const onlineAt: Ref<number | undefined> = ref(undefined)

  /**
   * 网络断开时间
   */
  const offlineAt: Ref<number | undefined> = ref(undefined)

  /**
   * 网络状态连接事件回调方法
   */
  const handleOnline = (): void => {
    online.value = true
    onlineAt.value = online.value ? Date.now() : undefined
  }

  /**
   * 网络状态断开事件回调方法
   */
  const handleOffline = (): void => {
    online.value = false
    offlineAt.value = online.value ? undefined : Date.now()
  }

  useEventListener(window, 'online', handleOnline)
  useEventListener(window, 'offline', handleOffline)

  return {
    isOnline: computed(() => online.value),
  }
}

export default useOnline
