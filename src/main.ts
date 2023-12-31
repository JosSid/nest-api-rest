import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as logger from 'morgan';
import { CORS } from './constants';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(logger('dev'));

  app.useGlobalPipes(
    new ValidationPipe({
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  const configService = app.get(ConfigService);

  app.enableCors(CORS);

  app.setGlobalPrefix('api/v1');

  await app.listen(configService.get('PORT'));

  console.log(`Server running on ${await app.getUrl()}`);
}
bootstrap();
