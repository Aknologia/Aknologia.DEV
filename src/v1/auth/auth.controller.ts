import { Body, Controller, Post } from '@nestjs/common';
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
  authLogin(@Body() authUserDto: AuthUserDto) {
    return this.usersService.auth(authUserDto);
  }

  @Post('create')
  authCreate(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }
}
