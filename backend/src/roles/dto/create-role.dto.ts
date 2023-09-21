import { ApiProperty } from '@nestjs/swagger'
import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator'

export class CreateRoleDto {
  @IsString()
  @MinLength(1)
  @MaxLength(10)
  @ApiProperty({
    description: '角色名称',
    minLength: 1,
    maxLength: 10,
  })
  name: string

  @IsString()
  @MaxLength(250)
  @IsOptional()
  @ApiProperty({
    description: '角色描述',
    maxLength: 250,
    required: false,
  })
  description?: string
}
