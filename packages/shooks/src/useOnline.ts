import { computed, type ComputedRef, type Ref, ref } from 'vue'
import { useEventListener } from '.'

const useOnline = (): {
  isOnline: ComputedRef<boolean>
  onlineAt: Ref<number | undefined>
  offlineAt: Ref<number | undefined>
} => {
  /**
   * 网络状态
   */
  const online = ref(window.navigator.onLine)

  /**
   * 网络连接时间
   */
  const onlineAt = ref(online.value ? Date.now() : undefined)

  /**
   * 网络断开时间
   */
  const offlineAt = ref(online.value ? undefined : Date.now())

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
    onlineAt,
    offlineAt,
  }
}

export default useOnline
