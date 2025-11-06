import { Test, TestingModule } from '@nestjs/testing';
import { AnimalsResolver } from './animals.resolver';
import { AnimalsService } from './animals.service';
import { AppModule } from '../app.module';
import { LoggerModule } from '../logger.module';

describe('AnimalsResolver', () => {
  let resolver: AnimalsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AnimalsService, AnimalsResolver],
      imports: [LoggerModule],
    }).compile();

    resolver = module.get<AnimalsResolver>(AnimalsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
