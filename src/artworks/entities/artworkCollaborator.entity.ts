import { ObjectType, Field, Int } from '@nestjs/graphql';
import { IsInt } from 'class-validator';

@ObjectType()
export class ArtworkCollaborator {
  @Field(() => Int, { description: `ID from the record` })
  @IsInt()
  id: number;

  @Field(() => Int, { description: `ID from the artist` })
  @IsInt()
  artistId: number;

  @Field(() => Int, { description: `ID from the artwork` })
  @IsInt()
  artworkId: number;
}
