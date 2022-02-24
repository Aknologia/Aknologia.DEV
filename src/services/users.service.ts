import { Model, Connection } from 'mongoose';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from 'src/db/schemas/user.schema';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { AuthUserDto } from 'src/dto/auth-user.dto';
import { compare, hash } from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectConnection() private connection: Connection,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  public async create(createUserDto: CreateUserDto): Promise<User> {
    const hashedPassword = await hash(createUserDto.password, 10);
    try {
      const createdUser = new this.userModel({
        email: createUserDto.email,
        username: createUserDto.username,
        tag: (Math.floor(Math.random() * 10000) + 10000)
          .toString()
          .substring(1),
        password: hashedPassword,
        createdAt: Date.now(),
      });
      await createdUser.save();
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

  public async auth(authUserDto: AuthUserDto): Promise<User> {
    const user = await this.findByEmail(authUserDto.email);
    const isPasswordMatching = await compare(
      authUserDto.password,
      user.password,
    );
    if (!isPasswordMatching)
      throw new HttpException(
        'Invalid email and/or password.',
        HttpStatus.BAD_REQUEST,
      );

    user.password = undefined;
    return user;
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.userModel.findOne({
      email: email,
    });
    if (!user)
      throw new HttpException(
        'Invalid email and/or password.',
        HttpStatus.BAD_REQUEST,
      );
    return user;
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }
}
