import { HttpAdapterHost, NestFactory } from '@nestjs/core'
import { ValidationPipe } from '@nestjs/common'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { PrismaClientExceptionFilter } from 'nestjs-prisma'
import { AppModule } from './app.module'

/**
 * 初始化方法
 */
async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule)

  SwaggerModule.setup('api', app, SwaggerModule.createDocument(app, new DocumentBuilder().setTitle('Sky Admin').setDescription('Api route document for Sky Admin').setVersion('0.0.0').build()))

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }))

  app.useGlobalFilters(new PrismaClientExceptionFilter(app.get(HttpAdapterHost).httpAdapter))

  await app.listen(3000)
}

void bootstrap()
