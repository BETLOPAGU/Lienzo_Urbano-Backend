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
exports.ArtworkMaterial = void 0;
const graphql_1 = require("@nestjs/graphql");
const class_validator_1 = require("class-validator");
let ArtworkMaterial = class ArtworkMaterial {
};
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, { description: `ID from the record` }),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], ArtworkMaterial.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, { description: `ID from the artwork` }),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], ArtworkMaterial.prototype, "artworkId", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { description: `Material from the artwork` }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ArtworkMaterial.prototype, "material", void 0);
ArtworkMaterial = __decorate([
    (0, graphql_1.ObjectType)()
], ArtworkMaterial);
exports.ArtworkMaterial = ArtworkMaterial;
//# sourceMappingURL=artworkMaterial.entity.js.map