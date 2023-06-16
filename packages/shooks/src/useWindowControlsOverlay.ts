import { readonly, ref, type Ref } from 'vue'
import { useEventListener } from '.'

const useWindowControlsOverlay = (): {
  isSupported: boolean
  visible: Readonly<Ref<boolean>>
  rect: Readonly<Ref<DOMRect>>
} => {
  const isSupported = 'windowControlsOverlay' in navigator

  const visible = ref((navigator as NavigatorWithWindowControlsOverlay).windowControlsOverlay.visible)

  const rect = ref((navigator as NavigatorWithWindowControlsOverlay).windowControlsOverlay.getTitlebarAreaRect())

  useEventListener<WindowControlsOverlay, WindowControlsOverlayEventMap, 'geometrychange'>((navigator as NavigatorWithWindowControlsOverlay).windowControlsOverlay, 'geometrychange', (e) => {
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

interface NavigatorWithWindowControlsOverlay extends Navigator {
  readonly windowControlsOverlay: WindowControlsOverlay
}

interface WindowControlsOverlay extends EventTarget {
  readonly visible: boolean
  getTitlebarAreaRect: () => DOMRect
  ongeometrychange: ((this: WindowControlsOverlay, ev: WindowControlsOverlayGeometryChangeEvent) => void) | null
  addEventListener: (<K extends keyof WindowControlsOverlayEventMap>(type: K, listener: (this: WindowControlsOverlay, ev: WindowControlsOverlayEventMap[K]) => void, options?: boolean | AddEventListenerOptions) => void) & ((type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions) => void)
  removeEventListener: (<K extends keyof WindowControlsOverlayEventMap>(type: K, listener: (this: WindowControlsOverlay, ev: WindowControlsOverlayEventMap[K]) => void, options?: boolean | EventListenerOptions) => void) & ((type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions) => void)
}

interface WindowControlsOverlayEventMap {
  geometrychange: WindowControlsOverlayGeometryChangeEvent
}

interface WindowControlsOverlayGeometryChangeEvent extends Event {
  readonly titlebarAreaRect: DOMRect
  readonly visible: boolean
}
