import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { DevtoolsModule } from '@nestjs/devtools-integration'
import { PrismaModule, loggingMiddleware } from 'nestjs-prisma'
import * as Joi from 'joi'
import { ArticlesModule } from './articles/articles.module'
import { UsersModule } from './users/users.module'
import { AuthModule } from './auth/auth.module'
import { ServerModule } from './server/server.module'
import { WsModule } from './ws/ws.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env', `.${process.env.NODE_ENV ?? 'development'}.env`],
      cache: true,
      expandVariables: true,
      validationSchema: Joi.object({
        NODE_ENV: Joi.string().valid('development', 'production', 'test').default('development'),
        PORT: Joi.number().default(3000),
      }),
      validationOptions: {
        allowUnknown: true,
        abortEarly: false,
      },
    }),
    PrismaModule.forRoot({
      prismaServiceOptions: {
        explicitConnect: true,
        middlewares: [loggingMiddleware()],
      },
    }),
    DevtoolsModule.register({
      http: process.env.NODE_ENV !== 'production',
    }),
    ArticlesModule,
    UsersModule,
    AuthModule,
    ServerModule,
    WsModule,
  ],
})
export class AppModule {}
