import { Inject, Injectable } from '@nestjs/common';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import { PrismaService } from 'src/prisma.service';
import { PUB_SUB } from 'src/pubsub/pubsub.module';
import { NotificationTypes } from 'src/users/enums/notification-types.enum';
import { CreateNotificationInput } from './dto/create-notification.input';
import { Notification } from './entities/notification.entity';

@Injectable()
export class NotificationsService {
  constructor(
    private readonly prisma: PrismaService,
    @Inject(PUB_SUB) private pubSub: RedisPubSub,
  ) {}

  async create(
    createNotificationInput: CreateNotificationInput,
  ): Promise<Notification> {
    const defaultType = NotificationTypes.SUCCESS;

    const notification = await this.prisma.notifications.create({
      data: {
        userId: createNotificationInput.userId,
        typeId: createNotificationInput.typeId || defaultType,
        title: createNotificationInput.title || 'Notificación',
        content: createNotificationInput.content,
        createdDate: new Date(),
      },
    });

    this.pubSub.publish(
      `USER_NOTIFICATIONS_${createNotificationInput.userId}`,
      { userNotifications: notification },
    );

    return notification;
  }

  async findAll(userId: number): Promise<Notification[]> {
    return this.prisma.notifications.findMany({
      where: { userId },
    });
  }

  async markNotificationAsViewed(id: number): Promise<Notification> {
    return this.prisma.notifications.update({
      data: { viewed: true },
      where: { id },
    });
  }

  async remove(id: number): Promise<Notification> {
    return this.prisma.notifications.delete({ where: { id } });
  }
}
