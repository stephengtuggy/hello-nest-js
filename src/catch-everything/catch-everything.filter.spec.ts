import { CatchEverythingFilter } from './catch-everything.filter';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../app.module';
import { LoggerModule } from '../logger.module';

describe('CatchEverythingFilter', () => {
  let catchEverythingFilter: CatchEverythingFilter;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CatchEverythingFilter],
      imports: [LoggerModule],
    }).compile();

    catchEverythingFilter = module.get(CatchEverythingFilter);
  });

  it('should be defined', () => {
    expect(catchEverythingFilter).toBeDefined();
  });
});
