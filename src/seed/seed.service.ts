import { Injectable } from '@nestjs/common';
import { ArtworksService } from '../artworks/artworks.service';
import { UsersService } from '../users/users.service';
import { User } from 'src/users/entities/user.entity';
import { Artwork } from '../artworks/entities/artwork.entity';
import { UserTypes } from 'src/users/enums/user-types.enum';
import { CollectionsService } from '../collections/collections.service';
import { ReportsService } from '../reports/reports.service';
import { CommentsService } from '../comments/comments.service';
import { Collection } from '../collections/entities/collection.entity';
import { Comment } from 'src/comments/entities/comment.entity';
import { Report } from 'src/reports/entities/report.entity';
import { PrismaService } from 'src/prisma.service';
@Injectable()
export class SeedService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly artworksService: ArtworksService,
    private readonly usersService: UsersService,
    private readonly collectionsService: CollectionsService,
    private readonly commentsService: CommentsService,
    private readonly reportsService: ReportsService,
  ) {}

  async populateDB(): Promise<boolean> {
    for (let i = 0; i < 10; i++) {
      await this.createSeedUser();
    }
    for (let i = 0; i < 10; i++) {
      await this.createSeedArtwork();
    }
    for (let i = 0; i < 10; i++) {
      await this.createSeedCollection();
    }
    for (let i = 0; i < 10; i++) {
      await this.createSeedCommentForUser();
    }
    for (let i = 0; i < 10; i++) {
      await this.createSeedCommentForArtwork();
    }
    for (let i = 0; i < 10; i++) {
      await this.createSeedReportForUser();
    }
    for (let i = 0; i < 10; i++) {
      await this.createSeedReportForArtwork();
    }
    return true;
  }

  async deleteDataFromDB(): Promise<boolean> {
    await this.prisma.artworkCollections.deleteMany();
    await this.prisma.artworks.deleteMany();
    await this.prisma.artworksAddresses.deleteMany();
    await this.prisma.artworksCollaborators.deleteMany();
    await this.prisma.artworksColors.deleteMany();
    await this.prisma.artworksMaterials.deleteMany();
    await this.prisma.artworksMovements.deleteMany();
    await this.prisma.artworksTags.deleteMany();
    await this.prisma.collections.deleteMany();
    await this.prisma.comments.deleteMany();
    await this.prisma.commentsLikes.deleteMany();
    await this.prisma.favoritesArtworks.deleteMany();
    await this.prisma.followers.deleteMany();
    await this.prisma.notifications.deleteMany();
    await this.prisma.reports.deleteMany();
    await this.prisma.users.deleteMany();
    await this.prisma.usersRatings.deleteMany();
    return true;
  }

  async getRandomUserId(): Promise<number> {
    const users = await this.usersService.findAll();
    return users[Math.floor(Math.random() * users.length)].id;
  }

  async getRandomArtworkId(): Promise<number> {
    const artworks = await this.artworksService.findAll();
    return artworks[Math.floor(Math.random() * artworks.length)].id;
  }

  async createSeedUser(): Promise<User> {
    const random = Math.floor(Math.random() * 100000);

    const user = await this.usersService.create({
      email: `email-${random}@gerardoarceo.com`,
      pass: `password`,
      firstName: `Nombre-${random}`,
      lastName: `Apellido-${random}`,
      typeId: UserTypes.ARTIST,
      address: `Direccion-${random}`,
      birthdate: new Date(),
      contact: `Contacto-${random}`,
      createdDate: new Date(),
      gender: `Masculino`,
      phone: Math.floor(Math.random() * 10000000000) + '',
      photoUrl:
        'https://newprofilepic2.photo-cdn.net//assets/images/article/profile.jpg',
      isDeleted: false,
    });

    this.usersService.followUnfollow(user.id, await this.getRandomUserId());

    return user;
  }

  async createSeedArtwork(): Promise<Artwork> {
    const random = Math.floor(Math.random() * 100000);

    const artwork = await this.artworksService.create(
      await this.getRandomUserId(),
      {
        title: `Obra-${random}`,
        description: `Descripcion-${random}`,
        createdDate: new Date(),
        imageUrl:
          'https://artsupplyguide.b-cdn.net/wp-content/uploads/2022/03/graffiti-in-shoreditch-london.jpg',
        minWidth: 5,
        maxWidth: 7,
        minHeight: 6,
        maxHeight: 8,
        minPrice: 5000,
        maxPrice: 10000,
        minWorkingHours: 50,
        maxWorkingHours: 60,
        isDeleted: false,
        collaborators: [await this.getRandomUserId()],
        tags: [`Tag-${random}`],
        addresses: [`Address-${random}`],
        colors: ['#CD5C5C', '#F08080', '#FA8072'],
        materials: ['Pintura metálica', 'Aerosol'],
        movements: ['Cubista', 'Realista'],
      },
    );

    this.artworksService.markUnmarkFavorite(
      await this.getRandomUserId(),
      artwork.id,
    );

    return artwork;
  }

  async createSeedCollection(): Promise<Collection> {
    const random = Math.floor(Math.random() * 100000);

    const collection = await this.collectionsService.create(
      await this.getRandomUserId(),
      {
        name: `Coleccion-${random}`,
      },
    );

    this.collectionsService.addRemoveArtworkFromCollection({
      collectionId: collection.id,
      artworkId: await this.getRandomArtworkId(),
    });

    return collection;
  }

  async createSeedCommentForUser(): Promise<Comment> {
    const random = Math.floor(Math.random() * 100000);

    const comment = await this.commentsService.create(
      await this.getRandomUserId(),
      {
        comment: `Comentario-${random}`,
        userId: await this.getRandomUserId(),
      },
    );

    return comment;
  }

  async createSeedCommentForArtwork(): Promise<Comment> {
    const random = Math.floor(Math.random() * 100000);

    const comment = await this.commentsService.create(
      await this.getRandomUserId(),
      {
        comment: `Comentario-${random}`,
        artworkId: await this.getRandomArtworkId(),
      },
    );

    return comment;
  }

  async createSeedReportForUser(): Promise<Report> {
    const random = Math.floor(Math.random() * 100000);

    const report = await this.reportsService.create(
      await this.getRandomUserId(),
      {
        description: `Reporte-${random}`,
        userId: await this.getRandomUserId(),
      },
    );

    return report;
  }

  async createSeedReportForArtwork(): Promise<Report> {
    const random = Math.floor(Math.random() * 100000);

    const report = await this.reportsService.create(
      await this.getRandomUserId(),
      {
        description: `Reporte-${random}`,
        artworkId: await this.getRandomArtworkId(),
      },
    );

    return report;
  }
}
