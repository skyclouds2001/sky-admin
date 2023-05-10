import { type ShallowRef, type Ref, type UnwrapRef } from 'vue'
import { useStorage } from '@/hook'

const useSessionStorage = <T extends number | string | boolean | object | null>(
  key: string,
  options: {
    prefix?: boolean | string
    shallow?: boolean
  } = {}
): {
  data: Ref<UnwrapRef<T> | null> | ShallowRef<T | null>
} => {
  const { data } = useStorage<T>(key, window.sessionStorage, options)

  return {
    data,
  }
}

export default useSessionStorage
