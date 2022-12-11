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
exports.User = void 0;
const graphql_1 = require("@nestjs/graphql");
const class_validator_1 = require("class-validator");
const user_types_enum_1 = require("../enums/user-types.enum");
let User = class User {
};
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, { description: `ID from the user` }),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], User.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(() => user_types_enum_1.UserTypes, {
        description: `Type ID from the user`,
    }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(Object.keys(user_types_enum_1.UserTypes).length / 2),
    __metadata("design:type", Number)
], User.prototype, "typeId", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { description: `First name from the user` }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], User.prototype, "firstName", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { description: `Last name from the user` }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], User.prototype, "lastName", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { description: `Email address from the user` }),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { description: `Auth password from the user` }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], User.prototype, "pass", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, {
        nullable: true,
        description: `Phone number from the user`,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], User.prototype, "phone", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, {
        nullable: true,
        description: `Gender from the user`,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], User.prototype, "gender", void 0);
__decorate([
    (0, graphql_1.Field)(() => Date, {
        nullable: true,
        description: `Birthdate of the user`,
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Date)
], User.prototype, "birthdate", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, {
        nullable: true,
        description: `Home address from the user`,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], User.prototype, "address", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, {
        nullable: true,
        description: `Contact information from the user`,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], User.prototype, "contact", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, {
        nullable: true,
        description: `URL from the AWS S3 where is stored the user photo`,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], User.prototype, "photoUrl", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, {
        nullable: true,
        description: `Google UID for auth`,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], User.prototype, "googleUid", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, {
        nullable: true,
        description: `Facebook UID for auth`,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], User.prototype, "facebookUid", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, {
        nullable: true,
        description: `Firebase token`,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], User.prototype, "firebaseToken", void 0);
__decorate([
    (0, graphql_1.Field)(() => Date, {
        nullable: true,
        description: `Registration date of the user`,
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Date)
], User.prototype, "createdDate", void 0);
__decorate([
    (0, graphql_1.Field)(() => Date, {
        nullable: true,
        description: `Date of deletion of the user`,
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Date)
], User.prototype, "deletedDate", void 0);
__decorate([
    (0, graphql_1.Field)(() => Boolean, {
        nullable: true,
        description: `Boolean to know if the user is soft deleted`,
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], User.prototype, "isDeleted", void 0);
User = __decorate([
    (0, graphql_1.InputType)('UserType'),
    (0, graphql_1.ObjectType)()
], User);
exports.User = User;
//# sourceMappingURL=user.entity.js.map