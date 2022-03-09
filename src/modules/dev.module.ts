import { Module } from '@nestjs/common';
import { UsersService } from 'src/services/users/users.service';
import { DevController } from 'src/v1/dev/dev.controller';

@Module({
  imports: [],
  controllers: [DevController],
  providers: [],
})
export class DevModule {}
