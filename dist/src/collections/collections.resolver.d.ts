import { CollectionsService } from './collections.service';
import { Collection } from './entities/collection.entity';
import { CreateCollectionInput } from './dto/create-collection.input';
import { UpdateCollectionInput } from './dto/update-collection.input';
import { JwtPayload } from 'src/auth/interfaces/jwt-payload.interface';
import { ArtworkCollection } from './entities/artworkCollection.entity';
import { Artwork } from '../artworks/entities/artwork.entity';
export declare class CollectionsResolver {
    private readonly collectionsService;
    constructor(collectionsService: CollectionsService);
    createCollection(jwt: JwtPayload, createCollectionInput: CreateCollectionInput): Promise<Collection>;
    updateCollection(updateCollectionInput: UpdateCollectionInput): Promise<Collection>;
    removeCollection(id: number): Promise<Collection>;
    addRemoveArtworkFromCollection(collectionId: number, artworkId: number): Promise<ArtworkCollection>;
    artworks(collection: Collection): Promise<Artwork[]>;
}
