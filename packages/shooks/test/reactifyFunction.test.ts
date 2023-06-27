import { describe, expect, it } from 'vitest'
import { ref } from 'vue'
import { reactifyFunction } from '..'

describe('reactifyFunction', () => {
  it('should be defined', () => {
    expect(reactifyFunction).toBeDefined()
  })

  it('should accept refs or non-refs and return computed ref', () => {
    const add = reactifyFunction((a: number, b: number): number => a + b)
    console.log(reactifyFunction, typeof reactifyFunction)
    const a = ref(1)
    const b = ref(2)

    expect(add(a, b).value).toBe(3)
    expect(add(2, b).value).toBe(4)
    expect(add(a, 1).value).toBe(2)
    expect(add(0, 1).value).toBe(1)

    expect(add(add(a, b), add(a, b)).value).toBe(6)
  })
})
