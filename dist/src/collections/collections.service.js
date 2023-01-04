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
exports.CollectionsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("src/prisma.service");
let CollectionsService = class CollectionsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(userId, createCollectionInput) {
        return this.prisma.collections.create({
            data: {
                createdDate: new Date(),
                userId,
                name: createCollectionInput.name,
                imageUrl: createCollectionInput.imageUrl,
            },
        });
    }
    async update(id, updateCollectionInput) {
        return this.prisma.collections.update({
            data: updateCollectionInput,
            where: { id },
        });
    }
    async remove(id) {
        return this.prisma.collections.delete({ where: { id } });
    }
    async addRemoveArtworkFromCollection(payload) {
        const { collectionId, artworkId } = payload;
        const dbRecord = await this.prisma.artworkCollections.findFirst({
            where: { collectionId, artworkId },
        });
        if (dbRecord) {
            return this.prisma.artworkCollections.delete({
                where: { id: dbRecord.id },
            });
        }
        else {
            return this.prisma.artworkCollections.create({
                data: {
                    artworkId,
                    collectionId,
                },
            });
        }
    }
    async artworks(collection) {
        const records = await this.prisma.artworkCollections.findMany({
            where: { collectionId: collection.id },
            include: { artworks: true },
        });
        return records.map((record) => record.artworks);
    }
};
CollectionsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CollectionsService);
exports.CollectionsService = CollectionsService;
//# sourceMappingURL=collections.service.js.map