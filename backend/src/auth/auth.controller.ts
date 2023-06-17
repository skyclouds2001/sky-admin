import { Body, Controller, Post } from '@nestjs/common'
import { ApiOkResponse, ApiTags } from '@nestjs/swagger'
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { AuthService } from './auth.service'
import { type LoginDto } from './dto/login.dto'
import { AuthEntity } from './entity/auth.entity'

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOkResponse({ type: AuthEntity })
  login(@Body() loginDto: LoginDto): Promise<AuthEntity> {
    return this.authService.login(loginDto.email, loginDto.password)
  }
}
