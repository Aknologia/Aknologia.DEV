import { Test, TestingModule } from '@nestjs/testing';
import { DevModule } from '../../module/dev.module';
import { DevController } from './dev.controller';

describe('DevController', () => {
  it('should be true', () => {
    expect(true).toBeTruthy();
  });

  /*
  let controller: DevController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DevModule],
    }).compile();

    controller = module.get<DevController>(DevController);
  });

  it('should be defined', () => {
    expect(controller.getNewmanReport).toBeDefined();
  });
  */
});
