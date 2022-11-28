import { ObjectType, Field, Int } from '@nestjs/graphql';
import { IsInt } from 'class-validator';

@ObjectType()
export class Follower {
  @Field(() => Int, { description: `ID from the record` })
  @IsInt()
  id: number;

  @Field(() => Int, { description: `ID from the user` })
  @IsInt()
  userId: number;

  @Field(() => Int, { description: `ID from the follower` })
  @IsInt()
  followerId: number;

  @Field(() => Date, { description: `Date of creation of the record` })
  createdDate: Date;
}
