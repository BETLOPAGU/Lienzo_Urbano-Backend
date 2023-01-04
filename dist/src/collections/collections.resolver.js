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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CollectionsResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const collections_service_1 = require("./collections.service");
const collection_entity_1 = require("./entities/collection.entity");
const create_collection_input_1 = require("./dto/create-collection.input");
const update_collection_input_1 = require("./dto/update-collection.input");
const jwt_decorator_1 = require("src/auth/decorators/jwt.decorator");
const artworkCollection_entity_1 = require("./entities/artworkCollection.entity");
const artwork_entity_1 = require("../artworks/entities/artwork.entity");
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("src/auth/guards/jwt-auth.guard");
let CollectionsResolver = class CollectionsResolver {
    constructor(collectionsService) {
        this.collectionsService = collectionsService;
    }
    createCollection(jwt, createCollectionInput) {
        return this.collectionsService.create(jwt.userId, createCollectionInput);
    }
    updateCollection(updateCollectionInput) {
        return this.collectionsService.update(updateCollectionInput.id, updateCollectionInput);
    }
    removeCollection(id) {
        return this.collectionsService.remove(id);
    }
    addRemoveArtworkFromCollection(collectionId, artworkId) {
        return this.collectionsService.addRemoveArtworkFromCollection({
            collectionId,
            artworkId,
        });
    }
    artworks(collection) {
        return this.collectionsService.artworks(collection);
    }
};
__decorate([
    (0, graphql_1.Mutation)(() => collection_entity_1.Collection),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, jwt_decorator_1.Jwt)()),
    __param(1, (0, graphql_1.Args)('createCollectionInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_collection_input_1.CreateCollectionInput]),
    __metadata("design:returntype", void 0)
], CollectionsResolver.prototype, "createCollection", null);
__decorate([
    (0, graphql_1.Mutation)(() => collection_entity_1.Collection),
    __param(0, (0, graphql_1.Args)('updateCollectionInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_collection_input_1.UpdateCollectionInput]),
    __metadata("design:returntype", void 0)
], CollectionsResolver.prototype, "updateCollection", null);
__decorate([
    (0, graphql_1.Mutation)(() => collection_entity_1.Collection),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], CollectionsResolver.prototype, "removeCollection", null);
__decorate([
    (0, graphql_1.Mutation)(() => artworkCollection_entity_1.ArtworkCollection),
    __param(0, (0, graphql_1.Args)('collectionId', { type: () => graphql_1.Int })),
    __param(1, (0, graphql_1.Args)('artworkId', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", void 0)
], CollectionsResolver.prototype, "addRemoveArtworkFromCollection", null);
__decorate([
    (0, graphql_1.ResolveField)(() => [artwork_entity_1.Artwork]),
    __param(0, (0, graphql_1.Parent)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [collection_entity_1.Collection]),
    __metadata("design:returntype", void 0)
], CollectionsResolver.prototype, "artworks", null);
CollectionsResolver = __decorate([
    (0, graphql_1.Resolver)(() => collection_entity_1.Collection),
    __metadata("design:paramtypes", [collections_service_1.CollectionsService])
], CollectionsResolver);
exports.CollectionsResolver = CollectionsResolver;
//# sourceMappingURL=collections.resolver.js.map