import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateFoodInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
