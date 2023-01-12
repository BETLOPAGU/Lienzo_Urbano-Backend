import { Field, InputType, PartialType } from '@nestjs/graphql';
import { IsOptional, IsString } from 'class-validator';
import { Artwork } from '../entities/artwork.entity';

@InputType()
export class FindArtworksInput extends PartialType(Artwork) {
  @Field(() => String, {
    description: `Computes the Euclidean distance between this color ant the colors of all artworks`,
    nullable: true,
  })
  @IsString()
  @IsOptional()
  color?: string;

  @Field(() => [String], {
    description: `Artistic movements`,
    nullable: true,
  })
  @IsOptional()
  movements?: string;

  @Field(() => [String], {
    description: `Artistic tags`,
    nullable: true,
  })
  @IsOptional()
  tags?: string;

  @Field(() => [String], {
    description: `Artistic materials`,
    nullable: true,
  })
  @IsOptional()
  materials?: string;
}
