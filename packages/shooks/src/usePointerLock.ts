import { readonly, ref, type Ref } from 'vue'
import { useEventListener } from '.'

const usePointerLock = (
  target: HTMLElement = document.documentElement,
  options?: PointerLockOptions,
  onError?: (e: Event) => void
): {
  isSupported: boolean
  isPointerLock: Readonly<Ref<boolean>>
  lock: () => Promise<void>
  unlock: () => Promise<void>
  trigger: () => Promise<void>
} => {
  const isSupported = 'pointerLockElement' in document && 'requestPointerLock' in HTMLElement.prototype && 'exitPointerLock' in document

  const isPointerLock = ref(document.pointerLockElement === target)

  const lock = async (): Promise<void> => {
    if (!isSupported) return

    await target.requestPointerLock(options)

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

    if (onError !== undefined) {
      useEventListener(document, 'pointerlockerror', onError)
    }
  }

  return {
    isSupported,
    isPointerLock: readonly(isPointerLock),
    lock,
    unlock,
    trigger,
  }
}

export default usePointerLock
