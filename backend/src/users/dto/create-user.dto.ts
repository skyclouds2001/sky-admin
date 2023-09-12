import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsInt, IsPositive, IsString, MaxLength, MinLength } from 'class-validator'

export class CreateUserDto {
  @IsString()
  @MinLength(1)
  @MaxLength(25)
  @ApiProperty({
    description: '用户姓名',
    minLength: 1,
    maxLength: 25,
  })
  name: string

  @IsEmail()
  @ApiProperty({
    description: '用户电子邮箱',
  })
  email: string

  @IsString()
  @MinLength(8)
  @ApiProperty({
    description: '用户账户密码',
    minLength: 8,
  })
  password: string

  @IsInt()
  @IsPositive()
  @ApiProperty({
    description: '用户部门ID',
    minimum: 0,
    exclusiveMinimum: true,
  })
  departmentId: number

  @IsInt()
  @IsPositive()
  @ApiProperty({
    description: '用户角色ID',
    minimum: 0,
    exclusiveMinimum: true,
  })
  roleId: number
}
