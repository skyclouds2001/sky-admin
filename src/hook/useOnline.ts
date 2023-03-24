import { ref, computed, onMounted, onBeforeUnmount, type ComputedRef } from 'vue'

interface EventTargetWithOnline extends EventTarget {
  online: boolean
}

const useOnline = (): {
  isOnline: ComputedRef<boolean>
} => {
  /**
   * 网络状态
   */
  const online = ref(window.navigator.onLine)

  /**
   * 网络状态（只读）
   */
  const isOnline = computed(() => online.value)

  /**
   * 网络状态改变回调方法
   *
   * @param e 回调事件
   */
  const handleStatusChange = (e: Event): void => {
    online.value = (e.target as EventTargetWithOnline)?.online
  }

  onMounted(() => {
    window.addEventListener('online', handleStatusChange)
    window.addEventListener('offline', handleStatusChange)
  })

  onBeforeUnmount(() => {
    window.removeEventListener('online', handleStatusChange)
    window.removeEventListener('offline', handleStatusChange)
  })

  return {
    isOnline,
  }
}

export default useOnline
