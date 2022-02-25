import { Model, Connection } from 'mongoose';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from 'src/db/schemas/user.schema';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { AuthUserDto } from 'src/dto/auth-user.dto';
import { compare, hash } from 'bcrypt';
import { UserDto } from 'src/dto/user.dto';
import { Request } from 'express';

declare module 'express-session' {
  interface Session {
    user: string;
  }
}

@Injectable()
export class UsersService {
  constructor(
    @InjectConnection() private connection: Connection,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  public async create(
    createUserDto: CreateUserDto,
    request: Request,
  ): Promise<User> {
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

      request.session.user = this.serialize(createdUser);
      request.session.save();
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

  public async auth(authUserDto: AuthUserDto, request: Request): Promise<User> {
    const user = await this.findByEmailAsDocument(authUserDto.email);
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

    request.session.user = this.serialize(user);
    request.session.save();
    return user;
  }

  public serialize(user: UserDocument) {
    return user.id;
  }

  public async deserialize(id: string): Promise<User> {
    try {
      const user = await this.find(id);
      user.password = undefined;
      user.full_name = `${user.username}#${user.tag}`;
      return user;
    } catch (error) {
      throw new HttpException(
        `Unknown user with ID '${id}'`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  public async deserializePublic(id: string): Promise<User> {
    const user = await this.deserialize(id);
    user.email = undefined;
    return user;
  }

  public async findByEmail(email: string): Promise<User> {
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

  public async findByEmailAsDocument(email: string): Promise<UserDocument> {
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

  public async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  public async find(id: string): Promise<User> {
    try {
      return await this.userModel.findById(id);
    } catch (error) {
      throw new HttpException(
        `Unknown user with ID '${id}'`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  public async update(id: string, userDto: UserDto): Promise<User> {
    try {
      return await this.userModel.findByIdAndUpdate(id, userDto);
    } catch (error) {
      throw new HttpException(
        `Unknown user with ID '${id}'`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  public async delete(id: string): Promise<User> {
    try {
      return await this.userModel.findByIdAndRemove(id);
    } catch (error) {
      throw new HttpException(
        `Unknown user with ID '${id}'`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
