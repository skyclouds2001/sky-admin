import { ApiProperty } from '@nestjs/swagger'
import { IsInt, IsNotEmpty, IsOptional, IsPositive, IsString, MinLength } from 'class-validator'

export class CreateUserDto {
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  @ApiProperty({
    description: '用户姓名',
  })
  name: string

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: '用户电子邮箱',
  })
  email: string

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @ApiProperty({
    description: '用户账户密码',
  })
  password: string

  @IsInt()
  @IsNotEmpty()
  @IsPositive()
  @ApiProperty({
    description: '用户部门ID',
  })
  departmentId: number

  @IsInt()
  @IsNotEmpty()
  @IsPositive()
  @ApiProperty({
    description: '用户角色ID',
  })
  roleId: number
}
