import { Test, TestingModule } from '@nestjs/testing'
import { beforeEach, describe, expect, it } from 'vitest'
import { DepartmentsService } from './departments.service'

describe('DepartmentsService', () => {
  let service: DepartmentsService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DepartmentsService],
    }).compile()

    service = module.get<DepartmentsService>(DepartmentsService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
