import { Inject, Injectable } from '@nestjs/common';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import { PrismaService } from 'src/prisma.service';
import { PUB_SUB } from 'src/pubsub/pubsub.module';
import { CreateCommentInput } from './dto/create-comment.input';
import { Comment } from './entities/comment.entity';
import { User } from '../users/entities/user.entity';
import { NotificationsService } from 'src/notifications/notifications.service';
import { EventTypes } from 'src/events/enums/event-types.enum';

@Injectable()
export class CommentsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly notificationsService: NotificationsService,
    @Inject(PUB_SUB) private pubSub: RedisPubSub,
  ) {}

  async create(
    commentatorId: number,
    createCommentInput: CreateCommentInput,
  ): Promise<Comment> {
    const { userId, artworkId, commentId } = createCommentInput;

    const commentator = await this.prisma.users.findUnique({
      where: { id: commentatorId },
    });

    const commentCreated = await this.prisma.comments.create({
      data: {
        createdDate: new Date(),
        commentatorId,
        comment: createCommentInput.comment,
        ...(userId ? { userId } : {}),
        ...(artworkId ? { artworkId } : {}),
        ...(commentId ? { commentId } : {}),
      },
    });

    if (userId) {
      this.pubSub.publish(`COMMENT_ADDED_FOR_USER_${userId}`, {
        commentAdded: commentCreated,
      });
      await this.notificationsService.create({
        userId,
        title: `Has recibido un nuevo mensaje de ${commentator.firstName} ${commentator.lastName}`,
        content: commentCreated.comment,
      });
    }

    if (artworkId) {
      const artwork = await this.prisma.artworks.findUnique({
        where: { id: artworkId },
      });
      this.pubSub.publish(`COMMENT_ADDED_FOR_ARTWORK_${artworkId}`, {
        commentAdded: commentCreated,
      });
      await this.notificationsService.create({
        userId: artwork.artistId,
        title: `${commentator.firstName} ${commentator.lastName} ha comentado tu obra de arte "${artwork.title}"`,
        content: commentCreated.comment,
      });

      await this.prisma.events.create({
        data: {
          artworkId,
          userId: artwork.artistId,
          typeId: EventTypes.COMMENT,
          createdDate: new Date(),
        },
      });
    }

    if (commentId) {
      const comment = await this.prisma.comments.findUnique({
        where: { id: commentId },
      });
      this.pubSub.publish(`COMMENT_ADDED_FOR_COMMENT_${commentId}`, {
        commentAdded: comment,
      });
      await this.notificationsService.create({
        userId: comment.commentatorId,
        title: `${commentator.firstName} ${commentator.lastName} ha comentado tu comentario`,
        content: commentCreated.comment,
      });
    }

    return commentCreated;
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
      orderBy: {
        id: 'desc',
      },
    });
  }

  async chatConversation(
    currentUserId: number,
    userId: number,
  ): Promise<Comment[]> {
    return this.prisma.comments.findMany({
      where: {
        OR: [
          {
            AND: [
              {
                commentatorId: currentUserId,
                userId: userId,
              },
            ],
          },
          {
            AND: [
              {
                commentatorId: userId,
                userId: currentUserId,
              },
            ],
          },
        ],
      },
      orderBy: {
        id: 'asc',
      },
    });
  }

  async listOfCommentedUsers(userId: number): Promise<User[]> {
    const comments = await this.prisma.comments.groupBy({
      by: ['userId'],
      where: {
        AND: [{ commentatorId: userId }, { NOT: [{ userId: null }] }],
      },
    });

    return this.prisma.users.findMany({
      where: {
        OR: [
          {
            id: { in: comments.map((c) => c.userId) },
          },
          {
            id: {
              gte: 0,
            },
          },
        ],
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
