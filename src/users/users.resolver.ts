import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ResolveField,
  Parent,
  Float,
} from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { FindUsersInput } from './dto/find-users.input';
import { UserRating } from './entities/userRating.entity';
import { Follower } from './entities/follower.entity';
import { JwtPayload } from 'src/auth/interfaces/jwt-payload.interface';
import { Jwt } from 'src/auth/decorators/jwt.decorator';
import { Collection } from 'src/collections/entities/collection.entity';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => User)
  createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.usersService.create(createUserInput);
  }

  @Query(() => [User], { name: 'users' })
  findAll(
    @Args('filters', { nullable: true })
    findUsersInput?: FindUsersInput,
  ) {
    return this.usersService.findAll(findUsersInput);
  }

  @Query(() => User, { name: 'user', nullable: true })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.usersService.findOne(id);
  }

  @Mutation(() => User)
  updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    return this.usersService.update(updateUserInput.id, updateUserInput);
  }

  @Mutation(() => User)
  removeUser(@Args('id', { type: () => Int }) id: number) {
    return this.usersService.remove(id);
  }

  @Mutation(() => UserRating)
  @UseGuards(JwtAuthGuard)
  rateUser(
    @Jwt() jwt: JwtPayload,
    @Args('id', { type: () => Int }) id: number,
    @Args('rating', { type: () => Int }) rating: number,
  ) {
    return this.usersService.rate(jwt.userId, id, rating);
  }

  @ResolveField(() => Float)
  rating(@Parent() user: User) {
    return this.usersService.rating(user);
  }

  @Mutation(() => Follower)
  @UseGuards(JwtAuthGuard)
  followUnfollowUser(
    @Jwt() jwt: JwtPayload,
    @Args('id', { type: () => Int }) id: number,
  ) {
    return this.usersService.followUnfollow(jwt.userId, id);
  }

  @ResolveField(() => [Follower])
  followers(@Parent() user: User) {
    return this.usersService.followers(user);
  }

  @ResolveField(() => Int)
  followersCount(@Parent() user: User) {
    return this.usersService.followersCount(user);
  }

  @Query(() => [User])
  @UseGuards(JwtAuthGuard)
  followedArtists(@Jwt() jwt: JwtPayload) {
    return this.usersService.followedArtists(jwt.userId);
  }

  @ResolveField(() => [Collection])
  collections(@Parent() user: User) {
    return this.usersService.collections(user);
  }
}
