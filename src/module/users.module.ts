import { Module } from '@nestjs/common';
import { getConnectionToken, MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { LocalSerializer } from '../auth/local.serializer';
import { LocalStrategy } from '../auth/local.strategy';
import { User, UserSchema } from '../db/schemas/user.schema';
import { AuthenticationService } from '../service/auth/auth.service';
import { UsersService } from '../service/users/users.service';
import { AuthController } from '../v1/auth/auth.controller';
import { UserController } from '../v1/user/user.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    PassportModule,
  ],
  controllers: [AuthController, UserController],
  providers: [
    UsersService,
    AuthenticationService,
    LocalStrategy,
    LocalSerializer,
  ],
})
export class UsersModule {}
