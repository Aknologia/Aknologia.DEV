import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { AuthUserDto } from 'src/dto/auth-user.dto';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthenticationService {
  constructor(private readonly usersService: UsersService) {}

  public async register(createUserDto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    try {
      const createdUser = new this.usersService.userModel({
        email: createUserDto.email,
        username: createUserDto.username,
        tag: (Math.floor(Math.random() * 10000) + 10000)
          .toString()
          .substring(1),
        password: hashedPassword,
        createdAt: Date.now(),
      });

      await this.usersService.create(createdUser);
      createdUser.password = undefined;

      return createdUser;
    } catch (error) {
      if (error?.name === 'MongoServerError' && error?.code === 11000) {
        throw new HttpException(
          'Email already in use.',
          HttpStatus.BAD_REQUEST,
        );
      }
      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  public async auth(authUserDto: AuthUserDto) {
    const user = await this.usersService.findByEmailAsDocument(
      authUserDto.email,
    );
    await this.verifyPassword(authUserDto.password, user.password);

    user.password = undefined;

    return user;
  }

  private async verifyPassword(plainText: string, hashed: string) {
    const isPasswordMatching = await bcrypt.compare(plainText, hashed);
    if (!isPasswordMatching) {
      throw new HttpException(
        'Invalid email and/or password.',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
