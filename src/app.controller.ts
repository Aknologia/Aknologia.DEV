import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getRoot() {
    return {
      uptime: Date.now() - parseInt(process.env.START_TIME),
      docs: 'https://aknologia.dev/api.docs',
      endpoints: [
        {
          version: 1,
          path: '/v1',
        },
      ],
    };
  }
}
