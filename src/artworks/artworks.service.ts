import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateArtworkInput } from './dto/create-artwork.input';
import { FindArtworksInput } from './dto/find-artworks.input';
import { UpdateArtworkInput } from './dto/update-artwork.input';
import { Artwork } from './entities/artwork.entity';
import { FavoriteArtwork } from './entities/favoriteArtwork.entity';
import { ArtworkCollaborator } from './entities/artworkCollaborator.entity';
import { ArtworkTag } from './entities/artworkTag.entity';
import { ArtworkColor } from './entities/artworkColor.entity';
import { ArtworkMovement } from './entities/artworkMovement.entity';
import { ArtworkMaterial } from './entities/artworkMaterial.entity';
import { User } from 'src/users/entities/user.entity';
import { S3Service } from 'src/s3.service';
import { extractImageColors } from 'src/utils/extractImageColors';
import * as chroma from 'chroma-js';
import { EventTypes } from 'src/events/enums/event-types.enum';
import { RedisService } from 'src/redis.service';

@Injectable()
export class ArtworksService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly s3Service: S3Service,
    private readonly redisService: RedisService,
  ) {}

  deleteExtraProps(input: CreateArtworkInput | UpdateArtworkInput) {
    const photo = input.photo;
    delete input.photo;

    const collaborators = input.collaborators;
    delete input.collaborators;

    const tags = input.tags;
    delete input.tags;

    const addresses = input.addresses;
    delete input.addresses;

    const movements = input.movements;
    delete input.movements;

    const materials = input.materials;
    delete input.materials;

    return {
      photo,
      collaborators,
      tags,
      addresses,
      movements,
      materials,
    };
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

    if (!artwork) return artwork;

    if (extraProps.photo) {
      const imageUrl = await this.s3Service.uploadPhoto(
        extraProps.photo,
        `lienzo_urbano_artwork_${artwork.id}`,
      );
      if (imageUrl) {
        await this.prisma.artworks.update({
          where: { id: artwork.id },
          data: {
            imageUrl,
          },
        });
        artwork.imageUrl = imageUrl;
      }
    }
    if (artwork.imageUrl) {
      const colors = await extractImageColors(artwork.imageUrl);
      await this.overwriteColors(artwork.id, colors);
    }

    await this.overwriteCollaborators(artwork.id, extraProps.collaborators);
    await this.overwriteTags(artwork.id, extraProps.tags);
    await this.overwriteMovements(artwork.id, extraProps.movements);
    await this.overwriteMaterials(artwork.id, extraProps.materials);

    return artwork;
  }

  async findAll(findArtworksInput?: FindArtworksInput): Promise<Artwork[]> {
    if (!findArtworksInput) findArtworksInput = {};

    const color = findArtworksInput.color;
    delete findArtworksInput.color;

    let artworks = await this.prisma.artworks.findMany({
      where: { ...findArtworksInput, isDeleted: false },
      include: { artworksColors: true },
    });

    if (color) {
      const minimunDistance = 50;
      const artworksFilteredByColor = artworks.filter((artwork) => {
        const avgColor = artwork.artworksColors.find((c) =>
          c.color.startsWith('AVG'),
        )?.color;
        if (!avgColor || typeof avgColor !== 'string') return false;

        const distance = chroma.distance(avgColor.replace('AVG', ''), color);
        return distance < minimunDistance;
      });
      artworks = artworksFilteredByColor;
    }

    return artworks;
  }

  async findByGeoRadius(userId: number, radius: number): Promise<Artwork[]> {
    const user = await this.prisma.users.findUnique({ where: { id: userId } });

    const artworkIds = await this.redisService.getArtworksOnRadius({
      longitude: user.longitude || -115.17258,
      latitude: user.latitude || 36.11996,
      radius: radius,
    });

    return this.prisma.artworks.findMany({
      where: {
        id: {
          in: artworkIds,
        },
      },
    });
  }

  async findOne(userId: number, artworkId: number): Promise<Artwork> {
    await this.prisma.events.create({
      data: {
        artworkId,
        userId,
        typeId: EventTypes.VISIT,
        createdDate: new Date(),
      },
    });
    return this.prisma.artworks.findUnique({ where: { id: artworkId } });
  }

  async update(
    id: number,
    updateArtworkInput: UpdateArtworkInput,
  ): Promise<Artwork> {
    const extraProps = this.deleteExtraProps(updateArtworkInput);
    await this.overwriteCollaborators(id, extraProps.collaborators);
    await this.overwriteTags(id, extraProps.tags);
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
      await this.prisma.events.deleteMany({
        where: {
          artworkId,
          userId,
          typeId: EventTypes.FAVORITE,
        },
      });
      return this.prisma.favoritesArtworks.delete({
        where: { id: favoriteArtworkRecord.id },
      });
    } else {
      await this.prisma.events.create({
        data: {
          artworkId,
          userId,
          typeId: EventTypes.FAVORITE,
          createdDate: new Date(),
        },
      });
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
    const result = await this.prisma.artworksCollaborators.findMany({
      where: { artworkId: artwork.id },
      include: {
        users: true,
      },
    });
    const collaborators = result.map((c) => ({ ...c, artist: c.users }));
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
