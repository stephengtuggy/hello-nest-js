import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Food {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
