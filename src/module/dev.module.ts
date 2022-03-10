import { Module } from '@nestjs/common';
import { DevController } from '../v1/dev/dev.controller';

@Module({
  imports: [],
  controllers: [DevController],
  providers: [],
})
export class DevModule {}
