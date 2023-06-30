import { type MaybeRef, type MaybeRefOrGetter, toValue, watch, ref, unref, type Ref } from 'vue'

/**
 * CSS variable controller hook
 * @param prop control CSS variable name
 * @param target control target element
 * @param options control options
 * @param options.initial the initial value for CSS variable
 * @returns controllable CSS variable value
 */
const useCssVariable = (prop: MaybeRefOrGetter<string>, target: MaybeRef<HTMLElement | SVGElement | MathMLElement | null> = document.documentElement, options: { initial?: string } = {}): Ref<string> => {
  const { initial = '' } = options

  const variable = ref(initial)

  watch(
    [() => toValue(prop), () => target],
    () => {
      variable.value = window
        .getComputedStyle(unref(target) ?? document.documentElement)
        .getPropertyValue(toValue(prop))
        .trim()
    },
    {
      immediate: true,
    }
  )

  watch(variable, (variable) => {
    unref(target)?.style?.setProperty(toValue(prop), variable)
  })

  return variable
}

export default useCssVariable
