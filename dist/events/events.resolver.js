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
exports.EventsResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const events_service_1 = require("./events.service");
const event_entity_1 = require("./entities/event.entity");
const create_event_input_1 = require("./dto/create-event.input");
const artwork_entity_1 = require("../artworks/entities/artwork.entity");
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const jwt_decorator_1 = require("../auth/decorators/jwt.decorator");
let EventsResolver = class EventsResolver {
    constructor(eventsService) {
        this.eventsService = eventsService;
    }
    createEvent(jwt, createEventInput) {
        return this.eventsService.create(jwt.userId, createEventInput);
    }
    getArtworkRecommendations(jwt, numberOfRecommendations) {
        return this.eventsService.getArtworkRecommendations(jwt.userId, numberOfRecommendations);
    }
};
__decorate([
    (0, graphql_1.Mutation)(() => event_entity_1.Event),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, jwt_decorator_1.Jwt)()),
    __param(1, (0, graphql_1.Args)('createEventInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_event_input_1.CreateEventInput]),
    __metadata("design:returntype", void 0)
], EventsResolver.prototype, "createEvent", null);
__decorate([
    (0, graphql_1.Query)(() => [artwork_entity_1.Artwork]),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, jwt_decorator_1.Jwt)()),
    __param(1, (0, graphql_1.Args)('numberOfRecommendations', { type: () => graphql_1.Int, nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", void 0)
], EventsResolver.prototype, "getArtworkRecommendations", null);
EventsResolver = __decorate([
    (0, graphql_1.Resolver)(() => event_entity_1.Event),
    __metadata("design:paramtypes", [events_service_1.EventsService])
], EventsResolver);
exports.EventsResolver = EventsResolver;
//# sourceMappingURL=events.resolver.js.map