import { type ShallowRef, type Ref, type UnwrapRef } from 'vue'
import { useStorage } from '@/hook'

const useSessionStorage = <T extends number | string | boolean | object | null>(
  key: string,
  options: {
    prefix?: boolean | string
    shallow?: boolean
  } = {}
): Ref<UnwrapRef<T> | null> | ShallowRef<T | null> => {
  return useStorage<T>(key, window.sessionStorage, options)
}

export default useSessionStorage
