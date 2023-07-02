import { Test, TestingModule } from '@nestjs/testing'
import { beforeEach, describe, expect, it } from 'vitest'
import { ServerService } from './server.service'

describe('ServerService', () => {
  let service: ServerService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ServerService],
    }).compile()

    service = module.get<ServerService>(ServerService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
