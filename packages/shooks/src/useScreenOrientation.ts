import { readonly, ref, type Ref } from 'vue'
import { useEventListener } from '.'

const useScreenOrientation = (): {
  isSupported: boolean
  type: Readonly<Ref<OrientationType>>
  angel: Readonly<Ref<number>>
  lock: (type: OrientationLockType) => Promise<void>
  unlock: () => Promise<void>
} => {
  const isSupported = 'screen' in window && 'orientation' in screen

  const type = ref<OrientationType>(screen.orientation.type)
  const angel = ref(screen.orientation.angle)

  const lock = async (type: OrientationLockType): Promise<void> => {
    await screen.orientation.lock(type)
  }

  const unlock = async (): Promise<void> => {
    screen.orientation.unlock()
  }

  useEventListener<ScreenOrientation, ScreenOrientationEventMap, 'change'>(screen.orientation, 'change', () => {
    type.value = screen.orientation.type
    angel.value = screen.orientation.angle
  })

  return {
    isSupported,
    type: readonly(type),
    angel: readonly(angel),
    lock,
    unlock,
  }
}

export default useScreenOrientation
