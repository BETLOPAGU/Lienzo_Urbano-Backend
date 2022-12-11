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
exports.Artwork = void 0;
const graphql_1 = require("@nestjs/graphql");
const class_validator_1 = require("class-validator");
let Artwork = class Artwork {
};
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, { description: `ID from the artwork` }),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], Artwork.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, { description: `ID from the artist` }),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], Artwork.prototype, "artistId", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { description: `Title of the artwork` }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(1),
    __metadata("design:type", String)
], Artwork.prototype, "title", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, {
        nullable: true,
        description: `Description of the artwork`,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(5),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], Artwork.prototype, "description", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, {
        nullable: true,
        description: `URL from the AWS S3 where is stored the artwork image`,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], Artwork.prototype, "imageUrl", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, {
        nullable: true,
        description: `Minimum working hours to complete the artwork`,
    }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], Artwork.prototype, "minWorkingHours", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, {
        nullable: true,
        description: `Maximum working hours to complete the artwork`,
    }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], Artwork.prototype, "maxWorkingHours", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Float, {
        nullable: true,
        description: `Minimum price for the artwork`,
    }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], Artwork.prototype, "minPrice", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Float, {
        nullable: true,
        description: `Maximum price for the artwork`,
    }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], Artwork.prototype, "maxPrice", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Float, {
        nullable: true,
        description: `Minimum height required to do the artwork`,
    }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], Artwork.prototype, "minHeight", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Float, {
        nullable: true,
        description: `Maximum height allowed to do the artwork`,
    }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], Artwork.prototype, "maxHeight", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Float, {
        nullable: true,
        description: `Minimum width required to do the artwork`,
    }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], Artwork.prototype, "minWidth", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Float, {
        nullable: true,
        description: `Maximum width allowed to do the artwork`,
    }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], Artwork.prototype, "maxWidth", void 0);
__decorate([
    (0, graphql_1.Field)(() => Date, {
        nullable: true,
        description: `Publication date of the artwork`,
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Date)
], Artwork.prototype, "createdDate", void 0);
__decorate([
    (0, graphql_1.Field)(() => Date, {
        nullable: true,
        description: `Date of deletion of the artwork`,
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Date)
], Artwork.prototype, "deletedDate", void 0);
__decorate([
    (0, graphql_1.Field)(() => Boolean, {
        nullable: true,
        description: `Boolean to know if the artwork is soft deleted`,
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], Artwork.prototype, "isDeleted", void 0);
Artwork = __decorate([
    (0, graphql_1.InputType)('ArtworkInput'),
    (0, graphql_1.ObjectType)()
], Artwork);
exports.Artwork = Artwork;
//# sourceMappingURL=artwork.entity.js.map