import { Injectable } from '@nestjs/common'
import { PrismaService } from 'nestjs-prisma'
import * as bcyptjs from 'bcryptjs'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { UserEntity } from './entities/user.entity'

export const roundsOfHashing = 10

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  create(createUserDto: CreateUserDto): Promise<UserEntity> {
    createUserDto.password = bcyptjs.hashSync(createUserDto.password, roundsOfHashing)
    return this.prisma.user.create({ data: createUserDto })
  }

  findAll(): Promise<UserEntity[]> {
    return this.prisma.user.findMany()
  }

  findOne(id: number): Promise<UserEntity> {
    return this.prisma.user.findUnique({
      where: {
        id,
      },
    })
  }

  update(id: number, updateUserDto: UpdateUserDto): Promise<UserEntity> {
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

  remove(id: number): Promise<UserEntity> {
    return this.prisma.user.delete({
      where: {
        id,
      },
    })
  }
}
