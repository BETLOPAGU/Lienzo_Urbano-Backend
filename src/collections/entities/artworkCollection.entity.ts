import { ObjectType, Field, Int } from '@nestjs/graphql';
import { IsInt } from 'class-validator';

@ObjectType()
export class ArtworkCollection {
  @Field(() => Int, { description: `ID from the record` })
  @IsInt()
  id: number;

  @Field(() => Int, { description: `ID from the artwork` })
  @IsInt()
  artworkId: number;

  @Field(() => Int, { description: `ID from the collection` })
  @IsInt()
  collectionId: number;
}
