"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeedService = void 0;
const common_1 = require("@nestjs/common");
const artworks_service_1 = require("../artworks/artworks.service");
const users_service_1 = require("../users/users.service");
const user_types_enum_1 = require("../users/enums/user-types.enum");
const collections_service_1 = require("../collections/collections.service");
const reports_service_1 = require("../reports/reports.service");
const comments_service_1 = require("../comments/comments.service");
const prisma_service_1 = require("../prisma.service");
const redis_service_1 = require("../redis.service");
let SeedService = class SeedService {
    constructor(prisma, redisService, artworksService, usersService, collectionsService, commentsService, reportsService) {
        this.prisma = prisma;
        this.redisService = redisService;
        this.artworksService = artworksService;
        this.usersService = usersService;
        this.collectionsService = collectionsService;
        this.commentsService = commentsService;
        this.reportsService = reportsService;
    }
    async populateDB() {
        await this.createSeedUsers();
        await this.createSeedArtworks();
        for (let i = 0; i < 10; i++) {
            await this.createSeedCollection();
        }
        for (let i = 0; i < 10; i++) {
            await this.createSeedCommentForUser();
        }
        for (let i = 0; i < 10; i++) {
            await this.createSeedCommentForArtwork();
        }
        for (let i = 0; i < 10; i++) {
            await this.createSeedReportForUser();
        }
        for (let i = 0; i < 10; i++) {
            await this.createSeedReportForArtwork();
        }
        return true;
    }
    async resetDataFromDB() {
        await this.prisma.artworkCollections.deleteMany();
        await this.prisma.artworks.deleteMany();
        await this.prisma.artworksCollaborators.deleteMany();
        await this.prisma.artworksColors.deleteMany();
        await this.prisma.artworksMaterials.deleteMany();
        await this.prisma.artworksMovements.deleteMany();
        await this.prisma.artworksTags.deleteMany();
        await this.prisma.collections.deleteMany();
        await this.prisma.comments.deleteMany();
        await this.prisma.commentsLikes.deleteMany();
        await this.prisma.favoritesArtworks.deleteMany();
        await this.prisma.followers.deleteMany();
        await this.prisma.notifications.deleteMany();
        await this.prisma.reports.deleteMany();
        await this.prisma.users.deleteMany();
        await this.prisma.usersRatings.deleteMany();
        await this.redisService.deleteArtworkGeolocations();
        await this.populateDB();
        return true;
    }
    async getRandomUserId() {
        const users = await this.usersService.findAll();
        return users[Math.floor(Math.random() * users.length)].id;
    }
    async getRandomArtworkId() {
        const artworks = await this.artworksService.findAll();
        return artworks[Math.floor(Math.random() * artworks.length)].id;
    }
    async createSeedUser(createUserInput) {
        console.log(createUserInput);
        const user = await this.usersService.create(createUserInput);
        this.usersService.followUnfollow(user.id, await this.getRandomUserId());
    }
    async createSeedUsers() {
        await this.createSeedUser({
            email: `gerardo@arceo.com`,
            pass: `password`,
            firstName: `Gerardo`,
            lastName: `Arceo`,
            typeId: user_types_enum_1.UserTypes.ARTIST,
            address: `Avenida de los Maestros #49`,
            birthdate: new Date('1999-06-09'),
            contact: `Instagram: GerardoArceo`,
            createdDate: new Date(),
            gender: `Masculino`,
            phone: '5571777917',
            photoUrl: 'https://gerardoarceo.com/team/gerardoarceo/photo.jpg',
            isDeleted: false,
        });
        await this.createSeedUser({
            email: `angelmimoso@gmail.com`,
            pass: `password`,
            firstName: `José`,
            lastName: `Mimoso`,
            typeId: user_types_enum_1.UserTypes.ARTIST,
            address: `Avenida Mixcoac`,
            birthdate: new Date('1989-02-05'),
            contact: `Instagram: AngelMimoso`,
            createdDate: new Date(),
            gender: `Masculino`,
            phone: '5583957284',
            photoUrl: 'https://instagram.fmex5-1.fna.fbcdn.net/v/t51.2885-19/269859382_217845217165904_808443587197205825_n.jpg?stp=dst-jpg_s320x320&_nc_ht=instagram.fmex5-1.fna.fbcdn.net&_nc_cat=108&_nc_ohc=YZKA3RSRgLUAX9ES7ii&tn=yhMhqkVARt0UXrxL&edm=AOQ1c0wBAAAA&ccb=7-5&oh=00_AfDYsL6M9_RducGeEISKHNklZ8IRsUpBO_JPGUa9u3tQog&oe=63C5D9CA&_nc_sid=8fd12b',
            isDeleted: false,
        });
        await this.createSeedUser({
            email: `nbla.escom@gmail.com`,
            pass: `password`,
            firstName: `Nadia`,
            lastName: `López`,
            typeId: user_types_enum_1.UserTypes.ARTIST,
            address: `Avenida San Antonio #7`,
            birthdate: new Date('1999-03-04'),
            contact: `Instagram: nbla.escom`,
            createdDate: new Date(),
            gender: `Femenino`,
            phone: '5536259764',
            photoUrl: 'https://scontent.fmex5-1.fna.fbcdn.net/v/t39.30808-6/277310508_1041055959951297_8884364682328919510_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=n99IsCHc7UUAX8Pe9U-&_nc_ht=scontent.fmex5-1.fna&oh=00_AfBhdSylY5BPwpAPMBTb3G_OyHCJbvuohvZoTPz6wNTFnQ&oe=63C4512C',
            isDeleted: false,
        });
    }
    async createSeedArtwork(createArtworkInput) {
        const artwork = await this.artworksService.create(await this.getRandomUserId(), createArtworkInput);
        this.artworksService.markUnmarkFavorite(await this.getRandomUserId(), artwork.id);
        return artwork;
    }
    async createSeedArtworks() {
        await this.createSeedArtwork({
            title: `Cuidadores del café`,
            description: `Mural en Starbucks reserve bar`,
            createdDate: new Date(),
            imageUrl: 'https://instagram.fmex5-1.fna.fbcdn.net/v/t51.2885-15/66526292_2326520270777530_6540551794835468939_n.jpg?stp=dst-jpg_e35&_nc_ht=instagram.fmex5-1.fna.fbcdn.net&_nc_cat=110&_nc_ohc=bWCIBg4VsRsAX_hCD7k&edm=AGenrX8BAAAA&ccb=7-5&oh=00_AfCGI_-O2skVcP4ztoF5fm3UXi4oW0pj4NIhQHU1K31PhQ&oe=63C524B8&_nc_sid=5eceaa',
            minWidth: 5,
            maxWidth: 7,
            minHeight: 6,
            maxHeight: 8,
            minPrice: 5000,
            maxPrice: 10000,
            minWorkingHours: 50,
            maxWorkingHours: 60,
            isDeleted: false,
            collaborators: [await this.getRandomUserId()],
            tags: [`México`, `Prehispánico`, `Naturaleza`],
            address: 'Anillo Perif. 4690-Local 860, Insurgentes Cuicuilco, Coyoacán, 04530 Ciudad de México, CDMX',
            materials: ['Aerosol'],
            movements: ['Surreal'],
        });
    }
    async createSeedCollection() {
        const random = Math.floor(Math.random() * 100000);
        const collection = await this.collectionsService.create(await this.getRandomUserId(), {
            name: `Coleccion-${random}`,
        });
        this.collectionsService.addRemoveArtworkFromCollection({
            collectionId: collection.id,
            artworkId: await this.getRandomArtworkId(),
        });
        return collection;
    }
    async createSeedCommentForUser() {
        const random = Math.floor(Math.random() * 100000);
        const comment = await this.commentsService.create(await this.getRandomUserId(), {
            comment: `Comentario-${random}`,
            userId: await this.getRandomUserId(),
        });
        return comment;
    }
    async createSeedCommentForArtwork() {
        const random = Math.floor(Math.random() * 100000);
        const comment = await this.commentsService.create(await this.getRandomUserId(), {
            comment: `Comentario-${random}`,
            artworkId: await this.getRandomArtworkId(),
        });
        return comment;
    }
    async createSeedReportForUser() {
        const random = Math.floor(Math.random() * 100000);
        const report = await this.reportsService.create(await this.getRandomUserId(), {
            description: `Reporte-${random}`,
            userId: await this.getRandomUserId(),
        });
        return report;
    }
    async createSeedReportForArtwork() {
        const random = Math.floor(Math.random() * 100000);
        const report = await this.reportsService.create(await this.getRandomUserId(), {
            description: `Reporte-${random}`,
            artworkId: await this.getRandomArtworkId(),
        });
        return report;
    }
};
SeedService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        redis_service_1.RedisService,
        artworks_service_1.ArtworksService,
        users_service_1.UsersService,
        collections_service_1.CollectionsService,
        comments_service_1.CommentsService,
        reports_service_1.ReportsService])
], SeedService);
exports.SeedService = SeedService;
//# sourceMappingURL=seed.service.js.map