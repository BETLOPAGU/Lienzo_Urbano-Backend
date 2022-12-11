import { PrismaService } from 'src/prisma.service';
import { CreateCommentInput } from './dto/create-comment.input';
import { Comment } from './entities/comment.entity';
export declare class CommentsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(commentatorId: number, createCommentInput: CreateCommentInput): Promise<Comment>;
    findAll(payload: {
        userId?: number;
        artworkId?: number;
        commentId?: number;
    }): Promise<Comment[]>;
    update(id: number, comment: string): Promise<Comment>;
    remove(id: number): Promise<Comment>;
}
