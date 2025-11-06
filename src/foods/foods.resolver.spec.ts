import { Test, TestingModule } from '@nestjs/testing';
import { FoodsResolver } from './foods.resolver';
import { FoodsService } from './foods.service';
import { LoggerModule } from '../logger.module';

describe('FoodsResolver', () => {
  let resolver: FoodsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FoodsResolver, FoodsService],
      imports: [LoggerModule],
    }).compile();

    resolver = module.get<FoodsResolver>(FoodsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
