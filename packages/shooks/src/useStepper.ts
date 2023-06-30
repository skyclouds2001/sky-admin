import { computed, type ComputedRef, type MaybeRefOrGetter, readonly, ref, type Ref, toValue } from 'vue'

const useStepper = <SS extends Array<string | number> | Record<string, any>, S = SS extends Record<string, infer R> ? R : string | number, N = SS extends Array<string | number> ? string | number : keyof SS>(
  steps: MaybeRefOrGetter<SS>,
  initialStep?: N
): {
  steps: Readonly<Ref<SS>>
  stepNames: ComputedRef<Array<string | number>>
  stepCount: ComputedRef<number>
  index: Ref<number>
  previous: ComputedRef<S | undefined>
  current: ComputedRef<S | undefined>
  next: ComputedRef<S | undefined>
  isFirst: ComputedRef<boolean>
  isLast: ComputedRef<boolean>
  at: (index: number) => S | undefined
  get: (name: string) => S | undefined
  goToPrevious: () => void
  goTo: (name: string) => void
  goToNext: () => void
  isPrevious: (name: string) => boolean
  isCurrent: (name: string) => boolean
  isNext: (name: string) => boolean
  isBefore: (name: string) => boolean
  isAfter: (name: string) => boolean
} => {
  const step$ = ref(toValue(steps))

  const stepNames = computed(() => (Array.isArray(step$.value) ? step$.value : Object.keys(step$.value)))
  const stepCount = computed(() => stepNames.value.length)

  const index = ref(stepNames.value.indexOf(initialStep ?? stepNames.value[0]))

  const previous = computed(() => at(index.value - 1))
  const current = computed(() => at(index.value))
  const next = computed(() => at(index.value + 1))
  const isFirst = computed(() => index.value === 0)
  const isLast = computed(() => index.value === stepCount.value - 1)

  const at = (index: number): S | undefined => (Array.isArray(step$.value) ? step$.value[index] : step$.value[stepNames.value[index]])
  const get = (name: string): S | undefined => (stepNames.value.includes(name) ? at(stepNames.value.indexOf(name)) : undefined)

  const goToPrevious = (): void => {
    if (!isFirst.value) {
      --index.value
    }
  }
  const goTo = (name: string): void => {
    const id = stepNames.value.indexOf(name)
    if (id !== -1) {
      index.value = id
    }
  }
  const goToNext = (): void => {
    if (!isLast.value) {
      ++index.value
    }
  }

  const isPrevious = (name: string): boolean => {
    return stepNames.value.indexOf(name) === index.value - 1
  }
  const isCurrent = (name: string): boolean => {
    return stepNames.value.indexOf(name) === index.value
  }
  const isNext = (name: string): boolean => {
    return stepNames.value.indexOf(name) === index.value + 1
  }
  const isBefore = (name: string): boolean => {
    return stepNames.value.indexOf(name) < index.value
  }
  const isAfter = (name: string): boolean => {
    return stepNames.value.indexOf(name) > index.value
  }

  return {
    steps: readonly(step$) as Readonly<Ref<SS>>,
    stepNames,
    stepCount,
    index,
    previous,
    current,
    next,
    isFirst,
    isLast,
    at,
    get,
    goToPrevious,
    goTo,
    goToNext,
    isPrevious,
    isCurrent,
    isNext,
    isBefore,
    isAfter,
  }
}

export default useStepper
