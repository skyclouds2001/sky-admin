import { type ShallowRef, type Ref, type UnwrapRef } from 'vue'
import { useStorage } from '@/hook'

const useLocalStorage = <T extends number | string | boolean | object | null>(
  key: string,
  options: {
    prefix?: boolean | string
    shallow?: boolean
  } = {}
): {
  data: Ref<UnwrapRef<T> | null> | ShallowRef<T | null>
} => {
  const { data } = useStorage<T>(key, window.localStorage, options)

  return {
    data,
  }
}

export default useLocalStorage
