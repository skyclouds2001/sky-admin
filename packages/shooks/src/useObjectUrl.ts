import { type MaybeRefOrGetter, readonly, ref, type Ref, toValue, watch } from 'vue'
import { tryOnScopeDispose } from '.'

const useObjectURL = (source: MaybeRefOrGetter<File | Blob | MediaSource | null>): Readonly<Ref<string | null>> => {
  const url = ref<string | null>(null)

  const release = (): void => {
    if (url.value !== null) {
      URL.revokeObjectURL(url.value)
      url.value = ''
    }
  }

  watch(
    () => toValue(source),
    (source) => {
      release()

      if (source !== null) {
        url.value = URL.createObjectURL(source)
      }
    },
    {
      immediate: true,
    }
  )

  tryOnScopeDispose(release)

  return readonly(url)
}

export default useObjectURL
