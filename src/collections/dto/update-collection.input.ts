import { CreateCollectionInput } from './create-collection.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { IsInt } from 'class-validator';

@InputType()
export class UpdateCollectionInput extends PartialType(CreateCollectionInput) {
  @Field(() => Int, { description: `ID from the collection to update` })
  @IsInt()
  id: number;
}
