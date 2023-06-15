import { tryOnScopeDispose } from '.'

const useResizeObserver = (
  target: Element | Element[],
  callback: ResizeObserverCallback
): {
  isSupported: boolean
  stop: () => void
} => {
  const isSupported = 'ResizeObserver' in window

  let observer: ResizeObserver | null = null

  const stop = (): void => {
    if (Array.isArray(target)) {
      target.forEach((v) => {
        observer?.unobserve(v)
      })
    } else {
      observer?.unobserve(target)
    }
  }

  if (isSupported) {
    observer = new window.ResizeObserver(callback)

    if (Array.isArray(target)) {
      target.forEach((v) => {
        observer?.observe(v)
      })
    } else {
      observer?.observe(target)
    }

    tryOnScopeDispose(() => {
      if (observer !== null) {
        observer.disconnect()
        observer = null
      }
    })
  }

  return {
    isSupported,
    stop,
  }
}

export default useResizeObserver
