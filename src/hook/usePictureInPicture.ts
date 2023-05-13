import { ref, type Ref, shallowRef, type ShallowRef } from 'vue'

const usePictureInPicture = (
  target: HTMLVideoElement
): {
  isSupported: boolean
  isActive: Ref<boolean>
  window: ShallowRef<PictureInPictureWindow | null>
  enter: () => void
  exit: () => void
  toggle: () => void
} => {
  const isSupported = 'requestPictureInPicture' in HTMLVideoElement && 'exitPictureInPicture' in Document && document.pictureInPictureEnabled && !target.disablePictureInPicture

  const isActive = ref(document.pictureInPictureElement === target)

  const wd = shallowRef<PictureInPictureWindow | null>(null)

  const enter = (): void => {
    void target.requestPictureInPicture().then((w) => {
      wd.value = w
    })
    isActive.value = true
  }

  const exit = (): void => {
    void document.exitPictureInPicture()
    isActive.value = false
  }

  const toggle = (): void => {
    isActive.value ? exit() : enter()
  }

  return {
    isSupported,
    isActive,
    window: wd,
    enter,
    exit,
    toggle,
  }
}

export default usePictureInPicture
