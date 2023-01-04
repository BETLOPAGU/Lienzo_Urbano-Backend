import { CommentsService } from './comments.service';
import { Comment } from './entities/comment.entity';
import { CreateCommentInput } from './dto/create-comment.input';
import { JwtPayload } from 'src/auth/interfaces/jwt-payload.interface';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import { User } from '../users/entities/user.entity';
export declare class CommentsResolver {
    private readonly commentsService;
    private pubSub;
    constructor(commentsService: CommentsService, pubSub: RedisPubSub);
    createComment(jwt: JwtPayload, createCommentInput: CreateCommentInput): Promise<Comment>;
    findAll(userId?: number, artworkId?: number, commentId?: number): Promise<Comment[]>;
    getListOfCommentedUsers(jwt: JwtPayload): Promise<User[]>;
    updateComment(id: number, comment: string): Promise<Comment>;
    removeComment(id: number): Promise<Comment>;
    commentAdded(userId?: number, artworkId?: number, commentId?: number): AsyncIterator<unknown, any, undefined>;
}
