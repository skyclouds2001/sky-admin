import { ref, type Ref, shallowRef, type ShallowRef } from 'vue'
import { tryOnScopeDispose } from '.'

const useWebWorker = <D>(
  source: string,
  options: WorkerOptions
): {
  worker: ShallowRef<Worker | null>
  data: Ref<D | null>
  postMessage: (message: D) => void
  terminate: () => void
} => {
  const worker = shallowRef<Worker>(new window.Worker(source, options))

  const data = ref<D | null>(null) as Ref<D | null>

  const postMessage = (message: D): void => {
    worker.value?.postMessage(message)
  }

  const terminate = (): void => {
    worker.value?.terminate()
  }

  worker.value?.addEventListener('message', (e) => {
    data.value = e.data
  })

  tryOnScopeDispose(() => {
    worker.value?.terminate()
  })

  return {
    worker,
    data,
    postMessage,
    terminate,
  }
}

export default useWebWorker
