import { Controller, Get, Param, Req, UseGuards } from '@nestjs/common';
import UserRequest from '../../auth/user-request.interface';
import { CookieAuthGuard } from '../../guard/cookie.guard';
import { UsersService } from '../../service/users/users.service';

@Controller({
  path: 'user',
  version: ['1'],
})
export class UserController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(CookieAuthGuard)
  @Get()
  async getCurrent(@Req() request: UserRequest) {
    return request.user;
  }

  @UseGuards(CookieAuthGuard)
  @Get(':id')
  async getUser(@Param('id') id: string) {
    return this.usersService.deserializePublic(id);
  }
}
