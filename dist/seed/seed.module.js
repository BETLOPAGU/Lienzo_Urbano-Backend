"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeedModule = void 0;
const common_1 = require("@nestjs/common");
const seed_service_1 = require("./seed.service");
const seed_resolver_1 = require("./seed.resolver");
const artworks_module_1 = require("../artworks/artworks.module");
const users_module_1 = require("../users/users.module");
const collections_module_1 = require("../collections/collections.module");
const comments_module_1 = require("../comments/comments.module");
const reports_module_1 = require("../reports/reports.module");
const prisma_service_1 = require("../prisma.service");
const redis_service_1 = require("../redis.service");
let SeedModule = class SeedModule {
};
SeedModule = __decorate([
    (0, common_1.Module)({
        providers: [seed_resolver_1.SeedResolver, seed_service_1.SeedService, prisma_service_1.PrismaService, redis_service_1.RedisService],
        imports: [
            artworks_module_1.ArtworksModule,
            users_module_1.UsersModule,
            collections_module_1.CollectionsModule,
            comments_module_1.CommentsModule,
            reports_module_1.ReportsModule,
        ],
    })
], SeedModule);
exports.SeedModule = SeedModule;
//# sourceMappingURL=seed.module.js.map