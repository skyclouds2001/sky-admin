import { Injectable } from '@nestjs/common'
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { PrismaService } from 'nestjs-prisma'
import { type CreateUserDto } from './dto/create-user.dto'
import { type UpdateUserDto } from './dto/update-user.dto'
import { type UserEntity } from './entities/user.entity'

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  create(createUserDto: CreateUserDto): Promise<UserEntity> {
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
