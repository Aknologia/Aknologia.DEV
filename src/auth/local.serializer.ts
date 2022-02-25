import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { User } from 'src/db/schemas/user.schema';
import { UsersService } from 'src/services/users/users.service';

@Injectable()
export class LocalSerializer extends PassportSerializer {
  constructor(private readonly usersService: UsersService) {
    super();
  }

  serializeUser(user: User, done: CallableFunction) {
    done(null, this.usersService.serialize(user));
  }

  async deserializeUser(userId: string, done: CallableFunction) {
    done(null, await this.usersService.deserialize(userId));
  }
}
