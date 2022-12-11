import { CommentsService } from './comments.service';
import { Comment } from './entities/comment.entity';
import { CreateCommentInput } from './dto/create-comment.input';
import { JwtPayload } from 'src/auth/interfaces/jwt-payload.interface';
export declare class CommentsResolver {
    private readonly commentsService;
    constructor(commentsService: CommentsService);
    createComment(jwt: JwtPayload, createCommentInput: CreateCommentInput): Promise<Comment>;
    findAll(userId?: number, artworkId?: number, commentId?: number): Promise<Comment[]>;
    updateComment(id: number, comment: string): Promise<Comment>;
    removeComment(id: number): Promise<Comment>;
}
