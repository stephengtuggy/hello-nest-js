import { Field, ID, InputType, PartialType } from '@nestjs/graphql';
import { NewAnimalInput } from './new-animal.input';

@InputType()
export class UpdateAnimalInput extends PartialType(NewAnimalInput) {
  @Field(() => ID)
  id: string;
}
