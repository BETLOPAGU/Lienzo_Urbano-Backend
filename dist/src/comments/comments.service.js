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
exports.CommentsService = void 0;
const common_1 = require("@nestjs/common");
const graphql_redis_subscriptions_1 = require("graphql-redis-subscriptions");
const prisma_service_1 = require("src/prisma.service");
const pubsub_module_1 = require("src/pubsub/pubsub.module");
const notifications_service_1 = require("src/notifications/notifications.service");
const event_types_enum_1 = require("src/events/enums/event-types.enum");
let CommentsService = class CommentsService {
    constructor(prisma, notificationsService, pubSub) {
        this.prisma = prisma;
        this.notificationsService = notificationsService;
        this.pubSub = pubSub;
    }
    async create(commentatorId, createCommentInput) {
        const { userId, artworkId, commentId } = createCommentInput;
        const commentator = await this.prisma.users.findUnique({
            where: { id: commentatorId },
        });
        const commentCreated = await this.prisma.comments.create({
            data: Object.assign(Object.assign(Object.assign({ createdDate: new Date(), commentatorId, comment: createCommentInput.comment }, (userId ? { userId } : {})), (artworkId ? { artworkId } : {})), (commentId ? { commentId } : {})),
        });
        if (userId) {
            this.pubSub.publish(`COMMENT_ADDED_FOR_USER_${userId}`, {
                commentAdded: commentCreated,
            });
            await this.notificationsService.create({
                userId,
                title: `Has recibido un nuevo mensaje de ${commentator.firstName} ${commentator.lastName}`,
                content: commentCreated.comment,
            });
        }
        if (artworkId) {
            const artwork = await this.prisma.artworks.findUnique({
                where: { id: artworkId },
            });
            this.pubSub.publish(`COMMENT_ADDED_FOR_ARTWORK_${artworkId}`, {
                commentAdded: commentCreated,
            });
            await this.notificationsService.create({
                userId: artwork.artistId,
                title: `${commentator.firstName} ${commentator.lastName} ha comentado tu obra de arte "${artwork.title}"`,
                content: commentCreated.comment,
            });
            await this.prisma.events.create({
                data: {
                    artworkId,
                    userId: artwork.artistId,
                    typeId: event_types_enum_1.EventTypes.COMMENT,
                    createdDate: new Date(),
                },
            });
        }
        if (commentId) {
            const comment = await this.prisma.comments.findUnique({
                where: { id: commentId },
            });
            this.pubSub.publish(`COMMENT_ADDED_FOR_COMMENT_${commentId}`, {
                commentAdded: comment,
            });
            await this.notificationsService.create({
                userId: comment.commentatorId,
                title: `${commentator.firstName} ${commentator.lastName} ha comentado tu comentario`,
                content: commentCreated.comment,
            });
        }
        return commentCreated;
    }
    async findAll(payload) {
        const { userId, artworkId, commentId } = payload;
        return this.prisma.comments.findMany({
            where: Object.assign(Object.assign(Object.assign({}, (userId ? { userId } : {})), (artworkId ? { artworkId } : {})), (commentId ? { commentId } : {})),
            orderBy: {
                id: 'desc',
            },
        });
    }
    async getListOfCommentedUsers(commentatorId) {
        const comments = await this.prisma.comments.groupBy({
            by: ['userId'],
            where: {
                AND: [{ commentatorId }, { NOT: [{ userId: null }] }],
            },
        });
        return this.prisma.users.findMany({
            where: {
                id: { in: comments.map((c) => c.userId) },
            },
        });
    }
    async update(id, comment) {
        return this.prisma.comments.update({ where: { id }, data: { comment } });
    }
    async remove(id) {
        return this.prisma.comments.delete({ where: { id } });
    }
};
CommentsService = __decorate([
    (0, common_1.Injectable)(),
    __param(2, (0, common_1.Inject)(pubsub_module_1.PUB_SUB)),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        notifications_service_1.NotificationsService,
        graphql_redis_subscriptions_1.RedisPubSub])
], CommentsService);
exports.CommentsService = CommentsService;
//# sourceMappingURL=comments.service.js.map