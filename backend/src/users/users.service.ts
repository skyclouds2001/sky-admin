import { Injectable } from '@nestjs/common'
import { PrismaService } from 'nestjs-prisma'
import * as bcyptjs from 'bcryptjs'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'

export const roundsOfHashing = 10

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  create(createUserDto: CreateUserDto) {
    createUserDto.password = bcyptjs.hashSync(createUserDto.password, roundsOfHashing)
    return this.prisma.user.create({ data: createUserDto })
  }

  findAll() {
    return this.prisma.user.findMany()
  }

  findOne(id: number) {
    return this.prisma.user.findUnique({
      where: {
        id,
      },
    })
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    if (updateUserDto.password !== undefined) {
      updateUserDto.password = bcyptjs.hashSync(updateUserDto.password, roundsOfHashing)
    }

    return this.prisma.user.update({
      where: {
        id,
      },
      data: updateUserDto,
    })
  }

  remove(id: number) {
    return this.prisma.user.delete({
      where: {
        id,
      },
    })
  }
}
