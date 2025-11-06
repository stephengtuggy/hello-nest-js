import { InputType, Field } from '@nestjs/graphql';
import { MaxLength } from 'class-validator';

@InputType()
export class CreateFoodInput {
  @Field()
  @MaxLength(255)
  name: string;
}
