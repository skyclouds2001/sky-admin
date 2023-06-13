import { getCurrentScope, onScopeDispose } from 'vue'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const tryOnScopeDispose = (fn: (...args: any[]) => any): void => {
  if (getCurrentScope() !== undefined) {
    onScopeDispose(fn)
  }
}

export default tryOnScopeDispose
