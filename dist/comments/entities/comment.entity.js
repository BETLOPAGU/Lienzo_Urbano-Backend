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
exports.Comment = void 0;
const graphql_1 = require("@nestjs/graphql");
const class_validator_1 = require("class-validator");
let Comment = class Comment {
};
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, { description: `ID from the comment` }),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], Comment.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, {
        description: `ID from the user that created the comment`,
    }),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], Comment.prototype, "commentatorId", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { description: `Comment body` }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(1),
    __metadata("design:type", String)
], Comment.prototype, "comment", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, {
        description: `ID from the user that is being commented`,
        nullable: true,
    }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], Comment.prototype, "userId", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, {
        description: `ID from the artwork that is being commented`,
        nullable: true,
    }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], Comment.prototype, "artworkId", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, {
        description: `ID from the comment that is being commented`,
        nullable: true,
    }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], Comment.prototype, "commentId", void 0);
__decorate([
    (0, graphql_1.Field)(() => Date, {
        nullable: true,
        description: `Creation date of the record`,
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Date)
], Comment.prototype, "createdDate", void 0);
Comment = __decorate([
    (0, graphql_1.InputType)('CommentInput'),
    (0, graphql_1.ObjectType)()
], Comment);
exports.Comment = Comment;
//# sourceMappingURL=comment.entity.js.map