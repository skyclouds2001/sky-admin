import { ref, watch, type Ref } from 'vue'

const useStorage = (
  id: string,
  type?: 'session' | 'local'
): {
  data: Ref<string | null>
} => {
  const storage = type === 'session' ? window.sessionStorage : window.localStorage

  const data = ref<string | null>(storage.getItem(id))

  watch(data, (val) => {
    if (val !== null) storage.setItem(id, val)
  })

  return {
    data,
  }
}

export default useStorage
