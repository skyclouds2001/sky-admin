import { describe, expect, it } from 'vitest'
import { useTimestamp } from '..'

describe('useTimestamp', () => {
  it('should be defined', () => {
    expect(useTimestamp).toBeDefined()
  })

  it('should get current timestamp', () => {
    const timestamp = useTimestamp()

    expect(timestamp.value).toBeLessThanOrEqual(Date.now())
  })

  it('should support set offset', () => {
    const offset = 1000

    const timestamp = useTimestamp({ offset })

    expect(timestamp.value).toBeGreaterThan(Date.now())
    expect(timestamp.value).toBeLessThanOrEqual(Date.now() + offset)
  })
})
