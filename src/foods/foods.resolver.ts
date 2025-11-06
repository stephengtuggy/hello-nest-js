import {
  Resolver,
  Query,
  Mutation,
  Args,
  Subscription,
  ID,
} from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { FoodsService } from './foods.service';
import { Food } from './entities/food.entity';
import { CreateFoodInput } from './dto/create-food.input';
import { UpdateFoodInput } from './dto/update-food.input';
import { NotFoundException } from '@nestjs/common';

const pubSub = new PubSub();

@Resolver(() => Food)
export class FoodsResolver {
  constructor(private readonly foodsService: FoodsService) {}

  @Mutation(() => Food)
  async createFood(@Args('createFoodInput') createFoodInput: CreateFoodInput): Promise<Food> {
    const food = await this.foodsService.create(createFoodInput);
    await pubSub.publish('foodAdded', { food });
    return food;
  }

  @Query(() => [Food], { name: 'foods' })
  async findAll(): Promise<Food[]> {
    return await this.foodsService.findAll();
  }

  @Query(() => Food, { name: 'food' })
  async findOne(@Args('id', { type: () => ID }) id: string): Promise<Food> {
    const food = await this.foodsService.findOneByID(id);
    if (!food) {
      throw new NotFoundException();
    }
    return food;
  }

  @Mutation(() => Food)
  async updateFood(@Args('updateFoodInput') updateFoodInput: UpdateFoodInput): Promise<Food> {
    const food = await this.foodsService.update(updateFoodInput);
    await pubSub.publish('foodUpdated', { food });
    return food;
  }

  @Mutation(() => Food)
  async removeFood(@Args('id', { type: () => ID }) id: string): Promise<boolean> {
    const success = await this.foodsService.remove(id);
    if (success) {
      await pubSub.publish('foodRemoved', { foodRemoved: id });
    }
    return success;
  }

  @Subscription(() => Food)
  foodAdded() {
    return pubSub.asyncIterableIterator('foodAdded');
  }

  @Subscription(() => Food)
  foodUpdated() {
    return pubSub.asyncIterableIterator('foodUpdated');
  }

  @Subscription(() => Food)
  foodRemoved() {
    return pubSub.asyncIterableIterator('foodRemoved');
  }
}
