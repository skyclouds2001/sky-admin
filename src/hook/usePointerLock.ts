import { computed, type ComputedRef, ref } from 'vue'
import { useEventListener } from '@/hook'

const usePointerLock = (
  target: HTMLElement = document.documentElement
): {
  isSupported: boolean
  isPointerLock: ComputedRef<boolean>
  lock: () => Promise<void>
  unlock: () => Promise<void>
  trigger: () => Promise<void>
} => {
  const isSupported = 'pointerLockElement' in document && 'requestPointerLock' in HTMLElement.prototype && 'exitPointerLock' in document

  const isPointerLock = ref(document.pointerLockElement === target)

  const lock = async (): Promise<void> => {
    if (!isSupported) return

    await target.requestPointerLock()

    isPointerLock.value = true
  }

  const unlock = async (): Promise<void> => {
    if (!isSupported) return

    document.exitPointerLock()

    isPointerLock.value = false
  }

  const trigger = async (): Promise<void> => {
    await (isPointerLock.value ? unlock() : lock())
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
