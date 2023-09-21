import { Module } from '@nestjs/common'
import { PrismaModule } from 'nestjs-prisma'
import { DepartmentsService } from './departments.service'
import { DepartmentsController } from './departments.controller'

@Module({
  controllers: [DepartmentsController],
  providers: [DepartmentsService],
  imports: [PrismaModule],
  exports: [DepartmentsService],
})
export class DepartmentsModule {}
