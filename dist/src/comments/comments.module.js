"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentsModule = void 0;
const common_1 = require("@nestjs/common");
const comments_service_1 = require("./comments.service");
const comments_resolver_1 = require("./comments.resolver");
const prisma_service_1 = require("src/prisma.service");
const pubsub_module_1 = require("src/pubsub/pubsub.module");
const notifications_module_1 = require("src/notifications/notifications.module");
let CommentsModule = class CommentsModule {
};
CommentsModule = __decorate([
    (0, common_1.Module)({
        providers: [comments_resolver_1.CommentsResolver, comments_service_1.CommentsService, prisma_service_1.PrismaService],
        exports: [comments_service_1.CommentsService],
        imports: [pubsub_module_1.PubsubModule, notifications_module_1.NotificationsModule],
    })
], CommentsModule);
exports.CommentsModule = CommentsModule;
//# sourceMappingURL=comments.module.js.map