import { shallowRef, type ShallowRef } from 'vue'
import { tryOnScopeDispose, useEventListener } from '.'

const useNotification = (
  title: string,
  options: NotificationOptions = {}
): {
  isSupported: boolean
  notification: ShallowRef<Notification | null>
  show: () => Promise<void>
  close: () => Promise<void>
} => {
  const isSupported = 'Notification' in window

  const notification = shallowRef<Notification | null>(null)

  const requestPermission = async (): Promise<void> => {
    if (!isSupported) return

    if ('permission' in Notification && Notification.permission !== 'denied') {
      await window.Notification.requestPermission()
    }
  }

  const show = async (overrides: NotificationOptions & { title?: string } = {}): Promise<void> => {
    if (!isSupported) return

    await requestPermission()

    notification.value = new window.Notification(overrides.title ?? title, Object.assign({}, options, overrides))
  }

  const close = async (): Promise<void> => {
    if (!isSupported) return

    if (notification.value !== null) {
      notification.value.close()
      notification.value = null
    }
  }

  if (isSupported) {
    useEventListener(document, 'visibilitychange', () => {
      if (document.visibilityState === 'visible') {
        notification.value?.close()
      }
    })

    tryOnScopeDispose(close)
  }

  return {
    isSupported,
    notification,
    show,
    close,
  }
}

export default useNotification
