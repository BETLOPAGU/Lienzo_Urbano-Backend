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
exports.CommentsResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const comments_service_1 = require("./comments.service");
const comment_entity_1 = require("./entities/comment.entity");
const create_comment_input_1 = require("./dto/create-comment.input");
const jwt_decorator_1 = require("../auth/decorators/jwt.decorator");
let CommentsResolver = class CommentsResolver {
    constructor(commentsService) {
        this.commentsService = commentsService;
    }
    createComment(jwt, createCommentInput) {
        return this.commentsService.create(jwt.userId, createCommentInput);
    }
    findAll(userId, artworkId, commentId) {
        return this.commentsService.findAll({ userId, artworkId, commentId });
    }
    updateComment(id, comment) {
        return this.commentsService.update(id, comment);
    }
    removeComment(id) {
        return this.commentsService.remove(id);
    }
};
__decorate([
    (0, graphql_1.Mutation)(() => comment_entity_1.Comment),
    __param(0, (0, jwt_decorator_1.Jwt)()),
    __param(1, (0, graphql_1.Args)('createCommentInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_comment_input_1.CreateCommentInput]),
    __metadata("design:returntype", void 0)
], CommentsResolver.prototype, "createComment", null);
__decorate([
    (0, graphql_1.Query)(() => [comment_entity_1.Comment], { name: 'comments' }),
    __param(0, (0, graphql_1.Args)('userId', { type: () => graphql_1.Int, nullable: true })),
    __param(1, (0, graphql_1.Args)('artworkId', { type: () => graphql_1.Int, nullable: true })),
    __param(2, (0, graphql_1.Args)('commentId', { type: () => graphql_1.Int, nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Number]),
    __metadata("design:returntype", void 0)
], CommentsResolver.prototype, "findAll", null);
__decorate([
    (0, graphql_1.Mutation)(() => comment_entity_1.Comment),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.Int })),
    __param(1, (0, graphql_1.Args)('comment')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", void 0)
], CommentsResolver.prototype, "updateComment", null);
__decorate([
    (0, graphql_1.Mutation)(() => comment_entity_1.Comment),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], CommentsResolver.prototype, "removeComment", null);
CommentsResolver = __decorate([
    (0, graphql_1.Resolver)(() => comment_entity_1.Comment),
    __metadata("design:paramtypes", [comments_service_1.CommentsService])
], CommentsResolver);
exports.CommentsResolver = CommentsResolver;
//# sourceMappingURL=comments.resolver.js.map