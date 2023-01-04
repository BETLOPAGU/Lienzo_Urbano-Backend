import { InputType, OmitType } from '@nestjs/graphql';
import { Event } from '../entities/event.entity';

@InputType()
export class CreateEventInput extends OmitType(Event, [
  'id',
  'userId',
] as const) {}
