import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { FoodsService } from './foods.service';
import { Food } from './entities/food.entity';
import { CreateFoodInput } from './dto/create-food.input';
import { UpdateFoodInput } from './dto/update-food.input';

@Resolver(() => Food)
export class FoodsResolver {
  constructor(private readonly foodsService: FoodsService) {}

  @Mutation(() => Food)
  createFood(@Args('createFoodInput') createFoodInput: CreateFoodInput) {
    return this.foodsService.create(createFoodInput);
  }

  @Query(() => [Food], { name: 'foods' })
  findAll() {
    return this.foodsService.findAll();
  }

  @Query(() => Food, { name: 'food' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.foodsService.findOne(id);
  }

  @Mutation(() => Food)
  updateFood(@Args('updateFoodInput') updateFoodInput: UpdateFoodInput) {
    return this.foodsService.update(updateFoodInput.id, updateFoodInput);
  }

  @Mutation(() => Food)
  removeFood(@Args('id', { type: () => Int }) id: number) {
    return this.foodsService.remove(id);
  }
}
