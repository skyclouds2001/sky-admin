import { describe, expect, it, vi } from 'vitest'
import { useDebounce } from '..'

describe('useDebounce', () => {
  it('should be defined', () => {
    expect(useDebounce).toBeDefined()
  })

  it('should call once after calling once', async () => {
    const fn = vi.fn((x: number) => {
      return x * x
    })
    const timeout = 100
    const debounce = useDebounce(fn, timeout)

    debounce(10)
    await new Promise((resolve) => window.setTimeout(resolve, timeout * 2))
    expect(fn).toBeCalled()
    expect(fn).toBeCalledTimes(1)
    expect(fn).toBeCalledWith(10)
  })

  it('should call once after calling many times', async () => {
    const fn = vi.fn((x: number) => {
      return x * x
    })
    const timeout = 100
    const debounce = useDebounce(fn, timeout)

    debounce(10)
    debounce(10)
    debounce(10)
    debounce(10)
    debounce(10)
    await new Promise((resolve) => window.setTimeout(resolve, timeout * 2))
    expect(fn).toBeCalled()
    expect(fn).toBeCalledTimes(1)
    expect(fn).toBeCalledWith(10)
  })
})
