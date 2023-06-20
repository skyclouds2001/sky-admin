import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator'

export class LoginDto {
  @IsEmail()
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
    minLength: 8,
  })
  password: string
}
