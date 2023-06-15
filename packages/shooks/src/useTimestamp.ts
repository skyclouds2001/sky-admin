import { readonly, ref, type Ref } from 'vue'
import { useAnimationFrame, useInterval } from '.'

const useTimestamp = (
  options: {
    offset?: number
    immediate?: boolean
    mode?: 'AnimationFrame' | 'Interval'
    interval?: number
  } = {}
): Readonly<Ref<number>> => {
  const { offset = 0, immediate = true, mode = 'AnimationFrame', interval = 0 } = options

  const timestamp = ref(Date.now() + offset)

  const update = (): void => {
    timestamp.value = Date.now() + offset
  }

  if (mode === 'AnimationFrame') {
    useAnimationFrame(update, { immediate })
  }
  if (mode === 'Interval') {
    useInterval(update, interval, { immediate })
  }

  return readonly(timestamp)
}

export default useTimestamp
