import { Field, InputType } from '@nestjs/graphql';
import { MaxLength } from 'class-validator';

@InputType()
export class NewAnimalInput {
  @Field()
  @MaxLength(255)
  name: string;
}
