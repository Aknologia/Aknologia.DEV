import { Controller, Get, Param, Req } from '@nestjs/common';
import { Request } from 'express';
import { UsersService } from 'src/services/users.service';

@Controller({
  path: 'user',
  version: ['1'],
})
export class UserController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async getCurrent(@Req() request: Request) {
    return this.usersService.deserialize(request.session.user);
  }

  @Get(':id')
  async getUser(@Param('id') id: string) {
    return this.usersService.deserializePublic(id);
  }
}
