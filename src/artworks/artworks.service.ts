import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateArtworkInput } from './dto/create-artwork.input';
import { FindArtworksInput } from './dto/find-artworks.input';
import { UpdateArtworkInput } from './dto/update-artwork.input';
import { Artwork } from './entities/artwork.entity';
import { FavoriteArtwork } from './entities/favoriteArtwork.entity';
import { ArtworkCollaborator } from './entities/artworkCollaborator.entity';
import { ArtworkTag } from './entities/artworkTag.entity';
import { ArtworkAddress } from './entities/artworkAddress.entity';
import { ArtworkColor } from './entities/artworkColor.entity';
import { ArtworkMovement } from './entities/artworkMovement.entity';
import { ArtworkMaterial } from './entities/artworkMaterial.entity';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class ArtworksService {
  constructor(private readonly prisma: PrismaService) {}

  deleteExtraProps(input: CreateArtworkInput | UpdateArtworkInput) {
    const collaborators = input.collaborators;
    delete input.collaborators;

    const tags = input.tags;
    delete input.tags;

    const addresses = input.addresses;
    delete input.addresses;

    const colors = input.colors;
    delete input.colors;

    const movements = input.movements;
    delete input.movements;

    const materials = input.materials;
    delete input.materials;

    return { collaborators, tags, addresses, colors, movements, materials };
  }

  async create(
    artistId: number,
    createArtworkInput: CreateArtworkInput,
  ): Promise<Artwork> {
    const extraProps = this.deleteExtraProps(createArtworkInput);

    createArtworkInput.createdDate = new Date();
    const artwork = await this.prisma.artworks.create({
      data: { artistId, ...createArtworkInput },
    });

    await this.overwriteCollaborators(artwork.id, extraProps.collaborators);
    await this.overwriteTags(artwork.id, extraProps.tags);
    await this.overwriteAddresses(artwork.id, extraProps.addresses);
    await this.overwriteColors(artwork.id, extraProps.colors);
    await this.overwriteMovements(artwork.id, extraProps.movements);
    await this.overwriteMaterials(artwork.id, extraProps.materials);

    return artwork;
  }

  async findAll(findArtworksInput?: FindArtworksInput): Promise<Artwork[]> {
    if (!findArtworksInput) findArtworksInput = { isDeleted: false };
    return this.prisma.artworks.findMany({
      where: findArtworksInput,
    });
  }

  async findOne(id: number): Promise<Artwork> {
    return this.prisma.artworks.findUnique({ where: { id } });
  }

  async update(
    id: number,
    updateArtworkInput: UpdateArtworkInput,
  ): Promise<Artwork> {
    const extraProps = this.deleteExtraProps(updateArtworkInput);
    await this.overwriteCollaborators(id, extraProps.collaborators);
    await this.overwriteTags(id, extraProps.tags);
    await this.overwriteAddresses(id, extraProps.addresses);
    await this.overwriteColors(id, extraProps.colors);
    await this.overwriteMovements(id, extraProps.movements);
    await this.overwriteMaterials(id, extraProps.materials);

    return this.prisma.artworks.update({
      data: updateArtworkInput,
      where: { id },
    });
  }

  async remove(id: number): Promise<Artwork> {
    return this.prisma.artworks.delete({ where: { id } });
  }

  async markUnmarkFavorite(
    userId: number,
    artworkId: number,
  ): Promise<FavoriteArtwork> {
    const favoriteArtworkRecord = await this.prisma.favoritesArtworks.findFirst(
      {
        where: { artworkId, userId },
      },
    );

    if (favoriteArtworkRecord) {
      return this.prisma.favoritesArtworks.delete({
        where: { id: favoriteArtworkRecord.id },
      });
    } else {
      return this.prisma.favoritesArtworks.create({
        data: {
          createdDate: new Date(),
          artworkId,
          userId,
        },
      });
    }
  }

  async favoriteCount(artwork: Artwork): Promise<number> {
    return this.prisma.favoritesArtworks.count({
      where: { artworkId: artwork.id },
    });
  }

  async overwriteCollaborators(
    artworkId: number,
    collaborators?: number[],
  ): Promise<number> {
    if (!collaborators || collaborators.length === 0) return 0;

    await this.prisma.artworksCollaborators.deleteMany({
      where: { artworkId },
    });

    const result = this.prisma.artworksCollaborators.createMany({
      data: collaborators.map((artistId) => ({
        artistId,
        artworkId,
      })),
    });
    return (await result).count;
  }

  async collaborators(artwork: Artwork): Promise<ArtworkCollaborator[]> {
    const result =  await this.prisma.artworksCollaborators.findMany({
      where: { artworkId: artwork.id },
      include: {
        users: true,
      }
    });
    const collaborators = result.map(c => ({...c, artist: c.users}))
    return collaborators;
  }

  async overwriteTags(artworkId: number, tags?: string[]): Promise<number> {
    if (!tags || tags.length === 0) return 0;

    await this.prisma.artworksTags.deleteMany({
      where: { artworkId },
    });

    const result = this.prisma.artworksTags.createMany({
      data: tags.map((tag) => ({
        tag,
        artworkId,
      })),
    });
    return (await result).count;
  }

  async tags(artwork: Artwork): Promise<ArtworkTag[]> {
    return this.prisma.artworksTags.findMany({
      where: { artworkId: artwork.id },
    });
  }

  async overwriteAddresses(
    artworkId: number,
    addresses?: string[],
  ): Promise<number> {
    if (!addresses || addresses.length === 0) return 0;

    await this.prisma.artworksAddresses.deleteMany({
      where: { artworkId },
    });

    const result = this.prisma.artworksAddresses.createMany({
      data: addresses.map((address) => ({
        address,
        artworkId,
      })),
    });
    return (await result).count;
  }

  async addresses(artwork: Artwork): Promise<ArtworkAddress[]> {
    return this.prisma.artworksAddresses.findMany({
      where: { artworkId: artwork.id },
    });
  }

  async overwriteColors(artworkId: number, colors?: string[]): Promise<number> {
    if (!colors || colors.length === 0) return 0;

    await this.prisma.artworksColors.deleteMany({
      where: { artworkId },
    });

    const result = this.prisma.artworksColors.createMany({
      data: colors.map((color) => ({
        color,
        artworkId,
      })),
    });
    return (await result).count;
  }

  async colors(artwork: Artwork): Promise<ArtworkColor[]> {
    return this.prisma.artworksColors.findMany({
      where: { artworkId: artwork.id },
    });
  }

  async overwriteMovements(
    artworkId: number,
    movements?: string[],
  ): Promise<number> {
    if (!movements || movements.length === 0) return 0;

    await this.prisma.artworksMovements.deleteMany({
      where: { artworkId },
    });

    const result = this.prisma.artworksMovements.createMany({
      data: movements.map((movement) => ({
        movement,
        artworkId,
      })),
    });
    return (await result).count;
  }

  async movements(artwork: Artwork): Promise<ArtworkMovement[]> {
    return this.prisma.artworksMovements.findMany({
      where: { artworkId: artwork.id },
    });
  }

  async overwriteMaterials(
    artworkId: number,
    materials?: string[],
  ): Promise<number> {
    if (!materials || materials.length === 0) return 0;

    await this.prisma.artworksMaterials.deleteMany({
      where: { artworkId },
    });

    const result = this.prisma.artworksMaterials.createMany({
      data: materials.map((material) => ({
        material,
        artworkId,
      })),
    });
    return (await result).count;
  }

  async materials(artwork: Artwork): Promise<ArtworkMaterial[]> {
    return this.prisma.artworksMaterials.findMany({
      where: { artworkId: artwork.id },
    });
  }

  async artist(artwork: Artwork): Promise<User> {
    return this.prisma.users.findUnique({
      where: { id: artwork.artistId },
    });
  }
}
