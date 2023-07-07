import { type MaybeRefOrGetter, readonly, ref, type Ref, toValue, watch } from 'vue'
import { tryOnScopeDispose } from '.'

const useObjectURL = (source: MaybeRefOrGetter<File | Blob | MediaSource | null>): Ref<string> => {
  const url = ref<string | null>(null)

  const release = () => {
    if (url.value) {
      URL.revokeObjectURL(url.value)
      url.value = ''
    }
  }

  watch(() => toValue(source), (source) => {
    release()

    if(source) {
      url.value = URL.createObjectURL(source)
    }
  })

  tryOnScopeDispose(release)

  return readonly(url)
}

export default useObjectURL
