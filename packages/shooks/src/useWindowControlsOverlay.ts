import { readonly, ref, type Ref } from 'vue'
import { useEventListener } from '.'

const useWindowControlsOverlay = (): {
  isSupported: boolean
  visible: Readonly<Ref<boolean>>
  rect: Readonly<Ref<DOMRect>>
} => {
  const isSupported = 'windowControlsOverlay' in navigator

  const visible = ref(navigator.windowControlsOverlay.visible)

  const rect = ref(navigator.windowControlsOverlay.getTitlebarAreaRect())

  useEventListener<WindowControlsOverlay, WindowControlsOverlayEventMap, 'geometrychange'>(navigator.windowControlsOverlay, 'geometrychange', (e) => {
    visible.value = e.visible
    rect.value = e.titlebarAreaRect
  })

  return {
    isSupported,
    visible: readonly(visible),
    rect: readonly(rect),
  }
}

export default useWindowControlsOverlay
