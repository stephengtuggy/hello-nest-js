import { CreateFoodInput } from './create-food.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateFoodInput extends PartialType(CreateFoodInput) {
  @Field(() => Int)
  id: number;
}
