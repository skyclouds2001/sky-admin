import { getCurrentScope, onScopeDispose } from 'vue'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const events = new Map<string | number | symbol, Set<any>>()

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useEventBus = <const T extends string | number | symbol, P = any>(
  key: T
): {
  on: (listener: (event: T, payload: P) => void) => void
  off: (listener: (event: T, payload: P) => void) => void
  once: (listener: (event: T, payload: P) => void) => void
  emit: (event: T, payload: P) => void
  reset: () => void
} => {
  const scope = getCurrentScope()

  const on = (listener: (event: T, payload: P) => void): void => {
    const listeners = events.get(key) ?? new Set()
    listeners.add(listener)
    events.set(key, listeners)

    if (scope !== undefined) {
      onScopeDispose(() => {
        off(listener)
      })
    }
  }

  const off = (listener: (event: T, payload: P) => void): void => {
    const listeners = events.get(key)
    listeners?.delete(listener)
    events.set(key, listeners ?? new Set())
  }

  const once = (listener: (event: T, payload: P) => void): void => {
    on((event, payload) => {
      off(listener)
      listener(event, payload)
    })
  }

  const emit = (event: T, payload: P): void => {
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
