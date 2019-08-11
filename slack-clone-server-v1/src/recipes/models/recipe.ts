import { Field, ID, ObjectType } from 'type-graphql';

@ObjectType()
export class Recipe {
  @Field()
  hi: string;
}
