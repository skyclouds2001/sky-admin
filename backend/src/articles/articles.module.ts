import { Module } from '@nestjs/common'
import { CacheModule } from '@nestjs/cache-manager'
import { PrismaModule } from 'nestjs-prisma'
import { ArticlesService } from './articles.service'
import { ArticlesController } from './articles.controller'

@Module({
  controllers: [ArticlesController],
  providers: [ArticlesService],
  imports: [
    PrismaModule,
    CacheModule.register({
      ttl: 10,
      max: 25,
    }),
  ],
  exports: [ArticlesService],
})
export class ArticlesModule {}
