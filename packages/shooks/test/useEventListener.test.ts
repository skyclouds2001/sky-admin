import { beforeEach, describe, expect, it, vi, type SpyInstance } from 'vitest'
import { useEventListener } from '..'

describe('useEventListener', () => {
  let target: HTMLDivElement
  let removeSpy: SpyInstance
  let addSpy: SpyInstance

  const listener = vi.fn()
  const event = 'click'
  const options = { capture: true }

  beforeEach(() => {
    target = document.createElement('div')
    removeSpy = vi.spyOn(target, 'removeEventListener')
    addSpy = vi.spyOn(target, 'addEventListener')
    listener.mockReset()
    useEventListener(target, event, listener, options)
  })

  it('should be defined', () => {
    expect(useEventListener).toBeDefined()
  })

  it('should add listener', () => {
    expect(addSpy).toBeCalledTimes(1)
  })

  it('should trigger listener', () => {
    expect(listener).not.toBeCalled()
    target.dispatchEvent(new MouseEvent(event))
    expect(listener).toBeCalledTimes(1)
  })

  it('should remove listener', () => {
    expect(removeSpy).not.toBeCalled()

    stop() // todo - wait for apply

    expect(removeSpy).toBeCalledTimes(1)
    expect(removeSpy).toBeCalledWith(event, listener, options)
  })
})
