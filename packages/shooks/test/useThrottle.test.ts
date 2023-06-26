import { describe, expect, it, vi } from 'vitest'
import { useThrottle } from '..'

describe('useThrottle', () => {
  it('should be defined', () => {
    expect(useThrottle).toBeDefined()
  })

  it('should call once after calling once', async () => {
    const fn = vi.fn((x: number) => {
      return x * x
    })
    const timeout = 100
    const throttle = useThrottle(fn, timeout)

    throttle(10)
    await new Promise((resolve) => window.setTimeout(resolve, timeout * 2))
    expect(fn).toBeCalled()
    expect(fn).toBeCalledTimes(1)
    expect(fn).toBeCalledWith(10)
  })

  it('should call once in a duration with calling many times', async () => {
    const fn = vi.fn((x: number) => {
      return x * x
    })
    const timeout = 100
    const throttle = useThrottle(fn, timeout)

    throttle(10)
    await new Promise((resolve) => window.setTimeout(resolve, timeout / 3))
    throttle(10)
    await new Promise((resolve) => window.setTimeout(resolve, timeout / 3))
    throttle(10)
    await new Promise((resolve) => window.setTimeout(resolve, timeout / 3))
    throttle(10)
    await new Promise((resolve) => window.setTimeout(resolve, timeout / 3))
    throttle(10)
    await new Promise((resolve) => window.setTimeout(resolve, timeout / 3))
    await new Promise((resolve) => window.setTimeout(resolve, timeout))
    expect(fn).toBeCalled()
    expect(fn).toBeCalledTimes(2)
    expect(fn).toBeCalledWith(10)
  })
})
