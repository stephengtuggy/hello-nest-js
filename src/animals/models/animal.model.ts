import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Animal {
    @Field(type => ID)
    id: string;

    @Field()
    name: string;
}
