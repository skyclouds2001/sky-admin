import { computed, type ComputedRef, ref } from 'vue'
import { useEventListener } from '@/hook'

const usePointerLock = (
  target: HTMLElement = document.documentElement
): {
  isSupported: boolean
  isPointerLock: ComputedRef<boolean>
  lock: () => void
  unlock: () => void
  trigger: () => void
} => {
  const isSupported = 'pointerLockElement' in document && 'requestPointerLock' in HTMLElement.prototype && 'exitPointerLock' in document

  const isPointerLock = ref(document.pointerLockElement === target)

  const lock = (): void => {
    if (!isSupported) return

    void target.requestPointerLock()
    isPointerLock.value = true
  }

  const unlock = (): void => {
    if (!isSupported) return

    document.exitPointerLock()
    isPointerLock.value = false
  }

  const trigger = (): void => {
    isPointerLock.value ? unlock() : lock()
  }

  if (isSupported) {
    useEventListener(document, 'pointerlockchange', () => {
      isPointerLock.value = document.pointerLockElement === target
    })
  }

  return {
    isSupported,
    isPointerLock: computed(() => isPointerLock.value),
    lock,
    unlock,
    trigger,
  }
}

export default usePointerLock
