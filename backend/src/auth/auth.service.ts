import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common'
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { JwtService } from '@nestjs/jwt'
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { PrismaService } from 'nestjs-prisma'
import { type AuthEntity } from './entity/auth.entity'

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService, private readonly jwtService: JwtService) {}

  async login(email: string, password: string): Promise<AuthEntity> {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    })

    if (user === null) throw new NotFoundException(`No user found for email: ${email}`)

    const isPasswordValid = user.password === password

    if (!isPasswordValid) throw new UnauthorizedException('Invalid password')

    return {
      accessToken: this.jwtService.sign({
        userId: user.id,
      }),
    }
  }
}
