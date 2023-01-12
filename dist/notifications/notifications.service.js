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
exports.NotificationsService = void 0;
const common_1 = require("@nestjs/common");
const graphql_redis_subscriptions_1 = require("graphql-redis-subscriptions");
const prisma_service_1 = require("../prisma.service");
const pubsub_module_1 = require("../pubsub/pubsub.module");
const notification_types_enum_1 = require("../users/enums/notification-types.enum");
let NotificationsService = class NotificationsService {
    constructor(prisma, pubSub) {
        this.prisma = prisma;
        this.pubSub = pubSub;
    }
    async create(createNotificationInput) {
        const defaultType = notification_types_enum_1.NotificationTypes.SUCCESS;
        const notification = await this.prisma.notifications.create({
            data: {
                userId: createNotificationInput.userId,
                typeId: createNotificationInput.typeId || defaultType,
                title: createNotificationInput.title || 'Notificación',
                content: createNotificationInput.content,
                createdDate: new Date(),
            },
        });
        this.pubSub.publish(`USER_NOTIFICATIONS_${createNotificationInput.userId}`, { userNotifications: notification });
        return notification;
    }
    async findAll(userId) {
        return this.prisma.notifications.findMany({
            where: { userId },
        });
    }
    async markNotificationAsViewed(id) {
        return this.prisma.notifications.update({
            data: { viewed: true },
            where: { id },
        });
    }
    async createGlobalNotification(userId, createNotificationInput) {
        const defaultType = notification_types_enum_1.NotificationTypes.SUCCESS;
        const notification = await this.prisma.notifications.create({
            data: {
                userId,
                typeId: createNotificationInput.typeId || defaultType,
                title: createNotificationInput.title || 'Notificación',
                content: createNotificationInput.content,
                createdDate: new Date(),
            },
        });
        this.pubSub.publish(`GLOBAL_NOTIFICATIONS`, {
            userNotifications: notification,
        });
        return notification;
    }
    async remove(id) {
        return this.prisma.notifications.delete({ where: { id } });
    }
};
NotificationsService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, common_1.Inject)(pubsub_module_1.PUB_SUB)),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        graphql_redis_subscriptions_1.RedisPubSub])
], NotificationsService);
exports.NotificationsService = NotificationsService;
//# sourceMappingURL=notifications.service.js.map