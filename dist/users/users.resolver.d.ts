import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { FindUsersInput } from './dto/find-users.input';
import { UserRating } from './entities/userRating.entity';
import { Follower } from './entities/follower.entity';
import { JwtPayload } from 'src/auth/interfaces/jwt-payload.interface';
import { Collection } from 'src/collections/entities/collection.entity';
export declare class UsersResolver {
    private readonly usersService;
    constructor(usersService: UsersService);
    createUser(createUserInput: CreateUserInput): Promise<User>;
    findAll(findUsersInput?: FindUsersInput): Promise<User[]>;
    findOne(id: number): Promise<User>;
    updateUser(updateUserInput: UpdateUserInput): Promise<User>;
    removeUser(id: number): Promise<User>;
    rateUser(jwt: JwtPayload, id: number, rating: number): Promise<UserRating>;
    rating(user: User): Promise<number>;
    followUnfollowUser(jwt: JwtPayload, id: number): Promise<Follower>;
    followers(user: User): Promise<Follower[]>;
    followersCount(user: User): Promise<number>;
    collections(user: User): Promise<Collection[]>;
}
