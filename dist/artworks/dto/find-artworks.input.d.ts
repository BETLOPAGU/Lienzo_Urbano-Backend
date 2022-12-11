import { Artwork } from '../entities/artwork.entity';
declare const FindArtworksInput_base: import("@nestjs/common").Type<Partial<Artwork>>;
export declare class FindArtworksInput extends FindArtworksInput_base {
    color?: string;
}
export {};
