import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as logger from 'morgan';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(logger('dev'));

  const configService = app.get(ConfigService);

  await app.listen(configService.get('PORT'));
}
bootstrap();
