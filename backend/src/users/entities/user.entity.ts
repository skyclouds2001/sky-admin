import { ApiProperty } from '@nestjs/swagger'
import { type User } from '@prisma/client'

export class UserEntity implements User {
  @ApiProperty()
  id: number

  @ApiProperty({ required: false, nullable: true })
  name: string

  @ApiProperty()
  email: string

  @ApiProperty()
  createdAt: Date

  @ApiProperty()
  updatedAt: Date

  password: string
}
