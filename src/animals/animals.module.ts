import { Module } from '@nestjs/common';
import { AnimalsResolver } from './animals.resolver';
import { AnimalsService } from './animals.service';

@Module({
  providers: [AnimalsResolver, AnimalsService],
})
export class AnimalsModule {}
