import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  Subscription,
} from '@nestjs/graphql';
import { CommentsService } from './comments.service';
import { Comment } from './entities/comment.entity';
import { CreateCommentInput } from './dto/create-comment.input';
import { Jwt } from 'src/auth/decorators/jwt.decorator';
import { JwtPayload } from 'src/auth/interfaces/jwt-payload.interface';
import { Inject, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import { PUB_SUB } from 'src/pubsub/pubsub.module';
import { User } from '../users/entities/user.entity';

@Resolver(() => Comment)
export class CommentsResolver {
  constructor(
    private readonly commentsService: CommentsService,
    @Inject(PUB_SUB) private pubSub: RedisPubSub,
  ) {}

  @Mutation(() => Comment)
  @UseGuards(JwtAuthGuard)
  createComment(
    @Jwt() jwt: JwtPayload,
    @Args('createCommentInput') createCommentInput: CreateCommentInput,
  ) {
    return this.commentsService.create(jwt.userId, createCommentInput);
  }

  @Query(() => [Comment], { name: 'comments' })
  findAll(
    @Args('userId', { type: () => Int, nullable: true }) userId?: number,
    @Args('artworkId', { type: () => Int, nullable: true }) artworkId?: number,
    @Args('commentId', { type: () => Int, nullable: true }) commentId?: number,
  ) {
    return this.commentsService.findAll({ userId, artworkId, commentId });
  }

  @Query(() => [User])
  @UseGuards(JwtAuthGuard)
  getListOfCommentedUsers(@Jwt() jwt: JwtPayload) {
    return this.commentsService.getListOfCommentedUsers(jwt.userId);
  }

  @Mutation(() => Comment)
  updateComment(
    @Args('id', { type: () => Int }) id: number,
    @Args('comment') comment: string,
  ) {
    return this.commentsService.update(id, comment);
  }

  @Mutation(() => Comment)
  removeComment(@Args('id', { type: () => Int }) id: number) {
    return this.commentsService.remove(id);
  }

  @Subscription(() => Comment)
  commentAdded(
    @Args('userId', { type: () => Int, nullable: true }) userId?: number,
    @Args('artworkId', { type: () => Int, nullable: true }) artworkId?: number,
    @Args('commentId', { type: () => Int, nullable: true }) commentId?: number,
  ) {
    if (userId)
      return this.pubSub.asyncIterator(`COMMENT_ADDED_FOR_USER_${userId}`);
    if (artworkId)
      return this.pubSub.asyncIterator(
        `COMMENT_ADDED_FOR_ARTWORK_${artworkId}`,
      );
    if (commentId)
      return this.pubSub.asyncIterator(
        `COMMENT_ADDED_FOR_COMMENT_${commentId}`,
      );
  }
}
