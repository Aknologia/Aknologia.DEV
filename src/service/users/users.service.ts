import { Model } from 'mongoose';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../../db/schemas/user.schema';
import { UserDto } from '../../dto/user.dto';

declare module 'express-session' {
  interface Session {
    user: string;
  }
}

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('User') public readonly userModel: Model<UserDocument>,
  ) {}

  public async create(user: UserDocument): Promise<User> {
    return user.save();
  }

  public serialize(user: User) {
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
