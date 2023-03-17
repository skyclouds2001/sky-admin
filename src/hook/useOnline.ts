import { ref, computed, onMounted, onBeforeUnmount, type ComputedRef } from 'vue'

interface EventTargetWithOnline extends EventTarget {
  online: boolean
}

const useOnline = (): {
  isOnline: ComputedRef<boolean>
} => {
  const online = ref(window.navigator.onLine)

  const isOnline = computed(() => online.value)

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
