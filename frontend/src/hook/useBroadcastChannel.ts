import { computed, type ComputedRef, type DeepReadonly, getCurrentScope, onScopeDispose, readonly, ref, type Ref, shallowRef, type UnwrapRef } from 'vue'
import { useEventListener } from '@/hook'

const useBroadcastChannel = <D = unknown, P = D>(
  name: string
): {
  isSupported: boolean
  isOpen: ComputedRef<boolean>
  data: Readonly<Ref<DeepReadonly<UnwrapRef<D>> | null>>
  error: Readonly<Ref<DeepReadonly<UnwrapRef<MessageEvent>> | null>>
  post: (data: P) => void
  close: () => void
} => {
  const isSupported = 'BroadcastChannel' in window

  const broadcastChannel = new window.BroadcastChannel(name)

  const isOpen = ref(true)

  const data = ref<D | null>(null)

  const error = shallowRef<MessageEvent | null>(null)

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
    isOpen: computed(() => isOpen.value),
    data: readonly(data),
    error: readonly(error),
    post,
    close,
  }
}

export default useBroadcastChannel
