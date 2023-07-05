import { ref, type Ref, shallowRef, type ShallowRef } from 'vue'
import { tryOnScopeDispose } from '.'

const useWebSocket = <D extends string | ArrayBuffer | Blob = string>(
  url: string | URL,
  options: {
    immediate?: boolean
    autoClose?: boolean
    protocols?: string | string[]
    onOpen?: (e: Event) => void
    onClose?: (e: CloseEvent) => void
    onMessage?: (e: MessageEvent<D>) => void
    onError?: (e: Event) => void
  } = {}
): {
  ws: ShallowRef<WebSocket | null>
  data: Ref<D | null>
  status: Ref<WebSocket['CONNECTING' | 'OPEN' | 'CLOSING' | 'CLOSED']>
  open: () => void
  close: (code?: number, reason?: string) => void
  send: (message: D) => void
} => {
  const { immediate = true, autoClose = true, protocols, onOpen, onClose, onMessage, onError } = options

  const ws = shallowRef<WebSocket | null>(null)

  const data = ref<D | null>(null) as Ref<D | null>

  const status = ref<WebSocket['CONNECTING' | 'OPEN' | 'CLOSING' | 'CLOSED']>(WebSocket.CLOSED)

  const open = (): void => {
    if (ws.value !== null || status.value === WebSocket.OPEN) return

    ws.value = new WebSocket(url, protocols)
    status.value = WebSocket.CONNECTING

    ws.value.addEventListener('open', (e) => {
      status.value = WebSocket.OPEN
      onOpen?.(e)
    })

    ws.value.addEventListener('close', (e) => {
      status.value = WebSocket.CLOSED
      onClose?.(e)

      ws.value = null
    })

    ws.value.addEventListener('message', (e) => {
      data.value = e.data

      onMessage?.(e)
    })

    ws.value.addEventListener('error', (e) => {
      onError?.(e)
    })
  }

  const close = (code?: number, reason?: string): void => {
    if (ws.value === null) return

    ws.value.close(code, reason)
    status.value = WebSocket.CLOSING
  }

  const send = (message: D): void => {
    if (ws.value === null || status.value !== WebSocket.OPEN) return

    ws.value.send(message)
  }

  if (immediate) {
    open()
  }

  if (autoClose) {
    tryOnScopeDispose(close)
  }

  return {
    ws,
    data,
    status,
    open,
    close,
    send,
  }
}

export default useWebSocket
