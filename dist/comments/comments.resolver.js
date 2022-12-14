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
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const graphql_redis_subscriptions_1 = require("graphql-redis-subscriptions");
const pubsub_module_1 = require("../pubsub/pubsub.module");
const user_entity_1 = require("../users/entities/user.entity");
let CommentsResolver = class CommentsResolver {
    constructor(commentsService, pubSub) {
        this.commentsService = commentsService;
        this.pubSub = pubSub;
    }
    createComment(jwt, createCommentInput) {
        return this.commentsService.create(jwt.userId, createCommentInput);
    }
    findAll(userId, artworkId, commentId) {
        return this.commentsService.findAll({ userId, artworkId, commentId });
    }
    getListOfCommentedUsers(jwt) {
        return this.commentsService.getListOfCommentedUsers(jwt.userId);
    }
    updateComment(id, comment) {
        return this.commentsService.update(id, comment);
    }
    removeComment(id) {
        return this.commentsService.remove(id);
    }
    commentAdded(userId, artworkId, commentId) {
        if (userId)
            return this.pubSub.asyncIterator(`COMMENT_ADDED_FOR_USER_${userId}`);
        if (artworkId)
            return this.pubSub.asyncIterator(`COMMENT_ADDED_FOR_ARTWORK_${artworkId}`);
        if (commentId)
            return this.pubSub.asyncIterator(`COMMENT_ADDED_FOR_COMMENT_${commentId}`);
    }
};
__decorate([
    (0, graphql_1.Mutation)(() => comment_entity_1.Comment),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
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
    (0, graphql_1.Query)(() => [user_entity_1.User]),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, jwt_decorator_1.Jwt)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], CommentsResolver.prototype, "getListOfCommentedUsers", null);
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
__decorate([
    (0, graphql_1.Subscription)(() => comment_entity_1.Comment),
    __param(0, (0, graphql_1.Args)('userId', { type: () => graphql_1.Int, nullable: true })),
    __param(1, (0, graphql_1.Args)('artworkId', { type: () => graphql_1.Int, nullable: true })),
    __param(2, (0, graphql_1.Args)('commentId', { type: () => graphql_1.Int, nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Number]),
    __metadata("design:returntype", void 0)
], CommentsResolver.prototype, "commentAdded", null);
CommentsResolver = __decorate([
    (0, graphql_1.Resolver)(() => comment_entity_1.Comment),
    __param(1, (0, common_1.Inject)(pubsub_module_1.PUB_SUB)),
    __metadata("design:paramtypes", [comments_service_1.CommentsService,
        graphql_redis_subscriptions_1.RedisPubSub])
], CommentsResolver);
exports.CommentsResolver = CommentsResolver;
//# sourceMappingURL=comments.resolver.js.map