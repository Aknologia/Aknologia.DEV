import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { LocalSerializer } from 'src/auth/local.serializer';
import { LocalStrategy } from 'src/auth/local.strategy';
import { User, UserSchema } from 'src/db/schemas/user.schema';
import { AuthenticationService } from 'src/service/auth/auth.service';
import { UsersService } from 'src/service/users/users.service';
import { AuthController } from 'src/v1/auth/auth.controller';
import { UserController } from 'src/v1/user/user.controller';

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
