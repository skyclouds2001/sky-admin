import { computed, type ComputedRef, ref } from 'vue'
import { useEventListener } from '.'

interface NavigatorWithWakeLock extends Navigator {
  readonly wakeLock: WakeLock
}

interface WakeLock {
  request: (type?: WakeLockType) => Promise<WakeLockSentinel>
}

type WakeLockType = 'screen'

interface WakeLockSentinel extends EventTarget {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onrelease: ((this: WakeLockSentinel, ev: Event) => any) | null
  readonly released: boolean
  readonly type: WakeLockType
  release: () => Promise<void>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  addEventListener: (<K extends keyof WakeLockSentinelEventMap>(type: K, listener: (this: WakeLockSentinel, ev: WakeLockSentinelEventMap[K]) => any, options?: boolean | AddEventListenerOptions) => void) & ((type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions) => void)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  removeEventListener: (<K extends keyof WakeLockSentinelEventMap>(type: K, listener: (this: WakeLockSentinel, ev: WakeLockSentinelEventMap[K]) => any, options?: boolean | EventListenerOptions) => void) & ((type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions) => void)
}

interface WakeLockSentinelEventMap {
  release: Event
}

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

    const wakeLock = await (navigator as NavigatorWithWakeLock).wakeLock.request('screen')

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

    void (navigator as NavigatorWithWakeLock).wakeLock.request('screen').then((wakeLock) => {
      isActive.value = wakeLock.released
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
