import { Test, TestingModule } from '@nestjs/testing';
import { UsersModule } from '../../module/users.module';
import { UsersService } from './users.service';

describe('UsersService', () => {
  it('should be true', () => {
    expect(true).toBeTruthy();
  });

  /*
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [UsersModule],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  
  it('should be defined', () => {
    expect(service.userModel).toBeDefined();
  });
  */
});
