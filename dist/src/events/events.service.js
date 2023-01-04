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
exports.EventsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("src/prisma.service");
let EventsService = class EventsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(userId, createEventInput) {
        return this.prisma.events.create({
            data: Object.assign({ userId }, createEventInput),
        });
    }
    async getPopularArtworks(numberOfRecommendations = 10) {
        const events = await this.prisma.events.groupBy({
            by: ['artworkId'],
            _sum: {
                typeId: true,
            },
        });
        const topArtworks = events
            .sort((a, b) => a._sum.typeId - b._sum.typeId)
            .reverse()
            .slice(0, numberOfRecommendations);
        const popularArtworks = [];
        for (const topArtwork of topArtworks) {
            const artwork = await this.prisma.artworks.findUnique({
                where: { id: topArtwork.artworkId },
            });
            popularArtworks.push(artwork);
        }
        return popularArtworks;
    }
    async getArtworkRecommendations(userId, numberOfRecommendations = 10) {
        const latestEvents = await this.prisma.events.findMany({
            where: {
                userId,
            },
            include: {
                artworks: true,
            },
        });
        const eventTypeWeights = {
            '1': 1,
            '2': 2,
            '3': 3,
        };
        const movementsPreferences = {};
        const tagsPreferences = {};
        const artistsPreferences = {};
        for (const event of latestEvents) {
            const artworkMovements = await this.prisma.artworksMovements.findMany({
                where: { artworkId: event.artworkId },
            });
            for (const artworkMovement of artworkMovements) {
                const movement = artworkMovement.movement;
                if (!movementsPreferences[movement])
                    movementsPreferences[movement] = 0;
                movementsPreferences[movement] += eventTypeWeights[event.typeId];
            }
            const artworkTags = await this.prisma.artworksTags.findMany({
                where: { artworkId: event.artworkId },
            });
            for (const artworkTag of artworkTags) {
                const tag = artworkTag.tag;
                if (!tagsPreferences[tag])
                    tagsPreferences[tag] = 0;
                tagsPreferences[tag] += eventTypeWeights[event.typeId];
            }
            const artistId = event.artworks.artistId;
            if (!artistsPreferences[artistId])
                artistsPreferences[artistId] = 0;
            artistsPreferences[artistId] += eventTypeWeights[event.typeId] * 2;
            const artworkArtists = await this.prisma.artworksCollaborators.findMany({
                where: { artworkId: event.artworkId },
            });
            for (const artworkArtist of artworkArtists) {
                const artistId = artworkArtist.artistId;
                if (!artistsPreferences[artistId])
                    artistsPreferences[artistId] = 0;
                artistsPreferences[artistId] += eventTypeWeights[event.typeId];
            }
        }
        const artworksScore = {};
        for (const [movement, score] of Object.entries(movementsPreferences)) {
            const artworkMovements = await this.prisma.artworksMovements.findMany({
                where: { movement },
            });
            for (const artworkMovement of artworkMovements) {
                if (!artworksScore[artworkMovement.artworkId])
                    artworksScore[artworkMovement.artworkId] = 0;
                artworksScore[artworkMovement.artworkId] += score;
            }
        }
        for (const [tag, score] of Object.entries(tagsPreferences)) {
            const artworkTags = await this.prisma.artworksTags.findMany({
                where: { tag },
            });
            for (const artworkTag of artworkTags) {
                if (!artworksScore[artworkTag.artworkId])
                    artworksScore[artworkTag.artworkId] = 0;
                artworksScore[artworkTag.artworkId] += score;
            }
        }
        for (const [artistId, score] of Object.entries(artistsPreferences)) {
            const artworks = await this.prisma.artworks.findMany({
                where: { artistId: Number(artistId) },
            });
            for (const artwork of artworks) {
                if (!artworksScore[artwork.id])
                    artworksScore[artwork.id] = 0;
                artworksScore[artwork.id] += score;
            }
        }
        const topScores = Object.entries(artworksScore)
            .sort((a, b) => a[1] - b[1])
            .reverse()
            .slice(0, numberOfRecommendations);
        const artworksRecommendations = [];
        for (const score of topScores) {
            const artwork = await this.prisma.artworks.findUnique({
                where: { id: Number(score[0]) },
            });
            artworksRecommendations.push(artwork);
        }
        if (artworksRecommendations.length === 0) {
            return await this.getPopularArtworks(numberOfRecommendations);
        }
        return artworksRecommendations;
    }
};
EventsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], EventsService);
exports.EventsService = EventsService;
//# sourceMappingURL=events.service.js.map