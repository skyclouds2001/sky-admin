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

declare global {
  let WindowControlsOverlay: WindowControlsOverlay
  let WindowControlsOverlayGeometryChangeEvent: WindowControlsOverlayGeometryChangeEvent

  interface Window {
    WindowControlsOverlay: WindowControlsOverlay
    WindowControlsOverlayGeometryChangeEvent: WindowControlsOverlayGeometryChangeEvent
  }

  interface Navigator {
    readonly windowControlsOverlay: WindowControlsOverlay
  }

  interface WindowControlsOverlay extends EventTarget {
    readonly visible: boolean
    getTitlebarAreaRect: () => DOMRect
    ongeometrychange: ((this: WindowControlsOverlay, ev: WindowControlsOverlayGeometryChangeEvent) => any) | null
    addEventListener: (<K extends keyof WindowControlsOverlayEventMap>(type: K, listener: (this: WindowControlsOverlay, ev: WindowControlsOverlayEventMap[K]) => any, options?: boolean | AddEventListenerOptions) => void) & ((type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions) => void)
    removeEventListener: (<K extends keyof WindowControlsOverlayEventMap>(type: K, listener: (this: WindowControlsOverlay, ev: WindowControlsOverlayEventMap[K]) => any, options?: boolean | EventListenerOptions) => void) & ((type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions) => void)
  }

  interface WindowControlsOverlayGeometryChangeEvent extends Event {
    readonly titlebarAreaRect: DOMRect
    readonly visible: boolean
  }
}

interface WindowControlsOverlayEventMap {
  geometrychange: WindowControlsOverlayGeometryChangeEvent
}
