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
exports.NotificationsResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const notifications_service_1 = require("./notifications.service");
const notification_entity_1 = require("./entities/notification.entity");
const common_1 = require("@nestjs/common");
const jwt_decorator_1 = require("../auth/decorators/jwt.decorator");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const graphql_redis_subscriptions_1 = require("graphql-redis-subscriptions");
const pubsub_module_1 = require("../pubsub/pubsub.module");
let NotificationsResolver = class NotificationsResolver {
    constructor(notificationsService, pubSub) {
        this.notificationsService = notificationsService;
        this.pubSub = pubSub;
    }
    findAll(jwt) {
        return this.notificationsService.findAll(jwt.userId);
    }
    createGlobalNotification(jwt, title) {
        return this.notificationsService.createGlobalNotification(jwt.userId, title);
    }
    markNotificationAsViewed(id) {
        return this.notificationsService.markNotificationAsViewed(id);
    }
    removeNotification(id) {
        return this.notificationsService.remove(id);
    }
    userNotifications(userId) {
        return this.pubSub.asyncIterator(`USER_NOTIFICATIONS_${userId}`);
    }
    globalNotifications() {
        return this.pubSub.asyncIterator('GLOBAL_NOTIFICATIONS');
    }
};
__decorate([
    (0, graphql_1.Query)(() => [notification_entity_1.Notification], { name: 'notifications' }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, jwt_decorator_1.Jwt)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], NotificationsResolver.prototype, "findAll", null);
__decorate([
    (0, graphql_1.Mutation)(() => notification_entity_1.Notification),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, jwt_decorator_1.Jwt)()),
    __param(1, (0, graphql_1.Args)('title', { type: () => String })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], NotificationsResolver.prototype, "createGlobalNotification", null);
__decorate([
    (0, graphql_1.Mutation)(() => notification_entity_1.Notification),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], NotificationsResolver.prototype, "markNotificationAsViewed", null);
__decorate([
    (0, graphql_1.Mutation)(() => notification_entity_1.Notification),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], NotificationsResolver.prototype, "removeNotification", null);
__decorate([
    (0, graphql_1.Subscription)(() => notification_entity_1.Notification),
    __param(0, (0, graphql_1.Args)('userId', { type: () => graphql_1.Int, nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], NotificationsResolver.prototype, "userNotifications", null);
__decorate([
    (0, graphql_1.Subscription)(() => notification_entity_1.Notification),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], NotificationsResolver.prototype, "globalNotifications", null);
NotificationsResolver = __decorate([
    (0, graphql_1.Resolver)(() => notification_entity_1.Notification),
    __param(1, (0, common_1.Inject)(pubsub_module_1.PUB_SUB)),
    __metadata("design:paramtypes", [notifications_service_1.NotificationsService,
        graphql_redis_subscriptions_1.RedisPubSub])
], NotificationsResolver);
exports.NotificationsResolver = NotificationsResolver;
//# sourceMappingURL=notifications.resolver.js.map