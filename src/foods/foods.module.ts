import { Module } from '@nestjs/common';
import { FoodsService } from './foods.service';
import { FoodsResolver } from './foods.resolver';
import { LoggerModule } from '../logger.module';

@Module({
  providers: [FoodsResolver, FoodsService],
  imports: [LoggerModule]
})
export class FoodsModule {}
