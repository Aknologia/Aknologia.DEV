import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/db/schemas/user.schema';
import { UsersService } from 'src/services/users.service';
import { AuthController } from 'src/v1/auth/auth.controller';
import { UserController } from 'src/v1/user/user.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [AuthController, UserController],
  providers: [UsersService],
})
export class UsersModule {}
