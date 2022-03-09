import {
  Controller,
  Get,
  Header,
  HttpCode,
  Logger,
  Param,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CookieAdminAuthGuard } from 'src/guard/cookie-admin.guard';
import * as newman from 'newman';
import { readFileSync, readdirSync, unlinkSync } from 'fs';
import { join } from 'path';

@Controller({
  path: 'dev',
  version: ['1'],
})
export class DevController {
  constructor() {}

  @UseGuards(CookieAdminAuthGuard)
  @HttpCode(200)
  @Header('Content-Type', 'text/html')
  @Get('newman')
  async getNewmanReport() {
    await new Promise<void>((resolve, reject) => {
      newman.run(
        {
          collection: process.env.POSTMAN_COLLECTION,
          reporters: ['html'],
        },
        (err) => {
          if (err) throw err;
          Logger.log('Newman Report complete with [cli, html].', 'Postman API');
          resolve();
        },
      );
    });
    let foundReport;
    readdirSync(join(process.cwd(), 'newman')).forEach((f) =>
      f.startsWith('newman-run-report') ? (foundReport = f) : null,
    );
    const data = readFileSync(
      join(process.cwd(), `newman/${foundReport}`),
      'utf-8',
    );
    unlinkSync(join(process.cwd(), `newman/${foundReport}`));
    return data;
  }
}
