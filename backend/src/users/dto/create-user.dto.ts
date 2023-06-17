import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator'

export class CreateUserDto {
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  @ApiProperty()
  name: string

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  email: string

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @ApiProperty()
  password: string
}
