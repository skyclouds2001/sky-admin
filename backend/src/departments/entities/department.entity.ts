import { ApiProperty } from '@nestjs/swagger'
import { Department } from '@prisma/client'

export class DepartmentEntity implements Department {
  @ApiProperty({
    description: '部门ID',
  })
  id: number

  @ApiProperty({
    description: '部门名称',
  })
  name: string

  @ApiProperty({
    description: '部门描述',
    required: false,
    nullable: true,
    maxLength: 250,
  })
  description: string | null

  @ApiProperty({
    description: '部门创建时间',
  })
  createdAt: Date

  @ApiProperty({
    description: '部门更新时间',
  })
  updatedAt: Date
}
