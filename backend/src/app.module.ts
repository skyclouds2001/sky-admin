import { Module } from '@nestjs/common'
import { PrismaModule, loggingMiddleware } from 'nestjs-prisma'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ArticlesModule } from './articles/articles.module'

@Module({
  imports: [
    PrismaModule.forRoot({
      prismaServiceOptions: {
        explicitConnect: true,
        middlewares: [loggingMiddleware()],
      },
    }),
    ArticlesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
