import { describe, expect, it } from 'vitest'
import { TransformResultInterceptor } from './result.interceptor'

describe('ResultInterceptor', () => {
  it('should be defined', () => {
    expect(new TransformResultInterceptor()).toBeDefined()
  })
})
