import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { PrismaService } from 'nestjs-prisma'
import * as bcyptjs from 'bcryptjs'

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService
  ) {}

  async login(email: string, password: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    })

    if (user === null) throw new NotFoundException(`No user found for email: ${email}`)

    const isPasswordValid = bcyptjs.compareSync(password, user.password)

    if (!isPasswordValid) throw new UnauthorizedException('Invalid password')

    return {
      accessToken: this.jwtService.sign({
        userId: user.id,
      }),
    }
  }
}
