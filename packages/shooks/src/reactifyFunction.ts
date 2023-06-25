import { computed, type ComputedRef, type Ref, unref } from 'vue'

type Reactify<T> = T extends (...args: infer A) => infer R
  ? (
      ...args: {
        [K in keyof A]: A[K] | Ref<A[K]>
      }
    ) => ComputedRef<R>
  : never

const reactifyFunction = function <T extends (...args: any[]) => any>(fn: T): Reactify<T> {
  return function (this: ThisType<T>, ...args: Parameters<T>) {
    return computed(() =>
      fn.apply(
        this,
        args.map((v) => unref(v))
      )
    )
  } as any
}

export default reactifyFunction
