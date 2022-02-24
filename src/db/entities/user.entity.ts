import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import {
  IsInt,
  MinLength,
  MaxLength,
  IsEmail,
  IsDate,
  Min,
  Max,
} from 'class-validator';

@Entity({ name: 'UserTable' })
class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @MinLength(4)
  @MaxLength(16)
  name: string;

  @Column()
  @IsInt()
  @Min(0)
  @Max(9999)
  tag: number;

  @Column()
  @IsEmail()
  email: string;

  @Column()
  @IsDate()
  createdAt: Date;
}

export default UserEntity;
