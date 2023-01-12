import { NotificationsService } from './notifications.service';
import { Notification } from './entities/notification.entity';
import { JwtPayload } from 'src/auth/interfaces/jwt-payload.interface';
import { RedisPubSub } from 'graphql-redis-subscriptions';
export declare class NotificationsResolver {
    private readonly notificationsService;
    private pubSub;
    constructor(notificationsService: NotificationsService, pubSub: RedisPubSub);
    findAll(jwt: JwtPayload): Promise<Notification[]>;
    createGlobalNotification(jwt: JwtPayload, title: string): Promise<Notification>;
    markNotificationAsViewed(id: number): Promise<Notification>;
    removeNotification(id: number): Promise<Notification>;
    userNotifications(userId?: number): AsyncIterator<unknown, any, undefined>;
    globalNotifications(): AsyncIterator<unknown, any, undefined>;
}
