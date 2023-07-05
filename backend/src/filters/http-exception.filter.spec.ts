import { describe, expect, it } from 'vitest'
import { HttpExceptionFilter } from './http-exception.filter'

describe('HttpExceptionFilter', () => {
  it('should be defined', () => {
    expect(new HttpExceptionFilter()).toBeDefined()
  })
})
