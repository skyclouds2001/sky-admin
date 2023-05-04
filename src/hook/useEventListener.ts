import { onMounted, onBeforeUnmount } from 'vue'

const useEventListener = <ET extends EventTarget = EventTarget, T extends string = ET extends Window ? keyof WindowEventMap : ET extends Document ? keyof DocumentEventMap : string, E extends Event = T extends keyof WindowEventMap ? WindowEventMap[T] : T extends keyof DocumentEventMap ? DocumentEventMap[T] : Event>(target: ET, type: T, callback: (this: ET, e: E) => void, options?: AddEventListenerOptions | EventListenerOptions | boolean): void => {
  onMounted(() => {
    target.addEventListener(type, callback, options)
  })
  onBeforeUnmount(() => {
    target.removeEventListener(type, callback, options)
  })
}

export default useEventListener
