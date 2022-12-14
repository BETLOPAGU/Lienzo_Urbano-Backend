import { InputType, OmitType } from '@nestjs/graphql';
import { Notification } from '../entities/notification.entity';

@InputType()
export class CreateNotificationInput extends OmitType(Notification, [
  'id',
] as const) {}
