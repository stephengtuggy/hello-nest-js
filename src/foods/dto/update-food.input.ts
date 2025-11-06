import { CreateFoodInput } from './create-food.input';
import { InputType, Field, PartialType, ID } from '@nestjs/graphql';

@InputType()
export class UpdateFoodInput extends PartialType(CreateFoodInput) {
  @Field(() => ID)
  id: string;
}
