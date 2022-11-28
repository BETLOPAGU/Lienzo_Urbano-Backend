import { ObjectType, Field, Int, InputType } from '@nestjs/graphql';
import { IsInt, IsOptional, IsString, MinLength } from 'class-validator';

@InputType('CommentInput')
@ObjectType()
export class Comment {
  @Field(() => Int, { description: `ID from the comment` })
  @IsInt()
  id: number;

  @Field(() => Int, {
    description: `ID from the user that created the comment`,
  })
  @IsInt()
  commentatorId: number;

  @Field(() => String, { description: `Comment body` })
  @IsString()
  @MinLength(1)
  comment: string;

  @Field(() => Int, {
    description: `ID from the user that is being commented`,
    nullable: true,
  })
  @IsInt()
  @IsOptional()
  userId?: number;

  @Field(() => Int, {
    description: `ID from the artwork that is being commented`,
    nullable: true,
  })
  @IsInt()
  @IsOptional()
  artworkId?: number;

  @Field(() => Int, {
    description: `ID from the comment that is being commented`,
    nullable: true,
  })
  @IsInt()
  @IsOptional()
  commentId?: number;

  @Field(() => Date, {
    nullable: true,
    description: `Creation date of the record`,
  })
  @IsOptional()
  createdDate?: Date;
}
