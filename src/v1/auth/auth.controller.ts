import { Body, Controller, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { AuthUserDto } from 'src/dto/auth-user.dto';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { UsersService } from 'src/services/users.service';

@Controller({
  path: 'auth',
  version: ['1'],
})
export class AuthController {
  constructor(private readonly usersService: UsersService) {}

  @Post('login')
  authLogin(@Body() authUserDto: AuthUserDto, @Req() request: Request) {
    return this.usersService.auth(authUserDto, request);
  }

  @Post('create')
  authCreate(@Body() createUserDto: CreateUserDto, @Req() request: Request) {
    return this.usersService.create(createUserDto, request);
  }
}
