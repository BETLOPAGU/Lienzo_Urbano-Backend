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
exports.SeedResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const seed_service_1 = require("./seed.service");
let SeedResolver = class SeedResolver {
    constructor(seedService) {
        this.seedService = seedService;
    }
    runSeed() {
        return this.seedService.populateDB();
    }
    deleteDataFromDB() {
        return this.seedService.deleteDataFromDB();
    }
};
__decorate([
    (0, graphql_1.Mutation)(() => Boolean, { description: 'Method to auto generate test data' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SeedResolver.prototype, "runSeed", null);
__decorate([
    (0, graphql_1.Mutation)(() => Boolean, {
        description: 'Method to delete the data in all the tables',
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SeedResolver.prototype, "deleteDataFromDB", null);
SeedResolver = __decorate([
    (0, graphql_1.Resolver)(),
    __metadata("design:paramtypes", [seed_service_1.SeedService])
], SeedResolver);
exports.SeedResolver = SeedResolver;
//# sourceMappingURL=seed.resolver.js.map