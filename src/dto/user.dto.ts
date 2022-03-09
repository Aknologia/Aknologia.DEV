import { Type } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  Length,
  Matches,
  MaxLength,
  MinLength
} from 'class-validator';

export class UserDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(20)
  @Matches(/^(?=.{4,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/)
  username: string;

  @IsNotEmpty()
  @Length(4)
  tag: number;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  createdAt: Date;

  @IsOptional()
  tags: string[];
}
