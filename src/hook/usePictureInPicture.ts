import { computed, type ComputedRef, ref, shallowRef, type ShallowRef } from 'vue'
import { useEventListener } from '@/hook'

const usePictureInPicture = (
  target: HTMLVideoElement
): {
  isSupported: boolean
  isPictureInPicture: ComputedRef<boolean>
  currentWindow: ShallowRef<PictureInPictureWindow | null>
  enter: () => Promise<void>
  exit: () => Promise<void>
  toggle: () => Promise<void>
} => {
  const isSupported = 'pictureInPictureElement' in Document && 'requestPictureInPicture' in HTMLVideoElement && 'exitPictureInPicture' in Document && document.pictureInPictureEnabled && !target.disablePictureInPicture

  const isPictureInPicture = ref(document.pictureInPictureElement === target)

  const wd = shallowRef<PictureInPictureWindow | null>(null)

  const enter = async (): Promise<void> => {
    if (!isSupported) return

    const w = await target.requestPictureInPicture()
    wd.value = w

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
    currentWindow: wd,
    enter,
    exit,
    toggle,
  }
}

export default usePictureInPicture
