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
let SeedService = class SeedService {
    constructor(prisma, artworksService, usersService, collectionsService, commentsService, reportsService) {
        this.prisma = prisma;
        this.artworksService = artworksService;
        this.usersService = usersService;
        this.collectionsService = collectionsService;
        this.commentsService = commentsService;
        this.reportsService = reportsService;
    }
    async populateDB() {
        for (let i = 0; i < 10; i++) {
            await this.createSeedUser();
        }
        for (let i = 0; i < 10; i++) {
            await this.createSeedArtwork();
        }
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
    async deleteDataFromDB() {
        await this.prisma.artworkCollections.deleteMany();
        await this.prisma.artworks.deleteMany();
        await this.prisma.artworksAddresses.deleteMany();
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
    async createSeedUser() {
        const random = Math.floor(Math.random() * 100000);
        const user = await this.usersService.create({
            email: `email-${random}@gerardoarceo.com`,
            pass: `password`,
            firstName: `Nombre-${random}`,
            lastName: `Apellido-${random}`,
            typeId: user_types_enum_1.UserTypes.ARTIST,
            address: `Direccion-${random}`,
            birthdate: new Date(),
            contact: `Contacto-${random}`,
            createdDate: new Date(),
            gender: `Masculino`,
            phone: Math.floor(Math.random() * 10000000000) + '',
            photoUrl: 'https://newprofilepic2.photo-cdn.net//assets/images/article/profile.jpg',
            isDeleted: false,
        });
        this.usersService.followUnfollow(user.id, await this.getRandomUserId());
        return user;
    }
    async createSeedArtwork() {
        const random = Math.floor(Math.random() * 100000);
        const artwork = await this.artworksService.create(await this.getRandomUserId(), {
            title: `Artwork-${random}`,
            description: `Description-${random}`,
            createdDate: new Date(),
            imageUrl: 'https://i.pinimg.com/originals/a0/57/5b/a0575b7cf9a3bf8b53e474b4f944b31a.jpg',
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
            tags: [`Tag-${random}`],
            addresses: [`Address-${random}`],
            materials: ['Pintura metálica', 'Aerosol'],
            movements: ['Cubista', 'Realista'],
        });
        this.artworksService.markUnmarkFavorite(await this.getRandomUserId(), artwork.id);
        return artwork;
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
        artworks_service_1.ArtworksService,
        users_service_1.UsersService,
        collections_service_1.CollectionsService,
        comments_service_1.CommentsService,
        reports_service_1.ReportsService])
], SeedService);
exports.SeedService = SeedService;
//# sourceMappingURL=seed.service.js.map