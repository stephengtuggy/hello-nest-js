import { Module } from '@nestjs/common';
import { FoodsService } from './foods.service';
import { FoodsResolver } from './foods.resolver';

@Module({
  providers: [FoodsResolver, FoodsService],
})
export class FoodsModule {}
