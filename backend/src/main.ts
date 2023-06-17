import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

/**
 * 初始化方法
 */
async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule)

  SwaggerModule.setup('api', app, SwaggerModule.createDocument(app, new DocumentBuilder().setTitle('Sky Admin').setDescription('Api route document for Sky Admin').setVersion('0.0.0').build()))

  await app.listen(3000)
}

void bootstrap()
