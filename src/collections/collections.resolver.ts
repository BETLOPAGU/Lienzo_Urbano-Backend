import {
  Resolver,
  Mutation,
  Args,
  Int,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { CollectionsService } from './collections.service';
import { Collection } from './entities/collection.entity';
import { CreateCollectionInput } from './dto/create-collection.input';
import { UpdateCollectionInput } from './dto/update-collection.input';
import { Jwt } from 'src/auth/decorators/jwt.decorator';
import { JwtPayload } from 'src/auth/interfaces/jwt-payload.interface';
import { ArtworkCollection } from './entities/artworkCollection.entity';
import { Artwork } from '../artworks/entities/artwork.entity';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Resolver(() => Collection)
export class CollectionsResolver {
  constructor(private readonly collectionsService: CollectionsService) {}

  @Mutation(() => Collection)
  @UseGuards(JwtAuthGuard)
  createCollection(
    @Jwt() jwt: JwtPayload,
    @Args('createCollectionInput') createCollectionInput: CreateCollectionInput,
  ) {
    return this.collectionsService.create(jwt.userId, createCollectionInput);
  }

  @Mutation(() => Collection)
  updateCollection(
    @Args('updateCollectionInput') updateCollectionInput: UpdateCollectionInput,
  ) {
    return this.collectionsService.update(
      updateCollectionInput.id,
      updateCollectionInput,
    );
  }

  @Mutation(() => Collection)
  removeCollection(@Args('id', { type: () => Int }) id: number) {
    return this.collectionsService.remove(id);
  }

  @Mutation(() => ArtworkCollection)
  addRemoveArtworkFromCollection(
    @Args('collectionId', { type: () => Int }) collectionId: number,
    @Args('artworkId', { type: () => Int }) artworkId: number,
  ) {
    return this.collectionsService.addRemoveArtworkFromCollection({
      collectionId,
      artworkId,
    });
  }

  @ResolveField(() => [Artwork])
  artworks(@Parent() collection: Collection) {
    return this.collectionsService.artworks(collection);
  }
}
