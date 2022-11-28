import { registerEnumType } from '@nestjs/graphql';

export enum UserTypes {
  GUEST = 1,
  ARTIST = 2,
  ADMIN = 3,
}

registerEnumType(UserTypes, {
  name: 'UserTypes',
  description: 'User types supported',
});
