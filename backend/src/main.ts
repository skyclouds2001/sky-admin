import { HttpAdapterHost, NestFactory, Reflector } from '@nestjs/core'
import { ClassSerializerInterceptor, Logger, ValidationPipe } from '@nestjs/common'
import { NestExpressApplication } from '@nestjs/platform-express'
import { ConfigService } from '@nestjs/config'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { PrismaClientExceptionFilter } from 'nestjs-prisma'
import * as cookieParser from 'cookie-parser'
import * as compression from 'compression'
import * as session from 'express-session'
import { resolve } from 'node:path'
import { AppModule } from './app.module'
import { ExceptionsFilter } from './common/exception.filter'
import { HttpExceptionFilter } from './common/http-exception.filter'
import { TransformResultInterceptor } from './common/result.interceptor'

const bootstrap = async (): Promise<void> => {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    snapshot: true,
  })

  app.useStaticAssets(resolve(__dirname, '..', 'public'))

  app.setBaseViewsDir(resolve(__dirname, '..', 'view'))

  app.setViewEngine('hbs')

  app.setGlobalPrefix('api', {
    exclude: ['', 'docs'],
  })

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    })
  )

  app.useGlobalFilters(new PrismaClientExceptionFilter(app.get(HttpAdapterHost).httpAdapter))
  app.useGlobalFilters(new HttpExceptionFilter())
  app.useGlobalFilters(new ExceptionsFilter())

  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)))
  app.useGlobalInterceptors(new TransformResultInterceptor())

  app.use(cookieParser())
  app.use(compression())
  app.use(
    session({
      secret: 'xxx-xxx-xxx',
      resave: false,
      saveUninitialized: false,
      cookie: {
        secure: true,
      },
    })
  )

  SwaggerModule.setup(
    'docs',
    app,
    SwaggerModule.createDocument(app, new DocumentBuilder().setTitle('Sky Admin').setDescription('Api route document for Sky Admin').setVersion('0.0.0').setContact('skyclouds2001', 'https://skyclouds2001.github.io/', 'skyclouds2001@163.com').setLicense('MIT', 'https://mit-license.org/').addBearerAuth().build(), {
      ignoreGlobalPrefix: false,
    })
  )

  const port = app.get(ConfigService).get<number>('PORT') ?? 3000

  await app.listen(port, () => {
    Logger.log(`Application is running at http://localhost:${port}`)
  })
}

void bootstrap()
