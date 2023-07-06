import { describe, expect, it } from 'vitest'
import { useCssVariable } from '..'

describe('useCssVariable', () => {
  const KEY = 'key'
  const VALUE = 'value'

  it('should be defined', () => {
    expect(useCssVariable).toBeDefined()
  })

  it('should return empty string if has not set yet and return giving value if has set', () => {
    const el = document.createElement('div')
    const va = useCssVariable(KEY, el, { initial: VALUE })
    expect(va.value).toBe('')
  })
})
