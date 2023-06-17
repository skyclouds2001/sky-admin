import { Module } from '@nestjs/common'
import { PrismaModule } from 'nestjs-prisma'
import { ArticlesService } from './articles.service'
import { ArticlesController } from './articles.controller'

@Module({
  controllers: [ArticlesController],
  providers: [ArticlesService],
  imports: [PrismaModule],
})
export class ArticlesModule {}
