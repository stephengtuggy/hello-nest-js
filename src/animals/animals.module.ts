import { Module } from '@nestjs/common';
import { AnimalsResolver } from './animals.resolver';
import { AnimalsService } from './animals.service';
import { LoggerModule } from '../logger.module';

@Module({
  providers: [AnimalsResolver, AnimalsService],
  imports: [LoggerModule],
})
export class AnimalsModule {}
