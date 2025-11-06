import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class Food {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;
}
