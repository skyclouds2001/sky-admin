import { describe, expect, it } from 'vitest'
import { useModel } from '..'

describe('useModel', () => {
  const obj = {
    key: 'value',
  }
  const hook = (): typeof obj => {
    return obj
  }

  it('should be defined', () => {
    expect(useModel).toBeDefined()
  })

  it('should always return value and return the same value', () => {
    const model1 = useModel(hook)
    expect(model1).toBe(obj)

    const model2 = useModel(hook)
    expect(model2).toBe(obj)
  })
})
