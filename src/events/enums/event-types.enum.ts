import { registerEnumType } from '@nestjs/graphql';

export enum EventTypes {
  VISIT = 1,
  COMMENT = 2,
  FAVORITE = 3,
}

registerEnumType(EventTypes, {
  name: 'EventTypes',
  description: 'Event types supported',
});
