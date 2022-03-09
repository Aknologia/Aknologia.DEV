import { Controller, Get, HttpCode, Logger, Param, Req, UseGuards } from '@nestjs/common';
import { CookieAdminAuthGuard } from 'src/guard/cookie-admin.guard';
import { UsersService } from 'src/services/users/users.service';
import * as newman from 'newman';

@Controller({
  path: 'dev',
  version: ['1'],
})
export class DevController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(CookieAdminAuthGuard)
  @HttpCode(200)
  @Get('newman')
  async getNewmanReport() {
    newman.run({
      collection: process.env.POSTMAN_COLLECTION,
      reporters: ['cli', 'html']
    }, (err) => {
      if(err) throw err;
      Logger.log('Newman Report complete with [cli, html].', 'Postman API')
    })
  }
}
