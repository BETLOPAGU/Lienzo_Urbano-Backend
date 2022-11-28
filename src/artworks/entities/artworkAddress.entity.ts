import { ObjectType, Field, Int } from '@nestjs/graphql';
import { IsInt, IsString } from 'class-validator';

@ObjectType()
export class ArtworkAddress {
  @Field(() => Int, { description: `ID from the record` })
  @IsInt()
  id: number;

  @Field(() => Int, { description: `ID from the artwork` })
  @IsInt()
  artworkId: number;

  @Field(() => String, { description: `Address from the artwork` })
  @IsString()
  address: string;
}
