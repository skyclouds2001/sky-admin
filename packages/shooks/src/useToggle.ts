import { type MaybeRefOrGetter, readonly, ref, type Ref, toValue, watch } from 'vue'

const useToggle = <const T = true, const F = false>(
  options: {
    truthy?: MaybeRefOrGetter<T>
    falsy?: MaybeRefOrGetter<F>
    initial?: T | F
  } = {}
): {
  value: Readonly<Ref<T | F>>
  toggle: (val?: T | F) => void
} => {
  const { truthy = true, falsy = false, initial = falsy } = options

  const value = ref(initial) as Ref<T | F>

  const toggle = (val?: T | F): void => {
    if (val !== undefined) {
      value.value = val
    } else {
      value.value = value.value === toValue(truthy) ? (toValue(falsy) as F) : (toValue(truthy) as T)
    }
  }

  watch(() => toValue(truthy), (cur, pre) => {
    if (value.value === pre) {
      value.value = cur
    }
  })

  watch(() => toValue(falsy), (cur, pre) => {
    if (value.value === pre) {
      value.value = cur
    }
  })

  return {
    value: readonly(value) as Readonly<Ref<T | F>>,
    toggle,
  }
}

export default useToggle
