import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { EventsService } from './events.service';
import { Event } from './entities/event.entity';
import { CreateEventInput } from './dto/create-event.input';
import { Artwork } from '../artworks/entities/artwork.entity';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Jwt } from 'src/auth/decorators/jwt.decorator';
import { JwtPayload } from 'src/auth/interfaces/jwt-payload.interface';

@Resolver(() => Event)
export class EventsResolver {
  constructor(private readonly eventsService: EventsService) {}

  @Mutation(() => Event)
  @UseGuards(JwtAuthGuard)
  createEvent(
    @Jwt() jwt: JwtPayload,
    @Args('createEventInput') createEventInput: CreateEventInput,
  ) {
    return this.eventsService.create(jwt.userId, createEventInput);
  }

  @Query(() => [Artwork])
  @UseGuards(JwtAuthGuard)
  getArtworkRecommendations(
    @Jwt() jwt: JwtPayload,
    @Args('numberOfRecommendations', { type: () => Int, nullable: true })
    numberOfRecommendations?: number,
  ) {
    return this.eventsService.getArtworkRecommendations(
      jwt.userId,
      numberOfRecommendations,
    );
  }
}
