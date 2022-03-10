import { Request } from 'express';
import { User } from '../db/schemas/user.schema';

export default interface UserRequest extends Request {
  user: User;
}
