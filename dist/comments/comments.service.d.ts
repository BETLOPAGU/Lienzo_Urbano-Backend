import { RedisPubSub } from 'graphql-redis-subscriptions';
import { PrismaService } from 'src/prisma.service';
import { CreateCommentInput } from './dto/create-comment.input';
import { Comment } from './entities/comment.entity';
import { User } from '../users/entities/user.entity';
import { NotificationsService } from 'src/notifications/notifications.service';
export declare class CommentsService {
    private readonly prisma;
    private readonly notificationsService;
    private pubSub;
    constructor(prisma: PrismaService, notificationsService: NotificationsService, pubSub: RedisPubSub);
    create(commentatorId: number, createCommentInput: CreateCommentInput): Promise<Comment>;
    findAll(payload: {
        userId?: number;
        artworkId?: number;
        commentId?: number;
    }): Promise<Comment[]>;
    chatConversation(currentUserId: number, userId: number): Promise<Comment[]>;
    listOfCommentedUsers(userId: number): Promise<User[]>;
    update(id: number, comment: string): Promise<Comment>;
    remove(id: number): Promise<Comment>;
}
