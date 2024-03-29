import { ref, type Ref } from 'vue'

const useApi = <D = unknown, E = unknown, P extends unknown[] = unknown[]>(
  api: (...args: P) => Promise<D>
): {
  loading: Ref<boolean>
  result: Ref<D | null>
  error: Ref<E | null>
  fetch: (...args: P) => Promise<void>
} => {
  const loading = ref(false)

  const result: Ref<D | null> = ref(null)

  const error: Ref<E | null> = ref(null)

  const fetch = (...params: P): Promise<void> => {
    loading.value = true
    return (
      api(...params)
        // eslint-disable-next-line promise/always-return
        .then((data) => {
          result.value = data
          error.value = null
        })
        .catch((error) => {
          error.value = error
        })
        .finally(() => {
          loading.value = false
        })
    )
  }

  return {
    loading,
    result,
    error,
    fetch,
  }
}

export default useApi
