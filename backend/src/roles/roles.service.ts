import { Injectable } from '@nestjs/common'
import { PrismaService } from 'nestjs-prisma'
import { CreateRoleDto } from './dto/create-role.dto'
import { UpdateRoleDto } from './dto/update-role.dto'

@Injectable()
export class RolesService {
  constructor(private readonly prisma: PrismaService) {}

  count() {
    return this.prisma.role.count()
  }

  create(createRoleDto: CreateRoleDto) {
    return this.prisma.role.create({
      data: createRoleDto,
    })
  }

  findAll() {
    return this.prisma.role.findMany()
  }

  findPage(page: number, size: number) {
    return this.prisma.role.findMany({
      skip: (page - 1) * size,
      take: size,
    })
  }

  findOne(id: number) {
    return this.prisma.role.findUnique({
      where: {
        id,
      },
    })
  }

  update(id: number, updateRoleDto: UpdateRoleDto) {
    return this.prisma.role.update({
      where: {
        id,
      },
      data: updateRoleDto,
    })
  }

  remove(id: number) {
    return this.prisma.role.delete({
      where: {
        id,
      },
    })
  }
}
