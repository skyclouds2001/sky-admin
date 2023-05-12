/**
 * 防抖
 * @param fn - 回调方法
 * @param delay - 延迟时间
 * @returns - 包装防抖方法
 */
export const debounce = (fn: () => void, delay: number): (() => void) => {
  let timer: number | null = null

  return function () {
    if (timer !== null) {
      window.clearTimeout(timer)
    }
    timer = window.setTimeout(fn, delay)
  }
}

/**
 * 节流
 * @param fn - 回调方法
 * @param delay - 延迟时间
 * @returns - 包装节流方法
 */
export const throttle = (fn: () => void, delay: number): (() => void) => {
  let flag = true

  return function () {
    if (flag) {
      flag = false
      window.setTimeout(() => {
        fn()
        flag = true
      }, delay)
    }
  }
}

const f = throttle(() => {
  //
}, 0)
