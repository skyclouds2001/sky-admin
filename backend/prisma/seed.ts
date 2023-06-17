import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// eslint-disable-next-line jsdoc/require-jsdoc
async function main(): Promise<void> {
  const post1 = await prisma.article.upsert({
    where: {
      title: 'Hello World',
    },
    update: {},
    create: {
      title: 'Hello World',
      author: 'ag',
      reviewer: 'rw',
      star: 4,
      read: 234,
      status: 'Drafted',
    },
  })
  const post2 = await prisma.article.upsert({
    where: {
      title: 'Hello Every One',
    },
    update: {},
    create: {
      title: 'Hello Every One',
      author: 'estar',
      reviewer: 'ksg',
      star: 3,
      read: 2314,
      status: 'Published',
    },
  })
  const post3 = await prisma.article.upsert({
    where: {
      title: 'Hello User',
    },
    update: {},
    create: {
      title: 'Hello User',
      author: 'wb',
      reviewer: 'ttg',
      star: 5,
      read: 534,
      status: 'Published',
    },
  })
  const post4 = await prisma.article.upsert({
    where: {
      title: 'Hello People',
    },
    update: {},
    create: {
      title: 'Hello People',
      author: 'edgm',
      reviewer: 'wolf',
      star: 2,
      read: 1267,
      status: 'Published',
    },
  })
  const post5 = await prisma.article.upsert({
    where: {
      title: 'Hello Human',
    },
    update: {},
    create: {
      title: 'Hello Human',
      author: 'we',
      reviewer: 'lgd',
      star: 3,
      read: 767,
      status: 'Drafted',
    },
  })
  const post6 = await prisma.article.upsert({
    where: {
      title: 'C Language',
    },
    update: {},
    create: {
      title: 'C Language',
      author: 'ag',
      reviewer: 'rw',
      star: 4,
      read: 289,
      status: 'Drafted',
    },
  })
  const post7 = await prisma.article.upsert({
    where: {
      title: 'C++ Language',
    },
    update: {},
    create: {
      title: 'C++ Language',
      author: 'estar',
      reviewer: 'ksg',
      star: 3,
      read: 389,
      status: 'Published',
    },
  })
  const post8 = await prisma.article.upsert({
    where: {
      title: 'Java Language',
    },
    update: {},
    create: {
      title: 'Java Language',
      author: 'wb',
      reviewer: 'ttg',
      star: 4,
      read: 1073,
      status: 'Published',
    },
  })
  const post9 = await prisma.article.upsert({
    where: {
      title: 'Python Language',
    },
    update: {},
    create: {
      title: 'Python Language',
      author: 'edgm',
      reviewer: 'wolf',
      star: 4,
      read: 1087,
      status: 'Published',
    },
  })
  const post10 = await prisma.article.upsert({
    where: {
      title: 'Go Language',
    },
    update: {},
    create: {
      title: 'Go Language',
      author: 'we',
      reviewer: 'lhd',
      star: 2,
      read: 927,
      status: 'Drafted',
    },
  })
  const post11 = await prisma.article.upsert({
    where: {
      title: 'Swift Language',
    },
    update: {},
    create: {
      title: 'Swift Language',
      author: 'ag',
      reviewer: 'rw',
      star: 2,
      read: 456,
      status: 'Published',
    },
  })
  const post12 = await prisma.article.upsert({
    where: {
      title: 'Kotlin Language',
    },
    update: {},
    create: {
      title: 'Kotlin Language',
      author: 'estar',
      reviewer: 'ksg',
      star: 1,
      read: 1452,
      status: 'Published',
    },
  })
  const post13 = await prisma.article.upsert({
    where: {
      title: 'HTML Language',
    },
    update: {},
    create: {
      title: 'HTML Language',
      author: 'wb',
      reviewer: 'ttg',
      star: 3,
      read: 724,
      status: 'Published',
    },
  })
  const post14 = await prisma.article.upsert({
    where: {
      title: 'CSS Language',
    },
    update: {},
    create: {
      title: 'CSS Language',
      author: 'estar',
      reviewer: 'ksg',
      star: 4,
      read: 682,
      status: 'Drafted',
    },
  })
  const post15 = await prisma.article.upsert({
    where: {
      title: 'JavaScript Language',
    },
    update: {},
    create: {
      title: 'JavaScript Language',
      author: 'we',
      reviewer: 'lgd',
      star: 3,
      read: 1043,
      status: 'Drafted',
    },
  })

  console.log({ post1, post2, post3, post4, post5, post6, post7, post8, post9, post10, post11, post12, post13, post14, post15 })
}

// eslint-disable-next-line promise/catch-or-return
main()
  .catch((e) => {
    console.error(e)
    // eslint-disable-next-line n/no-process-exit
    process.exit(-1)
  })
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  .finally(async () => {
    await prisma.$disconnect()
  })
