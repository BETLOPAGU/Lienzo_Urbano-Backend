import { ObjectType, Field, Int } from '@nestjs/graphql';
import { IsInt } from 'class-validator';

@ObjectType()
export class FavoriteArtwork {
  @Field(() => Int, { description: `ID from the record` })
  @IsInt()
  id: number;

  @Field(() => Int, { description: `ID from the artwork` })
  @IsInt()
  artworkId: number;

  @Field(() => Int, { description: `ID from the user` })
  @IsInt()
  userId: number;

  @Field(() => Date, { description: `Date of creation of the record` })
  createdDate: Date;
}
