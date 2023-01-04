import { EventsService } from './events.service';
import { Event } from './entities/event.entity';
import { CreateEventInput } from './dto/create-event.input';
import { Artwork } from '../artworks/entities/artwork.entity';
import { JwtPayload } from 'src/auth/interfaces/jwt-payload.interface';
export declare class EventsResolver {
    private readonly eventsService;
    constructor(eventsService: EventsService);
    createEvent(jwt: JwtPayload, createEventInput: CreateEventInput): Promise<Event>;
    getArtworkRecommendations(jwt: JwtPayload, numberOfRecommendations?: number): Promise<Artwork[]>;
}
