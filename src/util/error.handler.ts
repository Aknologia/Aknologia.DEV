import { Logger } from '@nestjs/common';

export abstract class ErrorHandler {
  public static hook() {
    process.on('uncaughtException', (error) => {
      Logger.error(error, 'UncaughtException');
      console.log(error.stack);
    });
  }
}
