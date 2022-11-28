import { Injectable } from '@nestjs/common';
import { ArtworksService } from '../artworks/artworks.service';
import { UsersService } from '../users/users.service';
import { User } from 'src/users/entities/user.entity';
import { Artwork } from '../artworks/entities/artwork.entity';
import { UserTypes } from 'src/users/enums/user-types.enum';

@Injectable()
export class SeedService {
  constructor(
    private readonly artworksService: ArtworksService,
    private readonly usersService: UsersService,
  ) {}

  async populateDB(): Promise<boolean> {
    for (let i = 0; i < 10; i++) {
      await this.createSeedUser();
      await this.createSeedArtwork();
    }
    return true;
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

    return user;
  }

  async createSeedArtwork(): Promise<Artwork> {
    const users = await this.usersService.findAll();

    const random = Math.floor(Math.random() * 100000);
    const random1 = Math.floor(Math.random() * users.length);
    const random2 = Math.floor(Math.random() * users.length) + 1;

    const artwork = this.artworksService.create(users[random1].id, {
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
      collaborators: [random2],
      tags: [`Tag-${random}`],
      addresses: [`Address-${random}`],
    });

    return artwork;
  }
}
