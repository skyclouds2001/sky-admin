import { describe, expect, it } from 'vitest'
import { useEventBus } from '..'

describe('useEventBus', () => {
  it('should be defined', () => {
    expect(useEventBus).toBeDefined()
  })
})
