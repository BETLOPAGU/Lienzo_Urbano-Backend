import { registerEnumType } from '@nestjs/graphql';

export enum NotificationTypes {
  INFO = 1,
  SUCCESS = 2,
  ERROR = 3,
}

registerEnumType(NotificationTypes, {
  name: 'NotificationTypes',
  description: 'Notification types supported',
});
