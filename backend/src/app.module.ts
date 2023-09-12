import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { ScheduleModule } from '@nestjs/schedule'
import { DevtoolsModule } from '@nestjs/devtools-integration'
import { PrismaModule, loggingMiddleware } from 'nestjs-prisma'
import * as Joi from 'joi'
import { ArticlesModule } from './articles/articles.module'
import { UsersModule } from './users/users.module'
import { AuthModule } from './auth/auth.module'
import { ServerModule } from './server/server.module'
import { ProjectModule } from './project/project.module'
import { FilesModule } from './files/files.module'
import { WsModule } from './ws/ws.module'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { RolesModule } from './roles/roles.module'

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
    ScheduleModule.forRoot(),
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
    ProjectModule,
    WsModule,
    FilesModule,
    RolesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
