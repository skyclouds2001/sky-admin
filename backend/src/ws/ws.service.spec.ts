import { Test, TestingModule } from '@nestjs/testing'
import { beforeEach, describe, expect, it } from 'vitest'
import { WsService } from './ws.service'

describe('WsService', () => {
  let service: WsService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WsService],
    }).compile()

    service = module.get<WsService>(WsService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
