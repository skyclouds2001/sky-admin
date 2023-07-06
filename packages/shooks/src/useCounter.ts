import { readonly, ref, type Ref } from 'vue'

const useCounter = (
  options: {
    min?: number
    max?: number
    initial?: number
  } = {}
): {
  count: Readonly<Ref<number>>
  increase: (delta?: number) => void
  decrease: (delta?: number) => void
  get: () => number
  set: (val: number) => void
  reset: () => void
} => {
  const { min = -Infinity, max = Infinity, initial = 0 } = options

  const count = ref(Math.max(min, Math.min(max, initial)))

  const increase = (delta = 1): void => {
    count.value = Math.min(max, count.value + delta)
  }

  const decrease = (delta = 1): void => {
    count.value = Math.max(min, count.value - delta)
  }

  const get = (): number => count.value

  const set = (val: number): void => {
    count.value = Math.max(min, Math.min(max, val))
  }

  const reset = (): void => {
    count.value = Math.max(min, Math.min(max, initial))
  }

  return {
    count: readonly(count),
    increase,
    decrease,
    get,
    set,
    reset,
  }
}

export default useCounter
