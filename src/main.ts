import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableVersioning();
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.PORT);
  Logger.log(`Listening to PORT: ${process.env.PORT}`);
  Logger.log(`Application running on: ${await app.getUrl()}`);
}
bootstrap();
