import { PrismaClient } from '@prisma/client'
import * as bcyptjs from 'bcryptjs'

const prisma = new PrismaClient()

const roundsOfHashing = 10

/**
 * 数据库 seed 方法
 */
async function main(): Promise<void> {
  const role1 = await prisma.role.upsert({
    where: {
      name: 'admin',
    },
    update: {},
    create: {
      name: 'admin',
    },
  })

  const role2 = await prisma.role.upsert({
    where: {
      name: 'user',
    },
    update: {},
    create: {
      name: 'user',
    },
  })

  const department1 = await prisma.department.upsert({
    where: {
      name: 'develop',
    },
    update: {},
    create: {
      name: 'develop',
    },
  })

  const department2 = await prisma.department.upsert({
    where: {
      name: 'manage',
    },
    update: {},
    create: {
      name: 'manage',
    },
  })

  const user1 = await prisma.user.upsert({
    where: {
      email: 'ag@ag.com',
    },
    update: {
      roleId: role1.id,
      departmentId: department1.id,
      name: 'ag',
      password: bcyptjs.hashSync('password-ag', roundsOfHashing),
    },
    create: {
      email: 'ag@ag.com',
      roleId: role1.id,
      departmentId: department1.id,
      name: 'ag',
      password: bcyptjs.hashSync('password-ag', roundsOfHashing),
    },
  })

  const user2 = await prisma.user.upsert({
    where: {
      email: 'estar@estar.com',
    },
    update: {
      roleId: role2.id,
      departmentId: department1.id,
      name: 'estar',
      password: bcyptjs.hashSync('password-estar', roundsOfHashing),
    },
    create: {
      email: 'estar@estar.com',
      roleId: role2.id,
      departmentId: department1.id,
      name: 'estar',
      password: bcyptjs.hashSync('password-estar', roundsOfHashing),
    },
  })

  const user3 = await prisma.user.upsert({
    where: {
      email: 'wb@wb.com',
    },
    update: {
      roleId: role2.id,
      departmentId: department2.id,
      name: 'wb',
      password: bcyptjs.hashSync('password-wb', roundsOfHashing),
    },
    create: {
      email: 'wb@wb.com',
      roleId: role2.id,
      departmentId: department2.id,
      name: 'wb',
      password: bcyptjs.hashSync('password-wb', roundsOfHashing),
    },
  })

  const user4 = await prisma.user.upsert({
    where: {
      email: 'edgm@edgm.com',
    },
    update: {
      roleId: role2.id,
      departmentId: department2.id,
      name: 'edgm',
      password: bcyptjs.hashSync('password-edgm', roundsOfHashing),
    },
    create: {
      email: 'edgm@edgm.com',
      roleId: role2.id,
      departmentId: department2.id,
      name: 'edgm',
      password: bcyptjs.hashSync('password-edgm', roundsOfHashing),
    },
  })

  const user5 = await prisma.user.upsert({
    where: {
      email: 'we@we.com',
    },
    update: {
      roleId: role2.id,
      departmentId: department1.id,
      name: 'we',
      password: bcyptjs.hashSync('password-we', roundsOfHashing),
    },
    create: {
      email: 'we@we.com',
      roleId: role2.id,
      departmentId: department1.id,
      name: 'we',
      password: bcyptjs.hashSync('password-we', roundsOfHashing),
    },
  })

  const post1 = await prisma.article.upsert({
    where: {
      title: 'Hello World',
    },
    update: {
      authorId: user1.id,
      star: 4,
      read: 234,
      status: 'Drafted',
    },
    create: {
      title: 'Hello World',
      authorId: user1.id,
      star: 4,
      read: 234,
      status: 'Drafted',
    },
  })

  const post2 = await prisma.article.upsert({
    where: {
      title: 'Hello Every One',
    },
    update: {
      authorId: user2.id,
      star: 3,
      read: 2314,
      status: 'Published',
    },
    create: {
      title: 'Hello Every One',
      authorId: user2.id,
      star: 3,
      read: 2314,
      status: 'Published',
    },
  })

  const post3 = await prisma.article.upsert({
    where: {
      title: 'Hello User',
    },
    update: {
      authorId: user3.id,
      star: 5,
      read: 534,
      status: 'Published',
    },
    create: {
      title: 'Hello User',
      authorId: user3.id,
      star: 5,
      read: 534,
      status: 'Published',
    },
  })

  const post4 = await prisma.article.upsert({
    where: {
      title: 'Hello People',
    },
    update: {
      authorId: user4.id,
      star: 2,
      read: 1267,
      status: 'Published',
    },
    create: {
      title: 'Hello People',
      authorId: user4.id,
      star: 2,
      read: 1267,
      status: 'Published',
    },
  })

  const post5 = await prisma.article.upsert({
    where: {
      title: 'Hello Human',
    },
    update: {
      authorId: user5.id,
      star: 3,
      read: 767,
      status: 'Drafted',
    },
    create: {
      title: 'Hello Human',
      authorId: user5.id,
      star: 3,
      read: 767,
      status: 'Drafted',
    },
  })

  const post6 = await prisma.article.upsert({
    where: {
      title: 'C Language',
    },
    update: {
      authorId: user1.id,
      star: 4,
      read: 289,
      status: 'Drafted',
    },
    create: {
      title: 'C Language',
      authorId: user1.id,
      star: 4,
      read: 289,
      status: 'Drafted',
    },
  })

  const post7 = await prisma.article.upsert({
    where: {
      title: 'C++ Language',
    },
    update: {
      authorId: user2.id,
      star: 3,
      read: 389,
      status: 'Published',
    },
    create: {
      title: 'C++ Language',
      authorId: user2.id,
      star: 3,
      read: 389,
      status: 'Published',
    },
  })

  const post8 = await prisma.article.upsert({
    where: {
      title: 'Java Language',
    },
    update: {
      authorId: user3.id,
      star: 4,
      read: 1073,
      status: 'Published',
    },
    create: {
      title: 'Java Language',
      authorId: user3.id,
      star: 4,
      read: 1073,
      status: 'Published',
    },
  })

  const post9 = await prisma.article.upsert({
    where: {
      title: 'Python Language',
    },
    update: {
      authorId: user4.id,
      star: 4,
      read: 1087,
      status: 'Published',
    },
    create: {
      title: 'Python Language',
      authorId: user4.id,
      star: 4,
      read: 1087,
      status: 'Published',
    },
  })

  const post10 = await prisma.article.upsert({
    where: {
      title: 'Go Language',
    },
    update: {
      authorId: user5.id,
      star: 2,
      read: 927,
      status: 'Drafted',
    },
    create: {
      title: 'Go Language',
      authorId: user5.id,
      star: 2,
      read: 927,
      status: 'Drafted',
    },
  })

  const post11 = await prisma.article.upsert({
    where: {
      title: 'Swift Language',
    },
    update: {
      authorId: user1.id,
      star: 2,
      read: 456,
      status: 'Published',
    },
    create: {
      title: 'Swift Language',
      authorId: user1.id,
      star: 2,
      read: 456,
      status: 'Published',
    },
  })

  const post12 = await prisma.article.upsert({
    where: {
      title: 'Kotlin Language',
    },
    update: {
      authorId: user2.id,
      star: 1,
      read: 1452,
      status: 'Published',
    },
    create: {
      title: 'Kotlin Language',
      authorId: user2.id,
      star: 1,
      read: 1452,
      status: 'Published',
    },
  })

  const post13 = await prisma.article.upsert({
    where: {
      title: 'HTML Language',
    },
    update: {
      authorId: user3.id,
      star: 3,
      read: 724,
      status: 'Published',
    },
    create: {
      title: 'HTML Language',
      authorId: user3.id,
      star: 3,
      read: 724,
      status: 'Published',
    },
  })

  const post14 = await prisma.article.upsert({
    where: {
      title: 'CSS Language',
    },
    update: {
      authorId: user4.id,
      star: 4,
      read: 682,
      status: 'Drafted',
    },
    create: {
      title: 'CSS Language',
      authorId: user4.id,
      star: 4,
      read: 682,
      status: 'Drafted',
    },
  })

  const post15 = await prisma.article.upsert({
    where: {
      title: 'JavaScript Language',
    },
    update: {
      authorId: user2.id,
      star: 3,
      read: 1043,
      status: 'Drafted',
    },
    create: {
      title: 'JavaScript Language',
      authorId: user5.id,
      star: 3,
      read: 1043,
      status: 'Drafted',
    },
  })

  console.log({ role1, role2 })
  console.log({ department1, department2 })
  console.log({ post1, post2, post3, post4, post5, post6, post7, post8, post9, post10, post11, post12, post13, post14, post15 })
  console.log({ user1, user2, user3, user4, user5 })
}

void main()
  .catch((e) => {
    console.error(e)
    // eslint-disable-next-line n/no-process-exit
    process.exit(-1)
  })
  .finally(() => {
    void prisma.$disconnect()
  })
