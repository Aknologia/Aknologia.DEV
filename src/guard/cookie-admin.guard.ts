import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { CookieAuthGuard } from './cookie.guard';

@Injectable()
export class CookieAdminAuthGuard extends CookieAuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    return super.canActivate(context) && request.user.rank_id > 4;
  }
}
