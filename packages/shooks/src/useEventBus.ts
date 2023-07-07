import tryOnScopeDispose from './tryOnScopeDispose'

type Listener<T extends string | number | symbol, P = unknown> = (event: T, payload?: P) => void

const events = new Map<string | number | symbol, Set<any>>()

const useEventBus = <const T extends string | number | symbol, P = any>(
  key: T
): {
  on: (listener: Listener<T, P>) => void
  off: (listener: Listener<T, P>) => void
  once: (listener: Listener<T, P>) => void
  emit: (event?: T, payload?: P) => void
  reset: () => void
} => {
  const on = (listener: Listener<T, P>): void => {
    const listeners = events.get(key) ?? new Set()
    listeners.add(listener)
    events.set(key, listeners)

    tryOnScopeDispose(() => {
      off(listener)
    })
  }

  const off = (listener: Listener<T, P>): void => {
    const listeners = events.get(key)
    listeners?.delete(listener)
    events.set(key, listeners ?? new Set())
  }

  const once = (listener: Listener<T, P>): void => {
    on((event, payload) => {
      off(listener)
      listener(event, payload)
    })
  }

  const emit = (event?: T, payload?: P): void => {
    events.get(key)?.forEach((listener) => listener(event, payload))
  }

  const reset = (): void => {
    events.delete(key)
  }

  return {
    on,
    off,
    once,
    emit,
    reset,
  }
}

export default useEventBus
