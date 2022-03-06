import { Controller, Get, Res } from '@nestjs/common';
import { AppService } from './app.service';
import Utils from './util/utils.class';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getRoot() {
    return {
      uptime: Date.now() - parseInt(process.env.START_TIME),
      full_uptime: Utils.durationToString(
        Date.now() - parseInt(process.env.START_TIME),
      ),
      docs: '/docs',
      endpoints: [
        {
          version: 1,
          path: '/v1',
        },
      ],
    };
  }

  @Get('docs')
  getDocs(@Res() response) {
    return response.redirect(
      'https://documenter.getpostman.com/view/19755036/UVkvKYV5',
    );
  }
}
