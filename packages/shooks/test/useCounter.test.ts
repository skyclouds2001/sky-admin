import { describe, expect, it } from 'vitest'
import { useCounter } from '..'

describe('useCounter', () => {
  it('should be defined', () => {
    expect(useCounter).toBeDefined()
  })

  it('should initial with zero if no initial value provided', () => {
    const { count } = useCounter()

    expect(count.value).toBe(0)
  })

  it('should initial with provided value if exsited', () => {
    const { count } = useCounter({
      initial: 20,
    })

    expect(count.value).toBe(20)
  })

  it('should update counter', () => {
    const { count, increase, decrease, get, set, reset } = useCounter()

    expect(count.value).toBe(0)
    expect(get()).toBe(0)

    set(25)

    expect(count.value).toBe(25)
    expect(get()).toBe(25)

    increase()

    expect(count.value).toBe(26)

    increase(24)

    expect(count.value).toBe(50)

    decrease()

    expect(count.value).toBe(49)

    decrease(99)

    expect(count.value).toBe(-50)

    reset()

    expect(count.value).toBe(0)
  })

  it('should update counter with limit', () => {
    const { count, increase, decrease, get, set, reset } = useCounter({
      min: -25,
      max: 25,
      initial: 10,
    })

    expect(count.value).toBe(10)
    expect(get()).toBe(10)

    set(-10)

    expect(count.value).toBe(-10)
    expect(get()).toBe(-10)

    increase()

    expect(count.value).toBe(-9)

    increase(19)

    expect(count.value).toBe(10)

    increase(20)

    expect(count.value).toBe(25)

    decrease()

    expect(count.value).toBe(24)

    decrease(4)

    expect(count.value).toBe(20)

    decrease(50)

    expect(count.value).toBe(-25)

    reset()

    expect(count.value).toBe(10)
  })
})
