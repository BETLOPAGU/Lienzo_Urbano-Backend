import { User } from 'src/users/entities/user.entity';
export declare class ArtworkCollaborator {
    id: number;
    artistId: number;
    artworkId: number;
    artist: User;
}
