import { type MaybeRefOrGetter, ref, type Ref, toValue, watch } from 'vue'

const useToggle = <const T = true, const F = false>(
  options: {
    truthy?: MaybeRefOrGetter<T>
    falsy?: MaybeRefOrGetter<F>
    initial?: T | F
  } = {}
): {
  value: Ref<T | F>
  toggle: () => void
} => {
  const { truthy = true, falsy = false, initial = falsy } = options

  const value = ref(initial) as Ref<T | F>

  const toggle = (val?: T | F): void => {
    value.value = val !== undefined ? val : value.value === toValue(truthy) ? toValue(falsy) : toValue(truthy)
  }

  watch(truthy, (cur, pre) => {
    if (value.value === pre) {
      value.value = cur
    }
  })

  watch(falsy, (cur, pre) => {
    if (value.value === pre) {
      value.value = cur
    }
  })

  return {
    value,
    toggle,
  }
}

export default useToggle
