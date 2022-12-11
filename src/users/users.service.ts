import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateUserInput } from './dto/create-user.input';
import { FindUsersInput } from './dto/find-users.input';
import { UpdateUserInput } from './dto/update-user.input';
import { Follower } from './entities/follower.entity';
import { User } from './entities/user.entity';
import { UserRating } from './entities/userRating.entity';
import * as bcrypt from 'bcrypt';
import { Collection } from '../collections/entities/collection.entity';
import { NotificationTypes } from './enums/notification-types.enum';
import { S3Service } from 'src/s3.service';
import { extractImageColors } from 'src/utils/extractImageColors';

@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly s3Service: S3Service,
  ) {}

  async create(createUserInput: CreateUserInput): Promise<User> {
    try {
      const photo = createUserInput.photo;
      delete createUserInput.photo;

      createUserInput.createdDate = new Date();
      createUserInput.pass = bcrypt.hashSync(createUserInput.pass, 10);
      const user = await this.prisma.users.create({
        data: createUserInput,
      });

      if (user && photo) {
        const photoUrl = await this.s3Service.uploadPhoto(
          photo,
          `lienzo_urbano_user_${user.id}`,
        );
        if (photoUrl) {
          await this.prisma.users.update({
            where: { id: user.id },
            data: {
              photoUrl,
            },
          });
          user.photoUrl = photoUrl;

          const x = await extractImageColors(
            'https://i.pinimg.com/originals/a0/57/5b/a0575b7cf9a3bf8b53e474b4f944b31a.jpg',
          );
        }
      }

      return user;
    } catch (error) {
      if (error.code === 'P2002') {
        const target = error.meta.target;
        throw new BadRequestException(`Duplicated value in ${target}`);
      }
      throw new BadRequestException();
    }
  }

  async findAll(findUsersInput?: FindUsersInput): Promise<User[]> {
    if (!findUsersInput) findUsersInput = { isDeleted: false };
    return this.prisma.users.findMany({
      where: findUsersInput,
    });
  }

  async findOne(id: number): Promise<User> {
    return this.prisma.users.findUnique({ where: { id } });
  }

  async update(id: number, updateUserInput: UpdateUserInput): Promise<User> {
    return this.prisma.users.update({
      data: updateUserInput,
      where: { id },
    });
  }

  async remove(id: number): Promise<User> {
    return this.prisma.users.delete({ where: { id } });
  }

  async rate(
    qualifierId: number,
    userId: number,
    rating: number,
  ): Promise<UserRating> {
    const ratingRecord = await this.prisma.usersRatings.findFirst({
      where: { qualifierId, userId },
    });

    if (ratingRecord && ratingRecord.id) {
      return this.prisma.usersRatings.update({
        data: { rating },
        where: {
          id: ratingRecord.id,
        },
      });
    } else {
      const qualifier = await this.prisma.users.findUnique({
        where: { id: qualifierId },
      });
      this.prisma.notifications.create({
        data: {
          userId,
          typeId: NotificationTypes.SUCCESS,
          title: 'Alguien ha puntuado tu perfil',
          content: `${qualifier.firstName} ${qualifier.lastName} te ha puesto una calificación de ${rating}`,
          createdDate: new Date(),
        },
      });
      return this.prisma.usersRatings.create({
        data: {
          userId,
          qualifierId,
          rating,
        },
      });
    }
  }

  async rating(user: User): Promise<number> {
    const ratings = await this.prisma.usersRatings.findMany({
      where: { userId: user.id },
    });
    if (ratings?.length === 0) return 0;
    const arr = ratings.map((r) => r.rating);
    const avg = arr.reduce((a, b) => a + b, 0) / arr.length;
    return avg;
  }

  async followUnfollow(followerId: number, userId: number): Promise<Follower> {
    const followRecord = await this.prisma.followers.findFirst({
      where: { followerId, userId },
    });

    if (followRecord) {
      return this.prisma.followers.delete({
        where: { id: followRecord.id },
      });
    } else {
      const follower = await this.prisma.users.findUnique({
        where: { id: followerId },
      });
      this.prisma.notifications.create({
        data: {
          userId,
          typeId: NotificationTypes.SUCCESS,
          title: 'Alguien te ha empezado a seguir',
          content: `${follower.firstName} ${follower.lastName} ahora es tu seguidor`,
          createdDate: new Date(),
        },
      });
      return this.prisma.followers.create({
        data: {
          createdDate: new Date(),
          followerId,
          userId,
        },
      });
    }
  }

  async followers(user: User): Promise<Follower[]> {
    const result = await this.prisma.followers.findMany({
      where: { userId: user.id },
      include: { users: true },
    });
    const followers = result.map((f) => ({ ...f, follower: f.users }));
    return followers;
  }

  async followersCount(user: User): Promise<number> {
    return this.prisma.followers.count({
      where: { userId: user.id },
    });
  }

  async collections(user: User): Promise<Collection[]> {
    return this.prisma.collections.findMany({
      where: { userId: user.id },
    });
  }
}
