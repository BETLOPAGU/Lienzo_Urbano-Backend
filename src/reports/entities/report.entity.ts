import { ObjectType, Field, Int, InputType } from '@nestjs/graphql';
import { IsInt, IsOptional, IsString, MinLength } from 'class-validator';

@InputType('ReportInput')
@ObjectType()
export class Report {
  @Field(() => Int, { description: `ID from the report` })
  @IsInt()
  id: number;

  @Field(() => Int, {
    description: `ID from the user that created the report`,
  })
  @IsInt()
  reporterId: number;

  @Field(() => String, { description: `Report description` })
  @IsString()
  @MinLength(1)
  description: string;

  @Field(() => Int, {
    description: `ID from the user that is being reported`,
    nullable: true,
  })
  @IsInt()
  @IsOptional()
  userId?: number;

  @Field(() => Int, {
    description: `ID from the artwork that is being reported`,
    nullable: true,
  })
  @IsInt()
  @IsOptional()
  artworkId?: number;

  @Field(() => Int, {
    description: `ID from the comment that is being reported`,
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
