import { Artwork } from '../entities/artwork.entity';
declare const CreateArtworkInput_base: import("@nestjs/common").Type<Omit<Artwork, "id" | "artistId">>;
export declare class CreateArtworkInput extends CreateArtworkInput_base {
    photo?: string;
    collaborators?: number[];
    tags?: string[];
    addresses?: string[];
    movements?: string[];
    materials?: string[];
}
export {};
