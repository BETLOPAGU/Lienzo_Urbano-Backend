import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateCollectionInput } from './dto/create-collection.input';
import { UpdateCollectionInput } from './dto/update-collection.input';
import { ArtworkCollection } from './entities/artworkCollection.entity';
import { Artwork } from '../artworks/entities/artwork.entity';
import { Collection } from './entities/collection.entity';

@Injectable()
export class CollectionsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    userId: number,
    createCollectionInput: CreateCollectionInput,
  ): Promise<Collection> {
    return this.prisma.collections.create({
      data: {
        createdDate: new Date(),
        userId,
        name: createCollectionInput.name,
        imageUrl: createCollectionInput.imageUrl,
      },
    });
  }

  async update(
    id: number,
    updateCollectionInput: UpdateCollectionInput,
  ): Promise<Collection> {
    return this.prisma.collections.update({
      data: updateCollectionInput,
      where: { id },
    });
  }

  async remove(id: number): Promise<Collection> {
    return this.prisma.collections.delete({ where: { id } });
  }

  async addRemoveArtworkFromCollection(payload: {
    collectionId: number;
    artworkId: number;
  }): Promise<ArtworkCollection> {
    const { collectionId, artworkId } = payload;
    const dbRecord = await this.prisma.artworkCollections.findFirst({
      where: { collectionId, artworkId },
    });

    if (dbRecord) {
      return this.prisma.artworkCollections.delete({
        where: { id: dbRecord.id },
      });
    } else {
      return this.prisma.artworkCollections.create({
        data: {
          artworkId,
          collectionId,
        },
      });
    }
  }

  async artworks(collection: Collection): Promise<Artwork[]> {
    const records = await this.prisma.artworkCollections.findMany({
      where: { collectionId: collection.id },
      include: { artworks: true },
    });
    return records.map((record) => record.artworks);
  }
}
