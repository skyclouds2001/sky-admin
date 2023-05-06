import { onMounted, onBeforeUnmount } from 'vue'

const useEventListener = <ET extends EventTarget = EventTarget, T extends string = ET extends Window ? keyof WindowEventMap : ET extends Document ? keyof DocumentEventMap : string, E extends Event = ET extends Window ? (T extends keyof WindowEventMap ? WindowEventMap[T] : never) : ET extends Document ? (T extends keyof DocumentEventMap ? DocumentEventMap[T] : never) : Event>(target: ET, type: T, callback: (this: ET, evt: E) => void, options?: AddEventListenerOptions | EventListenerOptions | boolean): void => {
  onMounted(() => {
    // @ts-expect-error todo
    target.addEventListener(type, callback, options)
  })
  onBeforeUnmount(() => {
    // @ts-expect-error todo
    target.removeEventListener(type, callback, options)
  })
}

export default useEventListener
