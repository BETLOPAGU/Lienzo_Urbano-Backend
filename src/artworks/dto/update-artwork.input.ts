import { Field, InputType, Int, PartialType } from '@nestjs/graphql';
import { IsInt } from 'class-validator';
import { CreateArtworkInput } from './create-artwork.input';

@InputType()
export class UpdateArtworkInput extends PartialType(CreateArtworkInput) {
  @Field(() => Int, { description: `ID from the artwork to update` })
  @IsInt()
  id: number;
}
