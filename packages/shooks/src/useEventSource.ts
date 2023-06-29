import { ref, type Ref, shallowRef, type ShallowRef } from 'vue'
import { tryOnScopeDispose } from '.'

const useEventSource = (
  url: string | URL,
  events: string[] = [],
  options: {
    immediate?: boolean
    autoClose?: boolean
    withCredentials?: boolean
    onError?: (e: Event) => void
    onMessage?: (e: MessageEvent) => void
    onOpen?: (e: Event) => void
  } = {}
): {
  es: ShallowRef<EventSource | null>
  event: Ref<string | null>
  message: Ref<string | null>
  status: Ref<EventSource['CONNECTING' | 'OPEN' | 'CLOSED']>
  error: ShallowRef<Event | null>
  open: () => void
  close: () => void
} => {
  const { immediate = true, autoClose = true, withCredentials = false, onError, onMessage, onOpen } = options

  const es = shallowRef<EventSource | null>(null)

  const event = ref<string | null>(null)

  const message = ref<string | null>(null)

  const status = ref<EventSource['CONNECTING' | 'OPEN' | 'CLOSED']>(EventSource.CLOSED)

  const error = shallowRef<Event | null>(null)

  const open = (): void => {
    if (es.value !== null || es.value !== EventSource.CLOSED) return

    es.value = new EventSource(url, {
      withCredentials,
    })
    status.value = EventSource.CONNECTING

    es.value.addEventListener('error', (e) => {
      status.value = EventSource.CLOSED
      error.value = e
      onError?.(e)
    })

    es.value.addEventListener('message', (e) => {
      message.value = e.data
      event.value = 'message'
      onMessage?.(e)
    })

    es.value.addEventListener('open', (e) => {
      status.value = EventSource.OPEN
      error.value = null
      onOpen?.(e)
    })

    events.forEach((ev) => {
      es.value?.addEventListener(ev, (e) => {
        message.value = e.data
        event.value = ev
        onMessage?.(e)
      })
    })
  }

  const close = (): void => {
    if (es.value === null || status.value === EventSource.CLOSED) return

    es.value.close()
    es.value = null
    status.value = EventSource.CLOSED
  }

  if (immediate) {
    open()
  }

  if (autoClose) {
    tryOnScopeDispose(close)
  }

  return {
    es,
    event,
    message,
    status,
    error,
    open,
    close,
  }
}

export default useEventSource
