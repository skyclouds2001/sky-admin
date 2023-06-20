import { ApiProperty } from '@nestjs/swagger'

export class AuthEntity {
  @ApiProperty({
    description: '登录token',
  })
  accessToken: string
}
