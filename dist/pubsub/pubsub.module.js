"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PubsubModule = exports.PUB_SUB = void 0;
const common_1 = require("@nestjs/common");
const graphql_redis_subscriptions_1 = require("graphql-redis-subscriptions");
const config_1 = require("@nestjs/config");
exports.PUB_SUB = 'PUB_SUB';
let PubsubModule = class PubsubModule {
};
PubsubModule = __decorate([
    (0, common_1.Module)({
        imports: [config_1.ConfigModule],
        providers: [
            {
                provide: exports.PUB_SUB,
                inject: [config_1.ConfigService],
                useFactory: (configService) => {
                    const pubsub = new graphql_redis_subscriptions_1.RedisPubSub({
                        connection: {
                            host: 'localhost',
                            port: 6379,
                        },
                    });
                    return pubsub;
                },
            },
        ],
        exports: [exports.PUB_SUB],
    })
], PubsubModule);
exports.PubsubModule = PubsubModule;
//# sourceMappingURL=pubsub.module.js.map