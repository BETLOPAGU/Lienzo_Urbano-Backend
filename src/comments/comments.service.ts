import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateCommentInput } from './dto/create-comment.input';
import { Comment } from './entities/comment.entity';

@Injectable()
export class CommentsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    commentatorId: number,
    createCommentInput: CreateCommentInput,
  ): Promise<Comment> {
    const { userId, artworkId, commentId } = createCommentInput;
    return this.prisma.comments.create({
      data: {
        createdDate: new Date(),
        commentatorId,
        comment: createCommentInput.comment,
        ...(userId ? { userId } : {}),
        ...(artworkId ? { artworkId } : {}),
        ...(commentId ? { commentId } : {}),
      },
    });
  }

  async findAll(payload: {
    userId?: number;
    artworkId?: number;
    commentId?: number;
  }): Promise<Comment[]> {
    const { userId, artworkId, commentId } = payload;
    return this.prisma.comments.findMany({
      where: {
        ...(userId ? { userId } : {}),
        ...(artworkId ? { artworkId } : {}),
        ...(commentId ? { commentId } : {}),
      },
    });
  }

  async update(id: number, comment: string): Promise<Comment> {
    return this.prisma.comments.update({ where: { id }, data: { comment } });
  }

  async remove(id: number): Promise<Comment> {
    return this.prisma.comments.delete({ where: { id } });
  }
}
