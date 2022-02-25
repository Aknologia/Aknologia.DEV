import { Request } from 'express';
import { User } from 'src/db/schemas/user.schema';

export default interface UserRequest extends Request {
  user: User;
}
