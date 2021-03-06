import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpCode,
  Post,
  Req,
  UseGuards,
  UseInterceptors,
  Header,
} from '@nestjs/common';
import UserRequest from '../../auth/user-request.interface';
import { CreateUserDto } from '../../dto/create-user.dto';
import { CookieAuthGuard } from '../../guard/cookie.guard';
import { LocalAuthGuard } from '../../guard/local.guard';
import { AuthenticationService } from '../../service/auth/auth.service';

@Controller({
  path: 'auth',
  version: ['1'],
})
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Post('register')
  @Header('Content-Type', 'application/json')
  async authCreate(@Body() createUserDto: CreateUserDto) {
    return (await this.authenticationService.register(createUserDto)).toJSON();
  }

  @HttpCode(200)
  @UseGuards(LocalAuthGuard)
  @Header('content-type', 'application/json')
  @Post('login')
  authLogin(@Req() request: UserRequest) {
    return JSON.stringify(request.user);
  }

  @HttpCode(200)
  @UseGuards(CookieAuthGuard)
  @Get()
  async auth(@Req() request: UserRequest) {
    return request.user;
  }

  @HttpCode(200)
  @UseGuards(CookieAuthGuard)
  @Post('logout')
  async logOut(@Req() request: UserRequest) {
    request.logOut();
    request.session.cookie.maxAge = 0;
  }
}
