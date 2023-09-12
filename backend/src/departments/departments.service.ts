import { Injectable } from '@nestjs/common'
import { PrismaService } from 'nestjs-prisma'
import { CreateDepartmentDto } from './dto/create-department.dto'
import { UpdateDepartmentDto } from './dto/update-department.dto'

@Injectable()
export class DepartmentsService {
  constructor(private readonly prisma: PrismaService) {}

  count() {
    return this.prisma.department.count()
  }

  create(createDepartmentDto: CreateDepartmentDto) {
    return this.prisma.department.create({
      data: createDepartmentDto,
    })
  }

  findAll() {
    return this.prisma.department.findMany()
  }

  findPage(page: number, size: number) {
    return this.prisma.department.findMany({
      skip: (page - 1) * size,
      take: size,
    })
  }

  findOne(id: number) {
    return this.prisma.department.findUnique({
      where: {
        id,
      },
    })
  }

  update(id: number, updateDepartmentDto: UpdateDepartmentDto) {
    return this.prisma.department.update({
      where: {
        id,
      },
      data: updateDepartmentDto,
    })
  }

  remove(id: number) {
    return this.prisma.department.delete({
      where: {
        id,
      },
    })
  }
}
