import { ObjectType, Field, Int } from '@nestjs/graphql';
import { IsInt } from 'class-validator';

@ObjectType()
export class UserRating {
  @Field(() => Int, { description: `ID from the record` })
  @IsInt()
  id: number;

  @Field(() => Int, { description: `ID from the user` })
  @IsInt()
  userId: number;

  @Field(() => Int, { description: `ID from the qualifier` })
  @IsInt()
  qualifierId: number;

  @Field(() => Int, { description: `Assigned rating` })
  @IsInt()
  rating: number;
}
