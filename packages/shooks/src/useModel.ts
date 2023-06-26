const map = new WeakMap()

const useModel = <T extends (...args: any[]) => any = (...args: any[]) => any>(hook: T): ReturnType<T> => {
  if (!map.has(hook)) {
    map.set(hook, hook())
  }
  return map.get(hook)
}

export default useModel
