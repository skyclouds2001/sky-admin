import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { useEventBus } from '..'

describe('useEventBus', () => {
  const KEY1 = 'eb1'
  const KEY2 = 'eb2'
  let eb1: ReturnType<typeof useEventBus<typeof KEY1>>
  let eb2: ReturnType<typeof useEventBus<typeof KEY2>>
  let f1: ReturnType<typeof vi.fn>
  let f2: ReturnType<typeof vi.fn>

  beforeEach(() => {
    eb1 = useEventBus(KEY1)
    eb2 = useEventBus(KEY2)
    f1 = vi.fn()
    f2 = vi.fn()
    eb1.on(f1)
    eb2.on(f2)
  })

  afterEach(() => {
    eb1.reset()
    eb2.reset()
  })

  it('should be defined', () => {
    expect(useEventBus).toBeDefined()
  })

  it('should trigger binding callback with specified event', () => {
    eb1.emit(KEY1, 1)
    eb1.emit(KEY1, 1)

    expect(f1).toBeCalledTimes(2)
    expect(f1).toBeCalledWith(KEY1, 1)
    expect(f2).toBeCalledTimes(0)
  })

  it('should not trigger binding callback with specified event', () => {
    eb1.emit()
    eb1.emit()

    expect(f1).toBeCalledTimes(0)
    expect(f2).toBeCalledTimes(0)
  })

  it('should not trigger binding callback after reset with specified event', () => {
    eb1.reset()
    eb1.emit(KEY1)
    eb1.emit(KEY1)

    expect(f1).toBeCalledTimes(0)
    expect(f2).toBeCalledTimes(0)
  })
})
