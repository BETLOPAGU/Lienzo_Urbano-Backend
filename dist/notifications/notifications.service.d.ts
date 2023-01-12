import { RedisPubSub } from 'graphql-redis-subscriptions';
import { PrismaService } from 'src/prisma.service';
import { CreateNotificationInput } from './dto/create-notification.input';
import { Notification } from './entities/notification.entity';
export declare class NotificationsService {
    private readonly prisma;
    private pubSub;
    constructor(prisma: PrismaService, pubSub: RedisPubSub);
    create(createNotificationInput: CreateNotificationInput): Promise<Notification>;
    findAll(userId: number): Promise<Notification[]>;
    markNotificationAsViewed(id: number): Promise<Notification>;
    createGlobalNotification(userId: number, title: string): Promise<Notification>;
    remove(id: number): Promise<Notification>;
}
