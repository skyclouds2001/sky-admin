import { HttpAdapterHost, NestFactory, Reflector } from '@nestjs/core'
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { PrismaClientExceptionFilter, PrismaService } from 'nestjs-prisma'
import { AppModule } from './app.module'

/**
 * main initial method
 */
async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule)

  SwaggerModule.setup('api', app, SwaggerModule.createDocument(app, new DocumentBuilder().setTitle('Sky Admin').setDescription('Api route document for Sky Admin').setVersion('0.0.0').addBearerAuth().build()))

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }))

  app.useGlobalFilters(new PrismaClientExceptionFilter(app.get(HttpAdapterHost).httpAdapter))

  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)))

  await app.get(PrismaService).enableShutdownHooks(app)

  await app.listen(app.get(ConfigService).get<number>('PORT'))
}

void bootstrap()
