import { Artwork } from 'src/artworks/entities/artwork.entity';
import { PrismaService } from 'src/prisma.service';
import { CreateEventInput } from './dto/create-event.input';
import { Event } from './entities/event.entity';
export declare class EventsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(userId: number, createEventInput: CreateEventInput): Promise<Event>;
    getPopularArtworks(numberOfRecommendations?: number): Promise<Artwork[]>;
    getArtworkRecommendations(userId: number, numberOfRecommendations?: number): Promise<Artwork[]>;
}
