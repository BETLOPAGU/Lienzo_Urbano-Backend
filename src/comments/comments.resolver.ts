import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CommentsService } from './comments.service';
import { Comment } from './entities/comment.entity';
import { CreateCommentInput } from './dto/create-comment.input';
import { Jwt } from 'src/auth/decorators/jwt.decorator';
import { JwtPayload } from 'src/auth/interfaces/jwt-payload.interface';

@Resolver(() => Comment)
export class CommentsResolver {
  constructor(private readonly commentsService: CommentsService) {}

  @Mutation(() => Comment)
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
}
