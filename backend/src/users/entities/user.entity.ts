import { ApiProperty } from '@nestjs/swagger'
import { User } from '@prisma/client'
import { Exclude } from 'class-transformer'

export class UserEntity implements User {
  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial)
  }

  @ApiProperty({
    description: '用户ID',
  })
  id: number

  @ApiProperty({
    description: '用户姓名',
    required: false,
    nullable: true,
  })
  name: string | null

  @ApiProperty({
    description: '用户电子邮箱',
  })
  email: string

  @ApiProperty({
    description: '用户部门ID',
    required: false,
    nullable: true,
  })
  departmentId: number

  @ApiProperty({
    type: Object,
    description: '用户部门信息',
    required: false,
  })
  department?: any

  @ApiProperty({
    description: '用户角色ID',
    required: false,
    nullable: true,
  })
  roleId: number

  @ApiProperty({
    type: Object,
    description: '用户角色信息',
    required: false,
  })
  role?: any

  @ApiProperty({
    description: '用户创建时间',
  })
  createdAt: Date

  @ApiProperty({
    description: '用户更新时间',
  })
  updatedAt: Date

  @Exclude()
  password: string
}
