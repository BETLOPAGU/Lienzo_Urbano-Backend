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
exports.Notification = void 0;
const graphql_1 = require("@nestjs/graphql");
const class_validator_1 = require("class-validator");
const notification_types_enum_1 = require("src/users/enums/notification-types.enum");
let Notification = class Notification {
};
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, { description: `ID from the notification` }),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], Notification.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, {
        description: `ID from the user who owns the notification`,
    }),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], Notification.prototype, "userId", void 0);
__decorate([
    (0, graphql_1.Field)(() => notification_types_enum_1.NotificationTypes, {
        description: `Type ID from the notification`,
        nullable: true,
    }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(Object.keys(notification_types_enum_1.NotificationTypes).length / 2),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], Notification.prototype, "typeId", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, {
        description: `Title of the notification`,
        nullable: true,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], Notification.prototype, "title", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, {
        description: `Content of the notification`,
        nullable: true,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], Notification.prototype, "content", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, {
        description: `Link of the notification`,
        nullable: true,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], Notification.prototype, "link", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, {
        nullable: true,
        description: `Creation date of the notification`,
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Date)
], Notification.prototype, "createdDate", void 0);
__decorate([
    (0, graphql_1.Field)(() => Boolean, {
        nullable: true,
        description: `Boolean to know if the user has viewed the notification`,
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], Notification.prototype, "viewed", void 0);
Notification = __decorate([
    (0, graphql_1.ObjectType)()
], Notification);
exports.Notification = Notification;
//# sourceMappingURL=notification.entity.js.map