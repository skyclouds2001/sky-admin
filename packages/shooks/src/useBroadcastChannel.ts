import { type DeepReadonly, getCurrentScope, onScopeDispose, readonly, ref, type Ref, shallowRef, type ShallowRef, type UnwrapRef, shallowReadonly } from 'vue'
import { useEventListener } from '.'

const useBroadcastChannel = <D = unknown, P = D>(
  name: string
): {
  isSupported: boolean
  isOpen: Readonly<Ref<boolean>>
  data: Readonly<Ref<DeepReadonly<UnwrapRef<D>> | null>>
  error: Readonly<ShallowRef<MessageEvent<D> | null>>
  post: (data: P) => void
  close: () => void
} => {
  const isSupported = 'BroadcastChannel' in window

  const broadcastChannel = new window.BroadcastChannel(name)

  const isOpen = ref(true)

  const data = ref<D | null>(null)

  const error = shallowRef<MessageEvent<D> | null>(null)

  const post = (data: P): void => {
    broadcastChannel.postMessage(data)
  }

  const close = (): void => {
    broadcastChannel.close()
    isOpen.value = false
  }

  useEventListener<BroadcastChannel, BroadcastChannelEventMap, 'message'>(broadcastChannel, 'message', (e) => {
    data.value = e.data
    error.value = null
  })

  useEventListener<BroadcastChannel, BroadcastChannelEventMap, 'messageerror'>(broadcastChannel, 'messageerror', (e) => {
    error.value = e
    data.value = null
  })

  if (getCurrentScope() !== undefined) {
    onScopeDispose(() => {
      close()
    })
  }

  return {
    isSupported,
    isOpen: readonly(isOpen),
    data: readonly(data),
    error: shallowReadonly(error),
    post,
    close,
  }
}

export default useBroadcastChannel
