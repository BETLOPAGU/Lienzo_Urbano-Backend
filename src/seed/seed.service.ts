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
import { RedisService } from '../redis.service';
import { CreateArtworkInput } from 'src/artworks/dto/create-artwork.input';
import { CreateUserInput } from 'src/users/dto/create-user.input';
@Injectable()
export class SeedService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly redisService: RedisService,
    private readonly artworksService: ArtworksService,
    private readonly usersService: UsersService,
    private readonly collectionsService: CollectionsService,
    private readonly commentsService: CommentsService,
    private readonly reportsService: ReportsService,
  ) {}

  async populateDB(): Promise<boolean> {
    await this.createSeedUsers();
    await this.createSeedArtworks();

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

  async resetDataFromDB(): Promise<boolean> {
    await this.prisma.artworkCollections.deleteMany();
    await this.prisma.artworks.deleteMany();
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

    await this.redisService.deleteArtworkGeolocations();

    await this.populateDB();

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

  async createSeedUser(createUserInput: CreateUserInput) {
    console.log(createUserInput);
    const user = await this.usersService.create(createUserInput);
    this.usersService.followUnfollow(user.id, await this.getRandomUserId());
  }

  async createSeedUsers() {
    await this.createSeedUser({
      email: `gerardo@arceo.com`,
      pass: `password`,
      firstName: `Gerardo`,
      lastName: `Arceo`,
      typeId: UserTypes.ARTIST,
      address: `Avenida de los Maestros #49`,
      birthdate: new Date('1999-06-09'),
      contact: `Instagram: GerardoArceo`,
      createdDate: new Date(),
      gender: `Masculino`,
      phone: '5571777917',
      photoUrl: 'https://gerardoarceo.com/team/gerardoarceo/photo.jpg',
      isDeleted: false,
    });
    await this.createSeedUser({
      email: `angelmimoso@gmail.com`,
      pass: `password`,
      firstName: `José`,
      lastName: `Mimoso`,
      typeId: UserTypes.ARTIST,
      address: `Avenida Mixcoac`,
      birthdate: new Date('1989-02-05'),
      contact: `Instagram: AngelMimoso`,
      createdDate: new Date(),
      gender: `Masculino`,
      phone: '5583957284',
      photoUrl:
        'https://instagram.fmex5-1.fna.fbcdn.net/v/t51.2885-19/269859382_217845217165904_808443587197205825_n.jpg?stp=dst-jpg_s320x320&_nc_ht=instagram.fmex5-1.fna.fbcdn.net&_nc_cat=108&_nc_ohc=YZKA3RSRgLUAX9ES7ii&tn=yhMhqkVARt0UXrxL&edm=AOQ1c0wBAAAA&ccb=7-5&oh=00_AfDYsL6M9_RducGeEISKHNklZ8IRsUpBO_JPGUa9u3tQog&oe=63C5D9CA&_nc_sid=8fd12b',
      isDeleted: false,
    });
    await this.createSeedUser({
      email: `nbla.escom@gmail.com`,
      pass: `password`,
      firstName: `Nadia`,
      lastName: `López`,
      typeId: UserTypes.ARTIST,
      address: `Avenida San Antonio #7`,
      birthdate: new Date('1999-03-04'),
      contact: `Instagram: nbla.escom`,
      createdDate: new Date(),
      gender: `Femenino`,
      phone: '5536259764',
      photoUrl:
        'https://scontent.fmex5-1.fna.fbcdn.net/v/t39.30808-6/277310508_1041055959951297_8884364682328919510_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=n99IsCHc7UUAX8Pe9U-&_nc_ht=scontent.fmex5-1.fna&oh=00_AfBhdSylY5BPwpAPMBTb3G_OyHCJbvuohvZoTPz6wNTFnQ&oe=63C4512C',
      isDeleted: false,
    });
  }

  async createSeedArtwork(
    createArtworkInput: CreateArtworkInput,
  ): Promise<Artwork> {
    const artwork = await this.artworksService.create(
      await this.getRandomUserId(),
      createArtworkInput,
    );

    this.artworksService.markUnmarkFavorite(
      await this.getRandomUserId(),
      artwork.id,
    );

    return artwork;
  }

  async createSeedArtworks() {
    await this.createSeedArtwork({
      title: `Cuidadores del café`,
      description: `Mural en Starbucks reserve bar`,
      createdDate: new Date(),
      imageUrl:
        'https://instagram.fmex5-1.fna.fbcdn.net/v/t51.2885-15/66526292_2326520270777530_6540551794835468939_n.jpg?stp=dst-jpg_e35&_nc_ht=instagram.fmex5-1.fna.fbcdn.net&_nc_cat=110&_nc_ohc=bWCIBg4VsRsAX_hCD7k&edm=AGenrX8BAAAA&ccb=7-5&oh=00_AfCGI_-O2skVcP4ztoF5fm3UXi4oW0pj4NIhQHU1K31PhQ&oe=63C524B8&_nc_sid=5eceaa',
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
      tags: [`México`, `Prehispánico`, `Naturaleza`],
      address:
        'Anillo Perif. 4690-Local 860, Insurgentes Cuicuilco, Coyoacán, 04530 Ciudad de México, CDMX',
      materials: ['Aerosol'],
      movements: ['Surreal'],
    });
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
