import { type MaybeRefOrGetter, ref, type Ref, toValue } from 'vue'

const useToggle = <T = true, F = false>(options: {
    truthy?: MaybeRefOrGetter<T>
    falsy?: MaybeRefOrGetter<F>
    initial?: T | F
} = {}): {
    value: Ref<T | F>
    toggle: () => void
} => {
    const { truthy = true, falsy = false, initial = falsy } = options

    const value = ref(initial) as Ref<T | F>

    const toggle = (val?: T | F): void => {
        value.value = val !== undefined ? val : (value.value === toValue(truthy) ? toValue(falsy) : toValue(truthy))
    }

    return {
        value,
        toggle,
    }
}

export default useToggle
