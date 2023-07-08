import { ref, type Ref, shallowRef, type ShallowRef } from 'vue'
import { tryOnScopeDispose } from '.'

const useWebSocket = <D extends string | ArrayBuffer | Blob = string>(
  url: string | URL,
  options: {
    immediate?: boolean
    autoClose?: boolean
    protocols?: string | string[]
    autoReconnect?:
      | boolean
      | {
          retries?: number
          delay?: number
          onFail?: (e: CloseEvent) => void
        }
    onOpen?: (e: Event) => void
    onClose?: (e: CloseEvent) => void
    onMessage?: (e: MessageEvent<D>) => void
    onError?: (e: Event) => void
  } = {}
): {
  websocket: ShallowRef<WebSocket | null>
  data: Ref<D | null>
  status: Ref<WebSocket['CONNECTING' | 'OPEN' | 'CLOSING' | 'CLOSED']>
  open: () => void
  close: (code?: number, reason?: string) => void
  send: (message: D) => void
} => {
  const { immediate = true, autoClose = true, protocols, autoReconnect, onOpen, onClose, onMessage, onError } = options

  const websocket = shallowRef<WebSocket | null>(null)

  const data = ref<D | null>(null) as Ref<D | null>

  const status = ref<WebSocket['CONNECTING' | 'OPEN' | 'CLOSING' | 'CLOSED']>(WebSocket.CLOSED)

  let manualClose = false
  let retry = 0

  const open = (): void => {
    if (websocket.value !== null || status.value === WebSocket.OPEN) return

    const ws = new WebSocket(url, protocols)

    manualClose = false
    retry = 0

    ws.addEventListener('open', (e) => {
      status.value = WebSocket.OPEN

      onOpen?.(e)
    })

    ws.addEventListener('close', (e) => {
      status.value = WebSocket.CLOSED
      websocket.value = null

      onClose?.(e)

      if (!manualClose && autoReconnect !== undefined) {
        const { retries = Infinity, delay = 1000, onFail = console.log } = typeof autoReconnect === 'object' ? autoReconnect : {}

        if (Number.isFinite(retries) || retry < retries) {
          setTimeout(open, delay)
        } else {
          onFail(e)
        }

        ++retry
      }
    })

    ws.addEventListener('message', (e) => {
      data.value = e.data

      onMessage?.(e)
    })

    ws.addEventListener('error', (e) => {
      onError?.(e)
    })

    status.value = WebSocket.CONNECTING
    websocket.value = ws
  }

  const close = (code?: number, reason?: string): void => {
    if (websocket.value === null) return

    websocket.value.close(code, reason)
    status.value = WebSocket.CLOSING
    manualClose = true
  }

  const send = (message: D): void => {
    if (websocket.value === null || status.value !== WebSocket.OPEN) return

    websocket.value.send(message)
  }

  if (immediate) {
    open()
  }

  if (autoClose) {
    tryOnScopeDispose(close)
  }

  return {
    websocket,
    data,
    status,
    open,
    close,
    send,
  }
}

export default useWebSocket
