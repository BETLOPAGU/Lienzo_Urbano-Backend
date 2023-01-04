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
exports.Event = void 0;
const graphql_1 = require("@nestjs/graphql");
const class_validator_1 = require("class-validator");
const event_types_enum_1 = require("../enums/event-types.enum");
let Event = class Event {
};
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, { description: `ID from the event` }),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], Event.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, { description: `ID from the user` }),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], Event.prototype, "userId", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, { description: `ID from the artwork` }),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], Event.prototype, "artworkId", void 0);
__decorate([
    (0, graphql_1.Field)(() => event_types_enum_1.EventTypes, {
        description: `Type ID from the event`,
    }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(Object.keys(event_types_enum_1.EventTypes).length / 2),
    __metadata("design:type", Number)
], Event.prototype, "typeId", void 0);
__decorate([
    (0, graphql_1.Field)(() => Date, {
        nullable: true,
        description: `Creation date of the record`,
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Date)
], Event.prototype, "createdDate", void 0);
Event = __decorate([
    (0, graphql_1.InputType)('EventInput'),
    (0, graphql_1.ObjectType)()
], Event);
exports.Event = Event;
//# sourceMappingURL=event.entity.js.map