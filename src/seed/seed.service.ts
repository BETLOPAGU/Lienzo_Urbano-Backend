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
    const randomUserId = await this.getRandomUserId();
    await this.usersService.followUnfollow(user.id, randomUserId);
  }

  async createSeedUsers() {
    await this.createSeedUser({
      email: `gerardo@arceo.com`,
      pass: `password`,
      firstName: `Gerardo`,
      lastName: `Arceo`,
      typeId: UserTypes.ADMIN,
      address: `Avenida de los Maestros #49`,
      latitude: 19.304497061146204,
      longitude: -99.19012121987434,
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
      latitude: 19.304497061146204,
      longitude: -99.19012121987434,
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
      typeId: UserTypes.GUEST,
      address: `Avenida San Antonio #7`,
      latitude: 19.304497061146204,
      longitude: -99.19012121987434,
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

    await this.redisService.storeArtworkGeolocation({
      artworkId: artwork.id,
      latitude: artwork.latitude,
      longitude: artwork.longitude,
    });

    await this.artworksService.markUnmarkFavorite(
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
      imageUrl: 'https://piase.s3.us-east-2.amazonaws.com/lu-art-1.jpeg',
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
      latitude: 19.304497061146204,
      longitude: -99.19012121987434,
      materials: ['Aerosol'],
      movements: ['Surreal'],
    });
    await this.createSeedArtwork({
      title: `Demon-cat`,
      description: `Gato demonio para el aniversario de @rush_spraypaint`,
      createdDate: new Date(),
      imageUrl: 'https://piase.s3.us-east-2.amazonaws.com/lu-art-2.jpeg',
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
      tags: [`Gato`, `Demonio`, `Lettering`, `@rosek_91`],
      address:
        'Primavera 106, Ángel Zimbrón, Miguel Hidalgo, 02099 Ciudad de México, CDMX',
      latitude: 19.46451029895169,
      longitude: -99.19047833336538,
      materials: ['Aerosol'],
      movements: ['Abstracto'],
    });
    await this.createSeedArtwork({
      title: `Magic-book`,
      description: `Pinta para @streetartmujam`,
      createdDate: new Date(),
      imageUrl: 'https://piase.s3.us-east-2.amazonaws.com/lu-art-3.jpeg',
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
      tags: [`Sabiduría`, `Libro`, `Ojo`, `@enocdas`],
      address:
        'Calle Dr Olvera 15, Doctores, Cuauhtémoc, 06720 Ciudad de México, CDMX',
      latitude: 19.41595956031519,
      longitude: -99.1445338576703,
      materials: ['Aerosol'],
      movements: ['Surreal'],
    });
    await this.createSeedArtwork({
      title: `Gumball rapeando`,
      description: `Para el #yoshfest`,
      createdDate: new Date(),
      imageUrl: 'https://piase.s3.us-east-2.amazonaws.com/lu-art-4.jpeg',
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
      tags: [`Gumball`, `Rap`, `Lettering`, `@chikledavid`],
      address:
        'Prol. Cadmio 8, San Juan Cerro, Iztapalapa, 09858 Ciudad de México, CDMX',
      latitude: 19.343869775786697,
      longitude: -99.08065164870868,
      materials: ['Aerosol'],
      movements: ['Pop'],
    });
    await this.createSeedArtwork({
      title: `Mujer y sus demonios`,
      description: `Para @juntashacemosmas.fest`,
      createdDate: new Date(),
      imageUrl: 'https://piase.s3.us-east-2.amazonaws.com/lu-art-5.jpeg',
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
      tags: [
        `Feminismo`,
        `Mujer`,
        `Lettering`,
        `@pecass27`,
        `@juntashacemosmas.fest`,
      ],
      address:
        'Calz México-Tacuba 86, Anáhuac I Secc., Anáhuac I Secc, Miguel Hidalgo, 11330 Ciudad de México, CDMX',
      latitude: 19.44563684375529,
      longitude: -99.16884447439388,
      materials: ['Aerosol'],
      movements: ['Realista'],
    });
    await this.createSeedArtwork({
      title: `Rana psicodelica`,
      description: `Rana colorida`,
      createdDate: new Date(),
      imageUrl: 'https://piase.s3.us-east-2.amazonaws.com/lu-art-6.jpeg',
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
      tags: [`Rana`, `Naturaleza`, `Psicodelico`, `@revost13`],
      address:
        'Rtno. 20 Av. del Táller 3, Jardín Balbuena, Venustiano Carranza, 15900 Ciudad de México, CDMX',
      latitude: 19.413510170230985,
      longitude: -99.10875537754224,
      materials: ['Aerosol'],
      movements: ['Surreal'],
    });
    await this.createSeedArtwork({
      title: `Camino a Mictlán`,
      description: `Perro guia hacia el Mictlán`,
      createdDate: new Date(),
      imageUrl: 'https://piase.s3.us-east-2.amazonaws.com/lu-art-7.jpeg',
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
      tags: [`Perro`, `Mictlán`, `Muerte`, `@wems_mexicanart`],
      address:
        'Primavera 106, Ángel Zimbrón, Miguel Hidalgo, 02099 Ciudad de México, CDMX',
      latitude: 19.46451029895169,
      longitude: -99.19047833336538,
      materials: ['Aerosol'],
      movements: ['Surreal'],
    });
    await this.createSeedArtwork({
      title: `Joker`,
      description: `Joker realista`,
      createdDate: new Date(),
      imageUrl: 'https://piase.s3.us-east-2.amazonaws.com/lu-art-8.jpeg',
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
      tags: [`Sociedad`, `Batman`, `Joker`, `@meme.stp`],
      address:
        'Cda. Del Lago Bolsena, Lago Sur, Miguel Hidalgo, 11460 Ciudad de México, CDMX',
      latitude: 19.44567744912145,
      longitude: -99.18486281802514,
      materials: ['Aerosol'],
      movements: ['Realista', 'Pop'],
    });
    await this.createSeedArtwork({
      title: `La otra casa`,
      description: `Para @ilustramesta`,
      createdDate: new Date(),
      imageUrl: 'https://piase.s3.us-east-2.amazonaws.com/lu-art-9.jpeg',
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
      tags: [`Cara`, `Cancha`, `@mocre_dis`],
      address:
        'Galeana 26, Tepeyac Insurgentes, Gustavo A. Madero, 07020 Ciudad de México, CDMX',
      latitude: 19.488074009480915,
      longitude: -99.11845927569449,
      materials: ['Aerosol'],
      movements: ['Abstracto'],
    });
    await this.createSeedArtwork({
      title: `Cara colorida`,
      description: `Para @mos_mex del 2018`,
      createdDate: new Date(),
      imageUrl: 'https://piase.s3.us-east-2.amazonaws.com/lu-art-10.jpeg',
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
      tags: [`Cara`, `Musica`, `@smitheone`],
      address:
        'C. 2 229, Leyes de Reforma 1ra Secc, Iztapalapa, 09310 Ciudad de México, CDMX',
      latitude: 19.356624060868374,
      longitude: -99.07055523336774,
      materials: ['Aerosol'],
      movements: ['Abstracto', 'Pop'],
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
