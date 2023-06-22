import { HttpAdapterHost, NestFactory, Reflector } from '@nestjs/core'
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { PrismaClientExceptionFilter, PrismaService } from 'nestjs-prisma'
import { AppModule } from './app.module'
import { ResultInterceptor } from './result/result.interceptor'

/**
 * main initial method
 */
async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule, {
    snapshot: true,
  })

  SwaggerModule.setup('docs', app, SwaggerModule.createDocument(app, new DocumentBuilder().setTitle('Sky Admin').setDescription('Api route document for Sky Admin').setVersion('0.0.0').setContact('skyclouds2001', 'https://skyclouds2001.github.io/', 'skyclouds2001@163.com').setLicense('MIT', 'https://mit-license.org/').addBearerAuth().build()))

  app.setGlobalPrefix('api', {
    exclude: ['docs'],
  })

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    })
  )

  app.useGlobalFilters(new PrismaClientExceptionFilter(app.get(HttpAdapterHost).httpAdapter))

  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)))
  app.useGlobalInterceptors(new ResultInterceptor())

  await app.get(PrismaService).enableShutdownHooks(app)

  await app.listen(app.get(ConfigService).get<number>('PORT'))
}

void bootstrap()
