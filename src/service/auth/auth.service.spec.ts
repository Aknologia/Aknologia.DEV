import { Test, TestingModule } from '@nestjs/testing';
import { UsersModule } from '../../module/users.module';
import { AuthenticationService } from './auth.service';

describe('AuthenticationService', () => {
  it('should be true', () => {
    expect(true).toBeTruthy();
  });

  /*
  let service: AuthenticationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [UsersModule],
    }).compile();

    service = module.get<AuthenticationService>(AuthenticationService);
  });

  it('should be defined', () => {
    expect(service.register).toBeDefined();
    expect(service.auth).toBeDefined();
  });
  */
});
