import { ObjectType, Field, Int, InputType } from '@nestjs/graphql';
import { IsInt, IsOptional, IsString, MinLength } from 'class-validator';

@InputType('CollectionInput')
@ObjectType()
export class Collection {
  @Field(() => Int, { description: `ID from the collection` })
  @IsInt()
  id: number;

  @Field(() => Int, { description: `ID from the user` })
  @IsInt()
  userId: number;

  @Field(() => String, { description: `Name of the collection` })
  @IsString()
  @MinLength(1)
  name: string;

  @Field(() => String, {
    nullable: true,
    description: `URL from the AWS S3 where is stored the image`,
  })
  @IsString()
  @IsOptional()
  imageUrl?: string;

  @Field(() => Date, {
    nullable: true,
    description: `Creation date of the record`,
  })
  @IsOptional()
  createdDate?: Date;
}
