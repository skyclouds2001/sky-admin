import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator'

export class CreateRoleDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: '角色名称',
  })
  name: string

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  @MaxLength(250)
  @ApiProperty({
    description: '角色描述',
    required: false,
    maxLength: 250,
  })
  description?: string
}
