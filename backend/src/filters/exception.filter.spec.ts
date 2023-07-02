import { describe, expect, it } from 'vitest'
import { ExceptionsFilter } from './exception.filter'

describe('ExceptionFilter', () => {
  it('should be defined', () => {
    expect(new ExceptionsFilter()).toBeDefined()
  })
})
