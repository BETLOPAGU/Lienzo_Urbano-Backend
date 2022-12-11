import { Field, InputType, Int, OmitType } from '@nestjs/graphql';
import { IsArray, IsOptional } from 'class-validator';
import { Artwork } from '../entities/artwork.entity';

@InputType()
export class CreateArtworkInput extends OmitType(Artwork, [
  'id',
  'artistId',
] as const) {
  @Field(() => String, {
    nullable: true,
    description: `Photo from the user`,
  })
  @IsOptional()
  photo?: string;

  @Field(() => [Int], {
    description: `List of collaborators artists`,
    nullable: true,
  })
  @IsOptional()
  @IsArray()
  collaborators?: number[];

  @Field(() => [String], {
    description: `List of tags from the artwork`,
    nullable: true,
  })
  @IsOptional()
  @IsArray()
  tags?: string[];

  @Field(() => [String], {
    description: `List of addresses from the artwork`,
    nullable: true,
  })
  @IsOptional()
  @IsArray()
  addresses?: string[];

  @Field(() => [String], {
    description: `List of artistic movements from the artwork`,
    nullable: true,
  })
  @IsOptional()
  @IsArray()
  movements?: string[];

  @Field(() => [String], {
    description: `List of materials from the artwork`,
    nullable: true,
  })
  @IsOptional()
  @IsArray()
  materials?: string[];
}
