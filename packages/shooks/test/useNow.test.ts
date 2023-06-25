import { describe, expect, it } from 'vitest'
import { useNow } from '..'

describe('useNow', () => {
  it('should be defined', () => {
    expect(useNow).toBeDefined()
  })

  it('should get current timestamp', () => {
    const now = useNow()

    expect(now.value.getTime()).toBeLessThanOrEqual(Date.now())
  })
})
