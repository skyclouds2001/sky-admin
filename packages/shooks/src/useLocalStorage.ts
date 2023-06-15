import { type ShallowRef, type Ref, type UnwrapRef } from 'vue'
import { useStorage } from '.'

const useLocalStorage = <T extends number | string | boolean | object | null>(
  key: string,
  options: {
    prefix?: boolean | string
    shallow?: boolean
    deep?: boolean
    watchChange?: boolean
  } = {}
): Ref<UnwrapRef<T> | null> | ShallowRef<T | null> => {
  return useStorage<T>(key, { ...options, storage: window.localStorage })
}

export default useLocalStorage
