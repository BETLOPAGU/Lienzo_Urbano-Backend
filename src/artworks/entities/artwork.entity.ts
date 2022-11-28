import { ObjectType, Field, Int, InputType, Float } from '@nestjs/graphql';
import {
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

@InputType('ArtworkInput')
@ObjectType()
export class Artwork {
  @Field(() => Int, { description: `ID from the artwork` })
  @IsInt()
  id: number;

  @Field(() => Int, { description: `ID from the artist` })
  @IsInt()
  artistId: number;

  @Field(() => String, { description: `Title of the artwork` })
  @IsString()
  @MinLength(1)
  title: string;

  @Field(() => String, {
    nullable: true,
    description: `Description of the artwork`,
  })
  @IsString()
  @MinLength(5)
  @IsOptional()
  description?: string;

  @Field(() => String, {
    nullable: true,
    description: `URL from the AWS S3 where is stored the artwork image`,
  })
  @IsString()
  @IsOptional()
  imageUrl?: string;

  @Field(() => Int, {
    nullable: true,
    description: `Minimum working hours to complete the artwork`,
  })
  @IsNumber()
  @IsOptional()
  minWorkingHours?: number;

  @Field(() => Int, {
    nullable: true,
    description: `Maximum working hours to complete the artwork`,
  })
  @IsNumber()
  @IsOptional()
  maxWorkingHours?: number;

  @Field(() => Float, {
    nullable: true,
    description: `Minimum price for the artwork`,
  })
  @IsNumber()
  @IsOptional()
  minPrice?: number;

  @Field(() => Float, {
    nullable: true,
    description: `Maximum price for the artwork`,
  })
  @IsNumber()
  @IsOptional()
  maxPrice?: number;

  @Field(() => Float, {
    nullable: true,
    description: `Minimum height required to do the artwork`,
  })
  @IsNumber()
  @IsOptional()
  minHeight?: number;

  @Field(() => Float, {
    nullable: true,
    description: `Maximum height allowed to do the artwork`,
  })
  @IsNumber()
  @IsOptional()
  maxHeight?: number;

  @Field(() => Float, {
    nullable: true,
    description: `Minimum width required to do the artwork`,
  })
  @IsNumber()
  @IsOptional()
  minWidth?: number;

  @Field(() => Float, {
    nullable: true,
    description: `Maximum width allowed to do the artwork`,
  })
  @IsNumber()
  @IsOptional()
  maxWidth?: number;

  @Field(() => Date, {
    nullable: true,
    description: `Publication date of the artwork`,
  })
  @IsOptional()
  createdDate?: Date;

  @Field(() => Date, {
    nullable: true,
    description: `Date of deletion of the artwork`,
  })
  @IsOptional()
  deletedDate?: Date;

  @Field(() => Boolean, {
    nullable: true,
    description: `Boolean to know if the artwork is soft deleted`,
  })
  @IsOptional()
  isDeleted?: boolean;
}
