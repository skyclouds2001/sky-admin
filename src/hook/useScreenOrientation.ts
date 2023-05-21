import { computed, type ComputedRef, ref } from 'vue'
import { useEventListener } from '@/hook'

const useScreenOrientation = (): {
  isSupported: boolean
  type: ComputedRef<OrientationType>
  angel: ComputedRef<number>
  lock: (type: OrientationLockType) => void
  unlock: () => void
} => {
  const isSupported = 'screen' in window && 'orientation' in screen

  const type = ref<OrientationType>(screen.orientation.type)
  const angel = ref(screen.orientation.angle)

  const lock = (type: OrientationLockType): void => {
    void screen.orientation.lock(type)
  }

  const unlock = (): void => {
    screen.orientation.unlock()
  }

  useEventListener<ScreenOrientation, ScreenOrientationEventMap, 'change'>(screen.orientation, 'change', () => {
    type.value = screen.orientation.type
    angel.value = screen.orientation.angle
  })

  return {
    isSupported,
    type: computed(() => type.value),
    angel: computed(() => angel.value),
    lock,
    unlock,
  }
}

export default useScreenOrientation
