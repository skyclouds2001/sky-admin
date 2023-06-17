import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { PrismaService } from 'nestjs-prisma'
import { AuthEntity } from './entity/auth.entity'

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
