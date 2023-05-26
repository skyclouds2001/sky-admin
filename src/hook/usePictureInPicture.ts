import { computed, type ComputedRef, ref, shallowRef, type ShallowRef } from 'vue'
import { useEventListener } from '@/hook'

const usePictureInPicture = (
  target: HTMLVideoElement
): {
  isSupported: boolean
  isPictureInPicture: ComputedRef<boolean>
  pictureInPictureWindow: ShallowRef<PictureInPictureWindow | null>
  enter: () => Promise<void>
  exit: () => Promise<void>
  toggle: () => Promise<void>
} => {
  const isSupported = 'pictureInPictureElement' in document && 'requestPictureInPicture' in HTMLVideoElement.prototype && 'exitPictureInPicture' in document && document.pictureInPictureEnabled && !target.disablePictureInPicture

  const isPictureInPicture = ref(document.pictureInPictureElement === target)

  const pictureInPictureWindow = shallowRef<PictureInPictureWindow | null>(null)

  const enter = async (): Promise<void> => {
    if (!isSupported) return

    const window = await target.requestPictureInPicture()
    pictureInPictureWindow.value = window

    isPictureInPicture.value = true
  }

  const exit = async (): Promise<void> => {
    if (!isSupported) return

    await document.exitPictureInPicture()

    isPictureInPicture.value = false
  }

  const toggle = async (): Promise<void> => {
    await (isPictureInPicture.value ? exit() : enter())
  }

  useEventListener<HTMLVideoElement, HTMLVideoElementEventMap, 'enterpictureinpicture'>(target, 'enterpictureinpicture', () => {
    isPictureInPicture.value = document.pictureInPictureElement === target
  })

  useEventListener<HTMLVideoElement, HTMLVideoElementEventMap, 'leavepictureinpicture'>(target, 'leavepictureinpicture', () => {
    isPictureInPicture.value = document.pictureInPictureElement === target
  })

  return {
    isSupported,
    isPictureInPicture: computed(() => isPictureInPicture.value),
    pictureInPictureWindow: computed(() => pictureInPictureWindow.value),
    enter,
    exit,
    toggle,
  }
}

export default usePictureInPicture
