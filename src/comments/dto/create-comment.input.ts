import { InputType, OmitType } from '@nestjs/graphql';
import { Comment } from '../entities/comment.entity';

@InputType()
export class CreateCommentInput extends OmitType(Comment, [
  'id',
  'commentatorId',
] as const) {}
