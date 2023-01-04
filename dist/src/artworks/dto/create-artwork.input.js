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
exports.CreateArtworkInput = void 0;
const graphql_1 = require("@nestjs/graphql");
const class_validator_1 = require("class-validator");
const artwork_entity_1 = require("../entities/artwork.entity");
let CreateArtworkInput = class CreateArtworkInput extends (0, graphql_1.OmitType)(artwork_entity_1.Artwork, [
    'id',
    'artistId',
]) {
};
__decorate([
    (0, graphql_1.Field)(() => String, {
        nullable: true,
        description: `Photo from the user`,
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateArtworkInput.prototype, "photo", void 0);
__decorate([
    (0, graphql_1.Field)(() => [graphql_1.Int], {
        description: `List of collaborators artists`,
        nullable: true,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], CreateArtworkInput.prototype, "collaborators", void 0);
__decorate([
    (0, graphql_1.Field)(() => [String], {
        description: `List of tags from the artwork`,
        nullable: true,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], CreateArtworkInput.prototype, "tags", void 0);
__decorate([
    (0, graphql_1.Field)(() => [String], {
        description: `List of addresses from the artwork`,
        nullable: true,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], CreateArtworkInput.prototype, "addresses", void 0);
__decorate([
    (0, graphql_1.Field)(() => [String], {
        description: `List of artistic movements from the artwork`,
        nullable: true,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], CreateArtworkInput.prototype, "movements", void 0);
__decorate([
    (0, graphql_1.Field)(() => [String], {
        description: `List of materials from the artwork`,
        nullable: true,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], CreateArtworkInput.prototype, "materials", void 0);
CreateArtworkInput = __decorate([
    (0, graphql_1.InputType)()
], CreateArtworkInput);
exports.CreateArtworkInput = CreateArtworkInput;
//# sourceMappingURL=create-artwork.input.js.map