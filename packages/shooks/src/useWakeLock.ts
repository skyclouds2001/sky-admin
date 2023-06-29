import { readonly, ref, type Ref } from 'vue'
import { useEventListener } from '.'

const useWakeLock = (): {
  isSupported: boolean
  isActive: Readonly<Ref<boolean>>
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
    isActive.value = !wakeLockSentinel.released
  }

  const release = async (): Promise<void> => {
    if (!isSupported) return

    if (wakeLockSentinel === null) return

    await wakeLockSentinel.release()

    isActive.value = wakeLockSentinel !== null ? !wakeLockSentinel.released : false
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
      isActive.value = wakeLock.released
    })
  })

  return {
    isSupported,
    isActive: readonly(isActive),
    request,
    release,
    toggle,
  }
}

export default useWakeLock
