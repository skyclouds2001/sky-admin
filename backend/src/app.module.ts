import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { PrismaModule, loggingMiddleware } from 'nestjs-prisma'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ArticlesModule } from './articles/articles.module'
import { UsersModule } from './users/users.module'
import { AuthModule } from './auth/auth.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      expandVariables: true,
    }),
    PrismaModule.forRoot({
      prismaServiceOptions: {
        explicitConnect: true,
        middlewares: [loggingMiddleware()],
      },
    }),
    ArticlesModule,
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
