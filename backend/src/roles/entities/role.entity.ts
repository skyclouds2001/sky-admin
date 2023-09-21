import { ApiProperty } from '@nestjs/swagger'
import { Role } from '@prisma/client'

export class RoleEntity implements Role {
  @ApiProperty({
    description: '角色ID',
  })
  id: number

  @ApiProperty({
    description: '角色名称',
  })
  name: string

  @ApiProperty({
    description: '角色描述',
    required: false,
    nullable: true,
    maxLength: 250,
  })
  description: string | null

  @ApiProperty({
    description: '角色创建时间',
  })
  createdAt: Date

  @ApiProperty({
    description: '角色更新时间',
  })
  updatedAt: Date
}
