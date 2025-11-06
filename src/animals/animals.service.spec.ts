import { Test, TestingModule } from '@nestjs/testing';
import { AnimalsService } from './animals.service';
import { LoggerModule } from '../logger.module';
import { AppModule } from '../app.module';

describe('AnimalsService', () => {
  let service: AnimalsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AnimalsService],
      imports: [LoggerModule],
    }).compile();

    service = module.get<AnimalsService>(AnimalsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
