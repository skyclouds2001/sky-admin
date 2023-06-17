import { UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { UsersService } from 'src/users/users.service'
import { type UserEntity } from 'src/users/entities/user.entity'
import { jwtSecret } from '../auth.module'

export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private readonly userService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtSecret,
    })
  }

  async validate(payload: { userId: number }): Promise<UserEntity> {
    const user = await this.userService.findOne(payload.userId)

    if (user === null) throw new UnauthorizedException()

    return user
  }
}
