import { onMounted, onBeforeUnmount } from 'vue'

// @ts-expect-error todo
const useEventListener = <ET extends EventTarget = EventTarget, T extends string = ET extends Window ? keyof WindowEventMap : ET extends Document ? keyof DocumentEventMap : string, E extends Event = T extends keyof WindowEventMap ? WindowEventMap[T] : T extends keyof DocumentEventMap ? DocumentEventMap[T] : Event, ECB extends EventListener = (this: ET, evt: E) => void>(target: ET, type: T, callback: ECB, options?: AddEventListenerOptions | EventListenerOptions | boolean): void => {
  onMounted(() => {
    target.addEventListener(type, callback, options)
  })
  onBeforeUnmount(() => {
    target.removeEventListener(type, callback, options)
  })
}

export default useEventListener
