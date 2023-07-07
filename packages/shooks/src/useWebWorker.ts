import { ref, shallowRef } from 'vue'
import { tryOnScopeDispose } from '.'

const useWebWorker = <D>(source: string, options: WorkerOptions) => {
  const worker = shallowRef<Worker>(new window.Worker(source, options))

  const data = ref<D | null>(null)

  const postMessage = (message: D, transfer?: Transferable[]) => {
    worker.value?.postMessage(message, transfer ?? {})
  }

  const terminate = () => {
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
