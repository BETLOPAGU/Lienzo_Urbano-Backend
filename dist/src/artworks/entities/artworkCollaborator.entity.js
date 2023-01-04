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
exports.ArtworkCollaborator = void 0;
const graphql_1 = require("@nestjs/graphql");
const class_validator_1 = require("class-validator");
const user_entity_1 = require("src/users/entities/user.entity");
let ArtworkCollaborator = class ArtworkCollaborator {
};
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, { description: `ID from the record` }),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], ArtworkCollaborator.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, { description: `ID from the artist` }),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], ArtworkCollaborator.prototype, "artistId", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, { description: `ID from the artwork` }),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], ArtworkCollaborator.prototype, "artworkId", void 0);
__decorate([
    (0, graphql_1.Field)(() => user_entity_1.User, { description: `Data from the artist collaborator` }),
    __metadata("design:type", user_entity_1.User)
], ArtworkCollaborator.prototype, "artist", void 0);
ArtworkCollaborator = __decorate([
    (0, graphql_1.ObjectType)()
], ArtworkCollaborator);
exports.ArtworkCollaborator = ArtworkCollaborator;
//# sourceMappingURL=artworkCollaborator.entity.js.map