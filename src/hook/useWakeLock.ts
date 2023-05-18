import { computed, type ComputedRef, ref } from 'vue'
import { useEventListener } from '@/hook'

const useWakeLock = (): {
  isSupported: boolean
  isActive: ComputedRef<boolean>
  request: () => void
  release: () => void
  toggle: () => void
} => {
  const isSupported = 'wakeLock' in navigator

  const isActive = ref(false)

  let wakeLockSentinel: WakeLockSentinel | null = null

  const request = (): void => {
    if (!isSupported) return

    void navigator.wakeLock.request('screen').then((wakeLock) => {
      wakeLockSentinel = wakeLock
      isActive.value = wakeLockSentinel.released === false
    })
  }

  const release = (): void => {
    if (!isSupported) return

    if (wakeLockSentinel === null) return

    void wakeLockSentinel.release().then(() => {
      isActive.value = wakeLockSentinel !== null ? wakeLockSentinel.released === false : false
      wakeLockSentinel = null
    })
  }

  const toggle = (): void => {
    isActive.value ? release() : request()
  }

  useEventListener(document, 'visibilitychange', () => {
    if (!isSupported) return

    if (wakeLockSentinel === null) return

    if (document.visibilityState === 'hidden') return

    void navigator.wakeLock.request('screen').then((wakeLock) => {
      isActive.value = wakeLock.released === false
    })
  })

  return {
    isSupported,
    isActive: computed(() => isActive.value),
    request,
    release,
    toggle,
  }
}

export default useWakeLock
