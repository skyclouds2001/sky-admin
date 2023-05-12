import { ref, type Ref } from 'vue'
import { useInterval, useAnimationFrame } from '@/hook'

const useNow = (
  options: {
    mode?: 'AnimationFrame' | 'Interval'
    interval?: number
  } = {}
): {
  now: Ref<Date>
} => {
  const { mode = 'AnimationFrame', interval = 0 } = options

  const now = ref(new Date())

  const update = (): void => {
    now.value = new Date()
  }

  if (mode === 'AnimationFrame') {
    useAnimationFrame(update)
  }
  if (mode === 'Interval') {
    useInterval(update, interval)
  }

  return {
    now,
  }
}

export default useNow
