import { InputType, PartialType } from '@nestjs/graphql';
import { Artwork } from '../entities/artwork.entity';

@InputType()
export class FindArtworksInput extends PartialType(Artwork) {}
