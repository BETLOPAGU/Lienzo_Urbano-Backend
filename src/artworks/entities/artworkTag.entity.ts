import { ObjectType, Field, Int } from '@nestjs/graphql';
import { IsInt, IsString } from 'class-validator';

@ObjectType()
export class ArtworkTag {
  @Field(() => Int, { description: `ID from the record` })
  @IsInt()
  id: number;

  @Field(() => Int, { description: `ID from the artwork` })
  @IsInt()
  artworkId: number;

  @Field(() => String, { description: `Tag assigned to the artwork` })
  @IsString()
  tag: string;
}
