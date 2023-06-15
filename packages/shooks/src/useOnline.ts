import { readonly, ref, type Ref } from 'vue'
import { useEventListener } from '.'

const useOnline = (): {
  isOnline: Readonly<Ref<boolean>>
  onlineAt: Readonly<Ref<number | undefined>>
  offlineAt: Readonly<Ref<number | undefined>>
} => {
  /**
   * 网络状态
   */
  const isOnline = ref(window.navigator.onLine)

  /**
   * 网络连接时间
   */
  const onlineAt = ref(isOnline.value ? Date.now() : undefined)

  /**
   * 网络断开时间
   */
  const offlineAt = ref(isOnline.value ? undefined : Date.now())

  useEventListener(window, 'online', () => {
    isOnline.value = true
    onlineAt.value = isOnline.value ? Date.now() : undefined
  })

  useEventListener(window, 'offline', () => {
    isOnline.value = false
    offlineAt.value = isOnline.value ? undefined : Date.now()
  })

  return {
    isOnline: readonly(isOnline),
    onlineAt: readonly(onlineAt),
    offlineAt: readonly(offlineAt),
  }
}

export default useOnline
