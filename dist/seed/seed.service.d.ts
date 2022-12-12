import { ArtworksService } from '../artworks/artworks.service';
import { UsersService } from '../users/users.service';
import { User } from 'src/users/entities/user.entity';
import { Artwork } from '../artworks/entities/artwork.entity';
import { CollectionsService } from '../collections/collections.service';
import { ReportsService } from '../reports/reports.service';
import { CommentsService } from '../comments/comments.service';
import { Collection } from '../collections/entities/collection.entity';
import { Comment } from 'src/comments/entities/comment.entity';
import { Report } from 'src/reports/entities/report.entity';
import { PrismaService } from 'src/prisma.service';
export declare class SeedService {
    private readonly prisma;
    private readonly artworksService;
    private readonly usersService;
    private readonly collectionsService;
    private readonly commentsService;
    private readonly reportsService;
    constructor(prisma: PrismaService, artworksService: ArtworksService, usersService: UsersService, collectionsService: CollectionsService, commentsService: CommentsService, reportsService: ReportsService);
    populateDB(): Promise<boolean>;
    deleteDataFromDB(): Promise<boolean>;
    getRandomUserId(): Promise<number>;
    getRandomArtworkId(): Promise<number>;
    createSeedUser(): Promise<User>;
    createSeedArtwork(): Promise<Artwork>;
    createSeedCollection(): Promise<Collection>;
    createSeedCommentForUser(): Promise<Comment>;
    createSeedCommentForArtwork(): Promise<Comment>;
    createSeedReportForUser(): Promise<Report>;
    createSeedReportForArtwork(): Promise<Report>;
}