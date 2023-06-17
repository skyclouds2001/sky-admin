import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { PrismaModule } from 'nestjs-prisma'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'

export const jwtSecret = 'zjP9h6ZI5LoSKCRj'

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    PrismaModule,
    PassportModule,
    JwtModule.register({
      secret: jwtSecret,
      signOptions: {
        expiresIn: '5m',
      },
    }),
  ],
})
export class AuthModule {}
