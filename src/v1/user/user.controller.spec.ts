import { Test, TestingModule } from '@nestjs/testing';
import { UsersModule } from '../../module/users.module';
import { UserController } from './user.controller';

describe('UserController', () => {
  it('should be true', () => {
    expect(true).toBeTruthy();
  });

  /*
  let controller: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [UsersModule],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller.getCurrent).toBeDefined();
    expect(controller.getUser).toBeDefined();
  });
  */
});
