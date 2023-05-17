import { getCurrentScope, onScopeDispose } from 'vue'

type UseEventListenerOptions = AddEventListenerOptions | EventListenerOptions | boolean

function useEventListener<E extends keyof WindowEventMap>(target: Window, event: E, listener: (this: Window, e: WindowEventMap[E]) => void, options?: UseEventListenerOptions): void

function useEventListener<E extends keyof DocumentEventMap>(target: Document, event: E, listener: (this: Document, e: DocumentEventMap[E]) => void, options?: UseEventListenerOptions): void

function useEventListener<E extends keyof ShadowRootEventMap>(target: ShadowRoot, event: E, listener: (this: ShadowRoot, e: ShadowRootEventMap[E]) => void, options?: UseEventListenerOptions): void

function useEventListener<E extends string>(target: EventTarget, event: E, listener: (this: EventTarget, e: Event) => void, options?: UseEventListenerOptions): void

function useEventListener<T extends EventTarget, M extends Record<string, any>, E extends keyof M>(target: T, event: E, listener: (this: T, e: M[E]) => void, options?: UseEventListenerOptions): void

/**
 * 自动在组件绑定时注册事件回调并在组件卸载时移除事件回调方法
 * @param target 事件目标对象
 * @param event 事件名称
 * @param listener 事件回调方法
 * @param options 事件选项
 */
function useEventListener(target: EventTarget, event: string, listener: (this: EventTarget, e: Event) => void, options?: UseEventListenerOptions): void {
  target.addEventListener(event, listener, options)
  if (getCurrentScope() !== undefined) {
    onScopeDispose(() => {
      target.removeEventListener(event, listener, options)
    })
  }
}

export default useEventListener
