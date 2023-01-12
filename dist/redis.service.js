"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisService = void 0;
const common_1 = require("@nestjs/common");
const redis_1 = require("redis");
let RedisService = class RedisService {
    async storeArtworkGeolocation(data) {
        const client = (0, redis_1.createClient)();
        client.on('error', (err) => console.log('Redis Client Error', err));
        await client.connect();
        await client.geoAdd('artwork-locations', {
            longitude: data.longitude,
            latitude: data.latitude,
            member: data.artworkId + '',
        });
        await client.disconnect();
    }
    async getArtworksOnRadius(data) {
        const client = (0, redis_1.createClient)();
        client.on('error', (err) => console.log('Redis Client Error', err));
        await client.connect();
        const artworksRadius = await client.geoRadius('artwork-locations', {
            longitude: data.longitude,
            latitude: data.latitude,
        }, data.radius, 'm');
        await client.disconnect();
        return artworksRadius.map((a) => Number(a));
    }
    async deleteArtworkGeolocations() {
        const client = (0, redis_1.createClient)();
        client.on('error', (err) => console.log('Redis Client Error', err));
        await client.connect();
        await client.del('artwork-locations');
        await client.disconnect();
    }
};
RedisService = __decorate([
    (0, common_1.Injectable)()
], RedisService);
exports.RedisService = RedisService;
//# sourceMappingURL=redis.service.js.map