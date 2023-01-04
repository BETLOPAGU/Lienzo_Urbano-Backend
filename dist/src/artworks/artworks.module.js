"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArtworksModule = void 0;
const common_1 = require("@nestjs/common");
const artworks_service_1 = require("./artworks.service");
const artworks_resolver_1 = require("./artworks.resolver");
const prisma_service_1 = require("src/prisma.service");
const s3_service_1 = require("src/s3.service");
let ArtworksModule = class ArtworksModule {
};
ArtworksModule = __decorate([
    (0, common_1.Module)({
        providers: [artworks_resolver_1.ArtworksResolver, artworks_service_1.ArtworksService, prisma_service_1.PrismaService, s3_service_1.S3Service],
        exports: [artworks_service_1.ArtworksService],
    })
], ArtworksModule);
exports.ArtworksModule = ArtworksModule;
//# sourceMappingURL=artworks.module.js.map