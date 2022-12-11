import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { ArtworksService } from './artworks.service';
import { Artwork } from './entities/artwork.entity';
import { CreateArtworkInput } from './dto/create-artwork.input';
import { UpdateArtworkInput } from './dto/update-artwork.input';
import { FindArtworksInput } from './dto/find-artworks.input';
import { FavoriteArtwork } from './entities/favoriteArtwork.entity';
import { ArtworkCollaborator } from './entities/artworkCollaborator.entity';
import { ArtworkTag } from './entities/artworkTag.entity';
import { ArtworkAddress } from './entities/artworkAddress.entity';
import { ArtworkColor } from './entities/artworkColor.entity';
import { ArtworkMovement } from './entities/artworkMovement.entity';
import { ArtworkMaterial } from './entities/artworkMaterial.entity';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';
import { Jwt } from 'src/auth/decorators/jwt.decorator';
import { UserTypes } from 'src/users/enums/user-types.enum';
import { JwtPayload } from 'src/auth/interfaces/jwt-payload.interface';
import { User } from '../users/entities/user.entity';

@Resolver(() => Artwork)
export class ArtworksResolver {
  constructor(private readonly artworksService: ArtworksService) {}

  @Mutation(() => Artwork)
  @UseGuards(JwtAuthGuard)
  createArtwork(
    @Jwt([UserTypes.ARTIST, UserTypes.ADMIN]) jwt: JwtPayload,
    @Args('createArtworkInput') createArtworkInput: CreateArtworkInput,
  ) {
    return this.artworksService.create(jwt.userId, createArtworkInput);
  }

  @Query(() => [Artwork], { name: 'artworks' })
  findAll(
    @Args('filters', { nullable: true })
    findArtworksInput?: FindArtworksInput,
  ) {
    return this.artworksService.findAll(findArtworksInput);
  }

  @Query(() => Artwork, { name: 'artwork', nullable: true })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.artworksService.findOne(id);
  }

  @Mutation(() => Artwork)
  updateArtwork(
    @Args('updateArtworkInput') updateArtworkInput: UpdateArtworkInput,
  ) {
    return this.artworksService.update(
      updateArtworkInput.id,
      updateArtworkInput,
    );
  }

  @Mutation(() => Artwork)
  removeArtwork(@Args('id', { type: () => Int }) id: number) {
    return this.artworksService.remove(id);
  }

  @Mutation(() => FavoriteArtwork)
  markUnmarkFavoriteArtwork(
    @Jwt() jwt: JwtPayload,
    @Args('id', { type: () => Int }) id: number,
  ) {
    return this.artworksService.markUnmarkFavorite(jwt.userId, id);
  }

  @ResolveField(() => Int)
  favoriteCount(@Parent() artwork: Artwork) {
    return this.artworksService.favoriteCount(artwork);
  }

  @ResolveField(() => [ArtworkCollaborator])
  collaborators(@Parent() artwork: Artwork) {
    return this.artworksService.collaborators(artwork);
  }

  @ResolveField(() => [ArtworkTag])
  tags(@Parent() artwork: Artwork) {
    return this.artworksService.tags(artwork);
  }

  @ResolveField(() => [ArtworkAddress])
  addresses(@Parent() artwork: Artwork) {
    return this.artworksService.addresses(artwork);
  }

  @ResolveField(() => [ArtworkColor])
  colors(@Parent() artwork: Artwork) {
    return this.artworksService.colors(artwork);
  }

  @ResolveField(() => [ArtworkMovement])
  movements(@Parent() artwork: Artwork) {
    return this.artworksService.movements(artwork);
  }

  @ResolveField(() => [ArtworkMaterial])
  materials(@Parent() artwork: Artwork) {
    return this.artworksService.materials(artwork);
  }

  @ResolveField(() => User)
  artist(@Parent() artwork: Artwork) {
    return this.artworksService.artist(artwork);
  }
}
