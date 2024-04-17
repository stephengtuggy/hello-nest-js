import { Test, TestingModule } from '@nestjs/testing';
import { AnimalsResolver } from './animals.resolver';
import { AnimalsService } from './animals.service';

describe('AnimalsResolver', () => {
  let resolver: AnimalsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AnimalsService, AnimalsResolver],
    }).compile();

    resolver = module.get<AnimalsResolver>(AnimalsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
