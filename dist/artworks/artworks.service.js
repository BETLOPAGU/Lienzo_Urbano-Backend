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
exports.ArtworksService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
const s3_service_1 = require("../s3.service");
const extractImageColors_1 = require("../utils/extractImageColors");
const chroma = require("chroma-js");
const event_types_enum_1 = require("../events/enums/event-types.enum");
const redis_service_1 = require("../redis.service");
let ArtworksService = class ArtworksService {
    constructor(prisma, s3Service, redisService) {
        this.prisma = prisma;
        this.s3Service = s3Service;
        this.redisService = redisService;
    }
    deleteExtraProps(input) {
        const photo = input.photo;
        delete input.photo;
        const collaborators = input.collaborators;
        delete input.collaborators;
        const tags = input.tags;
        delete input.tags;
        const addresses = input.addresses;
        delete input.addresses;
        const movements = input.movements;
        delete input.movements;
        const materials = input.materials;
        delete input.materials;
        return {
            photo,
            collaborators,
            tags,
            addresses,
            movements,
            materials,
        };
    }
    async create(artistId, createArtworkInput) {
        const extraProps = this.deleteExtraProps(createArtworkInput);
        createArtworkInput.createdDate = new Date();
        const artwork = await this.prisma.artworks.create({
            data: Object.assign({ artistId }, createArtworkInput),
        });
        if (!artwork)
            return artwork;
        if (extraProps.photo) {
            const imageUrl = await this.s3Service.uploadPhoto(extraProps.photo, `lienzo_urbano_artwork_${artwork.id}`);
            if (imageUrl) {
                await this.prisma.artworks.update({
                    where: { id: artwork.id },
                    data: {
                        imageUrl,
                    },
                });
                artwork.imageUrl = imageUrl;
            }
        }
        if (artwork.imageUrl) {
            const colors = await (0, extractImageColors_1.extractImageColors)(artwork.imageUrl);
            await this.overwriteColors(artwork.id, colors);
        }
        await this.overwriteCollaborators(artwork.id, extraProps.collaborators);
        await this.overwriteTags(artwork.id, extraProps.tags);
        await this.overwriteMovements(artwork.id, extraProps.movements);
        await this.overwriteMaterials(artwork.id, extraProps.materials);
        return artwork;
    }
    async findAll(findArtworksInput) {
        if (!findArtworksInput)
            findArtworksInput = {};
        const color = findArtworksInput.color;
        delete findArtworksInput.color;
        let artworks = await this.prisma.artworks.findMany({
            where: Object.assign(Object.assign({}, findArtworksInput), { isDeleted: false }),
            include: { artworksColors: true },
        });
        if (color) {
            const minimunDistance = 50;
            const artworksFilteredByColor = artworks.filter((artwork) => {
                var _a;
                const avgColor = (_a = artwork.artworksColors.find((c) => c.color.startsWith('AVG'))) === null || _a === void 0 ? void 0 : _a.color;
                if (!avgColor || typeof avgColor !== 'string')
                    return false;
                const distance = chroma.distance(avgColor.replace('AVG', ''), color);
                return distance < minimunDistance;
            });
            artworks = artworksFilteredByColor;
        }
        return artworks;
    }
    async findArtworksByGeoRadius(userId, radius) {
        const user = await this.prisma.users.findUnique({ where: { id: userId } });
        if (!user)
            return [];
        const artworkIds = await this.redisService.getArtworksOnRadius({
            longitude: user.longitude || -115.17258,
            latitude: user.latitude || 36.11996,
            radius: radius,
        });
        return this.prisma.artworks.findMany({
            where: {
                id: { in: artworkIds },
            },
        });
    }
    async findOne(userId, artworkId) {
        await this.prisma.events.create({
            data: {
                artworkId,
                userId,
                typeId: event_types_enum_1.EventTypes.VISIT,
                createdDate: new Date(),
            },
        });
        return this.prisma.artworks.findUnique({ where: { id: artworkId } });
    }
    async update(id, updateArtworkInput) {
        const extraProps = this.deleteExtraProps(updateArtworkInput);
        await this.overwriteCollaborators(id, extraProps.collaborators);
        await this.overwriteTags(id, extraProps.tags);
        await this.overwriteMovements(id, extraProps.movements);
        await this.overwriteMaterials(id, extraProps.materials);
        return this.prisma.artworks.update({
            data: updateArtworkInput,
            where: { id },
        });
    }
    async remove(id) {
        return this.prisma.artworks.delete({ where: { id } });
    }
    async markUnmarkFavorite(userId, artworkId) {
        const favoriteArtworkRecord = await this.prisma.favoritesArtworks.findFirst({
            where: { artworkId, userId },
        });
        if (favoriteArtworkRecord) {
            await this.prisma.events.deleteMany({
                where: {
                    artworkId,
                    userId,
                    typeId: event_types_enum_1.EventTypes.FAVORITE,
                },
            });
            return this.prisma.favoritesArtworks.delete({
                where: { id: favoriteArtworkRecord.id },
            });
        }
        else {
            await this.prisma.events.create({
                data: {
                    artworkId,
                    userId,
                    typeId: event_types_enum_1.EventTypes.FAVORITE,
                    createdDate: new Date(),
                },
            });
            return this.prisma.favoritesArtworks.create({
                data: {
                    createdDate: new Date(),
                    artworkId,
                    userId,
                },
            });
        }
    }
    async favoriteCount(artwork) {
        return this.prisma.favoritesArtworks.count({
            where: { artworkId: artwork.id },
        });
    }
    async overwriteCollaborators(artworkId, collaborators) {
        if (!collaborators || collaborators.length === 0)
            return 0;
        await this.prisma.artworksCollaborators.deleteMany({
            where: { artworkId },
        });
        const result = this.prisma.artworksCollaborators.createMany({
            data: collaborators.map((artistId) => ({
                artistId,
                artworkId,
            })),
        });
        return (await result).count;
    }
    async collaborators(artwork) {
        const result = await this.prisma.artworksCollaborators.findMany({
            where: { artworkId: artwork.id },
            include: {
                users: true,
            },
        });
        const collaborators = result.map((c) => (Object.assign(Object.assign({}, c), { artist: c.users })));
        return collaborators;
    }
    async overwriteTags(artworkId, tags) {
        if (!tags || tags.length === 0)
            return 0;
        await this.prisma.artworksTags.deleteMany({
            where: { artworkId },
        });
        const result = this.prisma.artworksTags.createMany({
            data: tags.map((tag) => ({
                tag,
                artworkId,
            })),
        });
        return (await result).count;
    }
    async tags(artwork) {
        return this.prisma.artworksTags.findMany({
            where: { artworkId: artwork.id },
        });
    }
    async overwriteColors(artworkId, colors) {
        if (!colors || colors.length === 0)
            return 0;
        await this.prisma.artworksColors.deleteMany({
            where: { artworkId },
        });
        const result = this.prisma.artworksColors.createMany({
            data: colors.map((color) => ({
                color,
                artworkId,
            })),
        });
        return (await result).count;
    }
    async colors(artwork) {
        return this.prisma.artworksColors.findMany({
            where: { artworkId: artwork.id },
        });
    }
    async overwriteMovements(artworkId, movements) {
        if (!movements || movements.length === 0)
            return 0;
        await this.prisma.artworksMovements.deleteMany({
            where: { artworkId },
        });
        const result = this.prisma.artworksMovements.createMany({
            data: movements.map((movement) => ({
                movement,
                artworkId,
            })),
        });
        return (await result).count;
    }
    async movements(artwork) {
        return this.prisma.artworksMovements.findMany({
            where: { artworkId: artwork.id },
        });
    }
    async overwriteMaterials(artworkId, materials) {
        if (!materials || materials.length === 0)
            return 0;
        await this.prisma.artworksMaterials.deleteMany({
            where: { artworkId },
        });
        const result = this.prisma.artworksMaterials.createMany({
            data: materials.map((material) => ({
                material,
                artworkId,
            })),
        });
        return (await result).count;
    }
    async materials(artwork) {
        return this.prisma.artworksMaterials.findMany({
            where: { artworkId: artwork.id },
        });
    }
    async artist(artwork) {
        return this.prisma.users.findUnique({
            where: { id: artwork.artistId },
        });
    }
};
ArtworksService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        s3_service_1.S3Service,
        redis_service_1.RedisService])
], ArtworksService);
exports.ArtworksService = ArtworksService;
//# sourceMappingURL=artworks.service.js.map