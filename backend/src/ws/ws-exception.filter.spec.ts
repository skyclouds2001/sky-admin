import { describe, expect, it } from 'vitest'
import { WsExceptionFilter } from './ws-exception.filter'

describe('WsExceptionFilter', () => {
  it('should be defined', () => {
    expect(new WsExceptionFilter()).toBeDefined()
  })
})
