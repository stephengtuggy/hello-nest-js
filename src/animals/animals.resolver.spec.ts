import { Test, TestingModule } from '@nestjs/testing';
import { AnimalsResolver } from './animals.resolver';

describe('AnimalsResolver', () => {
  let resolver: AnimalsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AnimalsResolver],
    }).compile();

    resolver = module.get<AnimalsResolver>(AnimalsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
