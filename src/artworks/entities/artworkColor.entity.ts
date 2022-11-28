import { ObjectType, Field, Int } from '@nestjs/graphql';
import { IsInt, IsString, MaxLength } from 'class-validator';

@ObjectType()
export class ArtworkColor {
  @Field(() => Int, { description: `ID from the record` })
  @IsInt()
  id: number;

  @Field(() => Int, { description: `ID from the artwork` })
  @IsInt()
  artworkId: number;

  @Field(() => String, { description: `Color contained on the artwork` })
  @IsString()
  @MaxLength(10)
  color: string;
}
