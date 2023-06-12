import { readonly, ref, type Ref, unref, watch } from 'vue'
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

  const isPictureInPicture = ref(document.pictureInPictureElement === unref(target) && document.pictureInPictureElement !== null)

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

  watch(
    target,
    (target) => {
      if (!isSupported) return

      const el = unref(target)
      if (el === null) return

      useEventListener<HTMLVideoElement, HTMLVideoElementEventMap, 'enterpictureinpicture'>(el, 'enterpictureinpicture', () => {
        isPictureInPicture.value = document.pictureInPictureElement === unref(target) && document.pictureInPictureElement !== null
      })

      useEventListener<HTMLVideoElement, HTMLVideoElementEventMap, 'leavepictureinpicture'>(el, 'leavepictureinpicture', () => {
        isPictureInPicture.value = document.pictureInPictureElement === unref(target) && document.pictureInPictureElement !== null
      })
    },
    { immediate: true }
  )

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
