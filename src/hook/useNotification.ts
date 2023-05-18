import { getCurrentInstance, getCurrentScope, onMounted, onScopeDispose, shallowRef, type ShallowRef } from 'vue'
import { useEventListener } from '@/hook'

const useNotification = (
  title: string,
  options: NotificationOptions = {}
): {
  isSupported: boolean
  notification: ShallowRef<Notification | null>
  show: () => void
  close: () => void
} => {
  const isSupported = 'Notification' in window

  const notification = shallowRef<Notification | null>(null)

  const requestPermission = async (): Promise<void> => {
    if (!isSupported) return

    if ('permission' in Notification && Notification.permission !== 'denied') {
      await window.Notification.requestPermission()
    }
  }

  const show = (overrides: NotificationOptions = {}): void => {
    if (!isSupported) return

    void requestPermission().then(() => {
      notification.value = new window.Notification(title, Object.assign({}, options, overrides))
    })
  }

  const close = (): void => {
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

    if (getCurrentInstance() !== null) {
      onMounted(() => {
        void requestPermission()
      })
    } else {
      void requestPermission()
    }

    if (getCurrentScope() !== undefined) {
      onScopeDispose(() => {
        close()
      })
    }
  }

  return {
    isSupported,
    notification,
    show,
    close,
  }
}

export default useNotification
