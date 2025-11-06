import { Test, TestingModule } from '@nestjs/testing';
import { FoodsService } from './foods.service';
import { LoggerModule } from '../logger.module';

describe('FoodsService', () => {
  let service: FoodsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FoodsService],
      imports: [LoggerModule],
    }).compile();

    service = module.get<FoodsService>(FoodsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
