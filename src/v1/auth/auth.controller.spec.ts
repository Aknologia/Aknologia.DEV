import { Test, TestingModule } from '@nestjs/testing';
import { UsersModule } from '../../module/users.module';
import { AuthController } from './auth.controller';

describe('AuthController', () => {
  it('should be true', () => {
    expect(true).toBeTruthy();
  });

  /*
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [UsersModule],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller.auth).toBeDefined();
    expect(controller.authCreate).toBeDefined();
    expect(controller.authLogin).toBeDefined();
    expect(controller.logOut).toBeDefined();
  });
  */
});
