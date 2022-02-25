import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import MongoStore from 'connect-mongo';
import session from 'express-session';
import passport from 'passport';
import { AppModule } from './app.module';
import { UriProvider } from './db/db-uri.provider';
import { ErrorHandler } from './util/error.handler';

async function bootstrap() {
  process.env.START_TIME = Date.now().toString();
  ErrorHandler.hook();

  const app = await NestFactory.create(AppModule);
  app.enableVersioning();
  app.useGlobalPipes(new ValidationPipe());
  Logger.debug('Created & configured Application', 'root');

  app.use(
    session({
      secret: process.env.SECRET_KEY,
      resave: false,
      saveUninitialized: false,
      store: MongoStore.create({
        mongoUrl: new UriProvider().getSession(),
      }),
    }),
  );
  Logger.log('Registered Express Sessions', 'Sessions');
  Logger.debug('Connected to MongoDB Session Database', 'Sessions');

  app.use(passport.initialize());
  app.use(passport.session());
  Logger.log('Initialized Passport', 'AuthService');

  await app.listen(process.env.PORT);
  Logger.log(
    `Listening to PORT: ${process.env.PORT}`,
    `Application running on: ${await app.getUrl()}`,
    'root',
  );
}
bootstrap();
