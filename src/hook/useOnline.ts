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
  const onlineAt: Ref<number | undefined> = ref(online.value ? Date.now() : undefined)

  /**
   * 网络断开时间
   */
  const offlineAt: Ref<number | undefined> = ref(online.value ? undefined : Date.now())

  useEventListener(window, 'online', () => {
    online.value = true
    onlineAt.value = online.value ? Date.now() : undefined
  })

  useEventListener(window, 'offline', () => {
    online.value = false
    offlineAt.value = online.value ? undefined : Date.now()
  })

  return {
    isOnline: computed(() => online.value),
  }
}

export default useOnline
