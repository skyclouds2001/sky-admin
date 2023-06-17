import { Module } from '@nestjs/common'
import { PrismaModule, loggingMiddleware } from 'nestjs-prisma'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ArticlesModule } from './articles/articles.module'
import { UsersModule } from './users/users.module'

@Module({
  imports: [
    PrismaModule.forRoot({
      prismaServiceOptions: {
        explicitConnect: true,
        middlewares: [loggingMiddleware()],
      },
    }),
    ArticlesModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
