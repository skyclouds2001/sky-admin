import { Module } from '@nestjs/common'
import { PrismaModule } from 'nestjs-prisma'
import { RolesService } from './roles.service'
import { RolesController } from './roles.controller'

@Module({
  controllers: [RolesController],
  providers: [RolesService],
  imports: [PrismaModule],
  exports: [RolesService],
})
export class RolesModule {}
