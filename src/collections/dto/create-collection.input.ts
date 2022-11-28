import { InputType, OmitType } from '@nestjs/graphql';
import { Collection } from '../entities/collection.entity';

@InputType()
export class CreateCollectionInput extends OmitType(Collection, [
  'id',
  'userId',
] as const) {}
