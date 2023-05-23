import { computed, type ComputedRef, ref } from 'vue'
import { useEventListener } from '@/hook'

const useWakeLock = (): {
  isSupported: boolean
  isActive: ComputedRef<boolean>
  request: () => Promise<void>
  release: () => Promise<void>
  toggle: () => Promise<void>
} => {
  const isSupported = 'wakeLock' in navigator

  const isActive = ref(false)

  let wakeLockSentinel: WakeLockSentinel | null = null

  const request = async (): Promise<void> => {
    if (!isSupported) return

    const wakeLock = await navigator.wakeLock.request('screen')

    wakeLockSentinel = wakeLock
    isActive.value = wakeLockSentinel.released === false
  }

  const release = async (): Promise<void> => {
    if (!isSupported) return

    if (wakeLockSentinel === null) return

    await wakeLockSentinel.release()

    isActive.value = wakeLockSentinel !== null ? wakeLockSentinel.released === false : false
    wakeLockSentinel = null
  }

  const toggle = async (): Promise<void> => {
    await (isActive.value ? release() : request())
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
