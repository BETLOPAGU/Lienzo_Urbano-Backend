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
exports.ArtworksResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const artworks_service_1 = require("./artworks.service");
const artwork_entity_1 = require("./entities/artwork.entity");
const create_artwork_input_1 = require("./dto/create-artwork.input");
const update_artwork_input_1 = require("./dto/update-artwork.input");
const find_artworks_input_1 = require("./dto/find-artworks.input");
const favoriteArtwork_entity_1 = require("./entities/favoriteArtwork.entity");
const artworkCollaborator_entity_1 = require("./entities/artworkCollaborator.entity");
const artworkTag_entity_1 = require("./entities/artworkTag.entity");
const artworkAddress_entity_1 = require("./entities/artworkAddress.entity");
const artworkColor_entity_1 = require("./entities/artworkColor.entity");
const artworkMovement_entity_1 = require("./entities/artworkMovement.entity");
const artworkMaterial_entity_1 = require("./entities/artworkMaterial.entity");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const common_1 = require("@nestjs/common");
const jwt_decorator_1 = require("../auth/decorators/jwt.decorator");
const user_types_enum_1 = require("../users/enums/user-types.enum");
const user_entity_1 = require("../users/entities/user.entity");
let ArtworksResolver = class ArtworksResolver {
    constructor(artworksService) {
        this.artworksService = artworksService;
    }
    createArtwork(jwt, createArtworkInput) {
        return this.artworksService.create(jwt.userId, createArtworkInput);
    }
    findAll(findArtworksInput) {
        return this.artworksService.findAll(findArtworksInput);
    }
    findOne(jwt, id) {
        return this.artworksService.findOne(jwt.userId, id);
    }
    updateArtwork(updateArtworkInput) {
        return this.artworksService.update(updateArtworkInput.id, updateArtworkInput);
    }
    removeArtwork(id) {
        return this.artworksService.remove(id);
    }
    markUnmarkFavoriteArtwork(jwt, id) {
        return this.artworksService.markUnmarkFavorite(jwt.userId, id);
    }
    favoriteCount(artwork) {
        return this.artworksService.favoriteCount(artwork);
    }
    collaborators(artwork) {
        return this.artworksService.collaborators(artwork);
    }
    tags(artwork) {
        return this.artworksService.tags(artwork);
    }
    addresses(artwork) {
        return this.artworksService.addresses(artwork);
    }
    colors(artwork) {
        return this.artworksService.colors(artwork);
    }
    movements(artwork) {
        return this.artworksService.movements(artwork);
    }
    materials(artwork) {
        return this.artworksService.materials(artwork);
    }
    artist(artwork) {
        return this.artworksService.artist(artwork);
    }
};
__decorate([
    (0, graphql_1.Mutation)(() => artwork_entity_1.Artwork),
    __param(0, (0, jwt_decorator_1.Jwt)([user_types_enum_1.UserTypes.ARTIST, user_types_enum_1.UserTypes.ADMIN])),
    __param(1, (0, graphql_1.Args)('createArtworkInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_artwork_input_1.CreateArtworkInput]),
    __metadata("design:returntype", void 0)
], ArtworksResolver.prototype, "createArtwork", null);
__decorate([
    (0, graphql_1.Query)(() => [artwork_entity_1.Artwork], { name: 'artworks' }),
    __param(0, (0, graphql_1.Args)('filters', { nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [find_artworks_input_1.FindArtworksInput]),
    __metadata("design:returntype", void 0)
], ArtworksResolver.prototype, "findAll", null);
__decorate([
    (0, graphql_1.Query)(() => artwork_entity_1.Artwork, { name: 'artwork', nullable: true }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, jwt_decorator_1.Jwt)()),
    __param(1, (0, graphql_1.Args)('id', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", void 0)
], ArtworksResolver.prototype, "findOne", null);
__decorate([
    (0, graphql_1.Mutation)(() => artwork_entity_1.Artwork),
    __param(0, (0, graphql_1.Args)('updateArtworkInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_artwork_input_1.UpdateArtworkInput]),
    __metadata("design:returntype", void 0)
], ArtworksResolver.prototype, "updateArtwork", null);
__decorate([
    (0, graphql_1.Mutation)(() => artwork_entity_1.Artwork),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ArtworksResolver.prototype, "removeArtwork", null);
__decorate([
    (0, graphql_1.Mutation)(() => favoriteArtwork_entity_1.FavoriteArtwork),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, jwt_decorator_1.Jwt)()),
    __param(1, (0, graphql_1.Args)('id', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", void 0)
], ArtworksResolver.prototype, "markUnmarkFavoriteArtwork", null);
__decorate([
    (0, graphql_1.ResolveField)(() => graphql_1.Int),
    __param(0, (0, graphql_1.Parent)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [artwork_entity_1.Artwork]),
    __metadata("design:returntype", void 0)
], ArtworksResolver.prototype, "favoriteCount", null);
__decorate([
    (0, graphql_1.ResolveField)(() => [artworkCollaborator_entity_1.ArtworkCollaborator]),
    __param(0, (0, graphql_1.Parent)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [artwork_entity_1.Artwork]),
    __metadata("design:returntype", void 0)
], ArtworksResolver.prototype, "collaborators", null);
__decorate([
    (0, graphql_1.ResolveField)(() => [artworkTag_entity_1.ArtworkTag]),
    __param(0, (0, graphql_1.Parent)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [artwork_entity_1.Artwork]),
    __metadata("design:returntype", void 0)
], ArtworksResolver.prototype, "tags", null);
__decorate([
    (0, graphql_1.ResolveField)(() => [artworkAddress_entity_1.ArtworkAddress]),
    __param(0, (0, graphql_1.Parent)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [artwork_entity_1.Artwork]),
    __metadata("design:returntype", void 0)
], ArtworksResolver.prototype, "addresses", null);
__decorate([
    (0, graphql_1.ResolveField)(() => [artworkColor_entity_1.ArtworkColor]),
    __param(0, (0, graphql_1.Parent)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [artwork_entity_1.Artwork]),
    __metadata("design:returntype", void 0)
], ArtworksResolver.prototype, "colors", null);
__decorate([
    (0, graphql_1.ResolveField)(() => [artworkMovement_entity_1.ArtworkMovement]),
    __param(0, (0, graphql_1.Parent)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [artwork_entity_1.Artwork]),
    __metadata("design:returntype", void 0)
], ArtworksResolver.prototype, "movements", null);
__decorate([
    (0, graphql_1.ResolveField)(() => [artworkMaterial_entity_1.ArtworkMaterial]),
    __param(0, (0, graphql_1.Parent)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [artwork_entity_1.Artwork]),
    __metadata("design:returntype", void 0)
], ArtworksResolver.prototype, "materials", null);
__decorate([
    (0, graphql_1.ResolveField)(() => user_entity_1.User),
    __param(0, (0, graphql_1.Parent)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [artwork_entity_1.Artwork]),
    __metadata("design:returntype", void 0)
], ArtworksResolver.prototype, "artist", null);
ArtworksResolver = __decorate([
    (0, graphql_1.Resolver)(() => artwork_entity_1.Artwork),
    __metadata("design:paramtypes", [artworks_service_1.ArtworksService])
], ArtworksResolver);
exports.ArtworksResolver = ArtworksResolver;
//# sourceMappingURL=artworks.resolver.js.map