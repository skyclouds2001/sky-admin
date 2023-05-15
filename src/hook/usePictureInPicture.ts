import { computed, type ComputedRef, ref, shallowRef, type ShallowRef } from 'vue'
import { useEventListener } from '@/hook'

const usePictureInPicture = (
  target: HTMLVideoElement
): {
  isSupported: boolean
  isPictureInPicture: ComputedRef<boolean>
  currentWindow: ShallowRef<PictureInPictureWindow | null>
  enter: () => void
  exit: () => void
  toggle: () => void
} => {
  const isSupported = 'pictureInPictureElement' in Document && 'requestPictureInPicture' in HTMLVideoElement && 'exitPictureInPicture' in Document && document.pictureInPictureEnabled && !target.disablePictureInPicture

  const isPictureInPicture = ref(document.pictureInPictureElement === target)

  const wd = shallowRef<PictureInPictureWindow | null>(null)

  const enter = (): void => {
    if (!isSupported) return

    void target.requestPictureInPicture().then((w) => {
      wd.value = w
    })
    isPictureInPicture.value = true
  }

  const exit = (): void => {
    if (!isSupported) return

    void document.exitPictureInPicture()
    isPictureInPicture.value = false
  }

  const toggle = (): void => {
    isPictureInPicture.value ? exit() : enter()
  }

  useEventListener(target, 'enterpictureinpicture', () => {
    isPictureInPicture.value = document.pictureInPictureElement === target
  })

  useEventListener(target, 'leavepictureinpicture', () => {
    isPictureInPicture.value = document.pictureInPictureElement === target
  })

  return {
    isSupported,
    isPictureInPicture: computed(() => isPictureInPicture.value),
    currentWindow: wd,
    enter,
    exit,
    toggle,
  }
}

export default usePictureInPicture
