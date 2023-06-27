import { isRef, readonly, ref, type Ref, unref, watch } from 'vue'
import { useEventListener } from '.'

const usePictureInPicture = (
  target: HTMLVideoElement | Ref<HTMLVideoElement | null>
): {
  isSupported: boolean
  isPictureInPicture: Readonly<Ref<boolean>>
  pictureInPictureWindow: Readonly<Ref<PictureInPictureWindow | null>>
  enter: () => Promise<void>
  exit: () => Promise<void>
  toggle: () => Promise<void>
} => {
  const isSupported = 'pictureInPictureElement' in document && 'requestPictureInPicture' in HTMLVideoElement.prototype && 'exitPictureInPicture' in document && document.pictureInPictureEnabled

  const isPictureInPicture = ref(document.pictureInPictureElement === target && document.pictureInPictureElement !== null)

  const pictureInPictureWindow = ref<PictureInPictureWindow | null>(null)

  const enter = async (): Promise<void> => {
    if (!isSupported) return

    const window = await unref(target)?.requestPictureInPicture()
    pictureInPictureWindow.value = window ?? null

    isPictureInPicture.value = true
  }

  const exit = async (): Promise<void> => {
    if (!isSupported) return

    await document.exitPictureInPicture()
    pictureInPictureWindow.value = null

    isPictureInPicture.value = false
  }

  const toggle = async (): Promise<void> => {
    await (isPictureInPicture.value ? exit() : enter())
  }

  if (isRef(target)) {
    watch(
      target,
      (target) => {
        if (!isSupported) return

        if (target === null) return

        useEventListener<HTMLVideoElement, HTMLVideoElementEventMap, 'enterpictureinpicture'>(target, 'enterpictureinpicture', () => {
          isPictureInPicture.value = document.pictureInPictureElement === target && document.pictureInPictureElement !== null
        })

        useEventListener<HTMLVideoElement, HTMLVideoElementEventMap, 'leavepictureinpicture'>(target, 'leavepictureinpicture', () => {
          isPictureInPicture.value = document.pictureInPictureElement === target && document.pictureInPictureElement !== null
        })
      },
      {
        immediate: true,
      }
    )
  }

  return {
    isSupported,
    isPictureInPicture: readonly(isPictureInPicture),
    pictureInPictureWindow: readonly(pictureInPictureWindow),
    enter,
    exit,
    toggle,
  }
}

export default usePictureInPicture
