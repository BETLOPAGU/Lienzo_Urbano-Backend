import { PrismaService } from 'src/prisma.service';
import { CreateUserInput } from './dto/create-user.input';
import { FindUsersInput } from './dto/find-users.input';
import { UpdateUserInput } from './dto/update-user.input';
import { Follower } from './entities/follower.entity';
import { User } from './entities/user.entity';
import { UserRating } from './entities/userRating.entity';
import { Collection } from '../collections/entities/collection.entity';
import { S3Service } from 'src/s3.service';
export declare class UsersService {
    private readonly prisma;
    private readonly s3Service;
    constructor(prisma: PrismaService, s3Service: S3Service);
    create(createUserInput: CreateUserInput): Promise<User>;
    findAll(findUsersInput?: FindUsersInput): Promise<User[]>;
    findOne(id: number): Promise<User>;
    update(id: number, updateUserInput: UpdateUserInput): Promise<User>;
    remove(id: number): Promise<User>;
    rate(qualifierId: number, userId: number, rating: number): Promise<UserRating>;
    rating(user: User): Promise<number>;
    followUnfollow(followerId: number, userId: number): Promise<Follower>;
    followers(user: User): Promise<Follower[]>;
    followersCount(user: User): Promise<number>;
    collections(user: User): Promise<Collection[]>;
}
