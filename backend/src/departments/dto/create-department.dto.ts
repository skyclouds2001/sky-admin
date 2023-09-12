import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator'

export class CreateDepartmentDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: '部门名称',
  })
  name: string

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  @MaxLength(250)
  @ApiProperty({
    description: '部门描述',
    required: false,
    maxLength: 250,
  })
  description?: string
}
