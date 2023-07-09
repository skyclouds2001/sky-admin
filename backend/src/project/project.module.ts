import { Module } from '@nestjs/common'
import { HttpModule } from '@nestjs/axios'
import { ProjectService } from './project.service'
import { ProjectController } from './project.controller'

@Module({
  imports: [
    HttpModule.register({
      timeout: 5 * 1000,
      maxRedirects: 5,
    }),
  ],
  controllers: [ProjectController],
  providers: [ProjectService],
})
export class ProjectModule {}
