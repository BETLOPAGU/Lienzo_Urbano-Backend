import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  Subscription,
} from '@nestjs/graphql';
import { NotificationsService } from './notifications.service';
import { Notification } from './entities/notification.entity';
import { Inject, UseGuards } from '@nestjs/common';
import { Jwt } from 'src/auth/decorators/jwt.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { JwtPayload } from 'src/auth/interfaces/jwt-payload.interface';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import { PUB_SUB } from 'src/pubsub/pubsub.module';
import { CreateNotificationInput } from './dto/create-notification.input';

@Resolver(() => Notification)
export class NotificationsResolver {
  constructor(
    private readonly notificationsService: NotificationsService,
    @Inject(PUB_SUB) private pubSub: RedisPubSub,
  ) {}

  @Query(() => [Notification], { name: 'notifications' })
  @UseGuards(JwtAuthGuard)
  findAll(@Jwt() jwt: JwtPayload) {
    return this.notificationsService.findAll(jwt.userId);
  }

  @Mutation(() => Notification)
  @UseGuards(JwtAuthGuard)
  createGlobalNotification(
    @Jwt() jwt: JwtPayload,
    @Args('title', { type: () => String }) title: string,
  ) {
    return this.notificationsService.createGlobalNotification(
      jwt.userId,
      title,
    );
  }

  @Mutation(() => Notification)
  markNotificationAsViewed(@Args('id', { type: () => Int }) id: number) {
    return this.notificationsService.markNotificationAsViewed(id);
  }

  @Mutation(() => Notification)
  removeNotification(@Args('id', { type: () => Int }) id: number) {
    return this.notificationsService.remove(id);
  }

  @Subscription(() => Notification)
  @UseGuards(JwtAuthGuard)
  userNotifications(@Jwt() jwt: JwtPayload) {
    return this.pubSub.asyncIterator(`USER_NOTIFICATIONS_${jwt.userId}`);
  }

  @Subscription(() => Notification)
  globalNotifications() {
    return this.pubSub.asyncIterator('GLOBAL_NOTIFICATIONS');
  }
}
