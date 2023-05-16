import { computed, type ComputedRef, ref } from 'vue'
import { useEventListener } from '@/hook'

interface NavigatorWithWakeLock extends Navigator {
  wakeLock: WakeLock
}

interface WakeLock {
  request: (type: WakeLockType) => Promise<WakeLockSentinel>
}

interface WakeLockSentinel extends EventTarget {
  released: boolean
  type: WakeLockType
  release: () => Promise<void>
}

type WakeLockType = 'screen'

const useWakeLock = (): {
  isSupported: boolean
  isActive: ComputedRef<boolean>
  request: () => void
  release: () => void
} => {
  const isSupported = 'wakeLock' in navigator

  const isActive = ref(false)

  let wakeLockSentinel: WakeLockSentinel | null = null

  const request = (): void => {
    if (!isSupported) return

    void (navigator as NavigatorWithWakeLock).wakeLock.request('screen').then((wakeLock) => {
      wakeLockSentinel = wakeLock
      isActive.value = !wakeLockSentinel.released
    })
  }

  const release = (): void => {
    if (!isSupported) return

    if (wakeLockSentinel === null) return

    void wakeLockSentinel.release().then(() => {
      isActive.value = wakeLockSentinel !== null ? !wakeLockSentinel.released : false
      wakeLockSentinel = null
    })
  }

  useEventListener(document, 'visibilitychange', () => {
    if (!isSupported) return

    if (wakeLockSentinel === null) return

    void (navigator as NavigatorWithWakeLock).wakeLock.request('screen').then((wakeLock) => {
      isActive.value = !wakeLock.released
    })
  })

  return {
    isSupported,
    isActive: computed(() => isActive.value),
    request,
    release,
  }
}

export default useWakeLock
