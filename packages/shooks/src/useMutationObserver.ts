import { tryOnScopeDispose } from '.'

const useMutationObserver = (
  target: Node,
  callback: MutationCallback,
  options?: MutationObserverInit
): {
  isSupported: boolean
  stop: () => void
} => {
  const isSupported = 'MutationObserver' in window

  let observer: MutationObserver | null = null

  const stop = (): void => {
    if (observer !== null) {
      observer.disconnect()
      observer = null
    }
  }

  if (isSupported) {
    observer = new window.MutationObserver(callback)

    observer.observe(target, options)

    tryOnScopeDispose(stop)
  }

  return {
    isSupported,
    stop,
  }
}

export default useMutationObserver
