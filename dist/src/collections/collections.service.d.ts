import { PrismaService } from 'src/prisma.service';
import { CreateCollectionInput } from './dto/create-collection.input';
import { UpdateCollectionInput } from './dto/update-collection.input';
import { ArtworkCollection } from './entities/artworkCollection.entity';
import { Artwork } from '../artworks/entities/artwork.entity';
import { Collection } from './entities/collection.entity';
export declare class CollectionsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(userId: number, createCollectionInput: CreateCollectionInput): Promise<Collection>;
    update(id: number, updateCollectionInput: UpdateCollectionInput): Promise<Collection>;
    remove(id: number): Promise<Collection>;
    addRemoveArtworkFromCollection(payload: {
        collectionId: number;
        artworkId: number;
    }): Promise<ArtworkCollection>;
    artworks(collection: Collection): Promise<Artwork[]>;
}
