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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
const bcrypt = require("bcrypt");
const s3_service_1 = require("../s3.service");
const notifications_service_1 = require("../notifications/notifications.service");
let UsersService = class UsersService {
    constructor(prisma, s3Service, notificationsService) {
        this.prisma = prisma;
        this.s3Service = s3Service;
        this.notificationsService = notificationsService;
    }
    async create(createUserInput) {
        try {
            const photo = createUserInput.photo;
            delete createUserInput.photo;
            createUserInput.createdDate = new Date();
            createUserInput.pass = bcrypt.hashSync(createUserInput.pass, 10);
            const user = await this.prisma.users.create({
                data: createUserInput,
            });
            if (user && photo) {
                const photoUrl = await this.s3Service.uploadPhoto(photo, `lienzo_urbano_user_${user.id}`);
                if (photoUrl) {
                    await this.prisma.users.update({
                        where: { id: user.id },
                        data: {
                            photoUrl,
                        },
                    });
                    user.photoUrl = photoUrl;
                }
            }
            return user;
        }
        catch (error) {
            if (error.code === 'P2002') {
                const target = error.meta.target;
                throw new common_1.BadRequestException(`Duplicated value in ${target}`);
            }
            throw new common_1.BadRequestException();
        }
    }
    async findAll(findUsersInput) {
        if (!findUsersInput)
            findUsersInput = { isDeleted: false };
        return this.prisma.users.findMany({
            where: findUsersInput,
        });
    }
    async findOne(id) {
        return this.prisma.users.findUnique({ where: { id } });
    }
    async update(id, updateUserInput) {
        return this.prisma.users.update({
            data: updateUserInput,
            where: { id },
        });
    }
    async remove(id) {
        return this.prisma.users.delete({ where: { id } });
    }
    async rate(qualifierId, userId, rating) {
        const ratingRecord = await this.prisma.usersRatings.findFirst({
            where: { qualifierId, userId },
        });
        if (ratingRecord && ratingRecord.id) {
            return this.prisma.usersRatings.update({
                data: { rating },
                where: {
                    id: ratingRecord.id,
                },
            });
        }
        else {
            const qualifier = await this.prisma.users.findUnique({
                where: { id: qualifierId },
            });
            await this.notificationsService.create({
                userId,
                title: 'Alguien ha puntuado tu perfil',
                content: `${qualifier.firstName} ${qualifier.lastName} te ha puesto una calificación de ${rating}`,
            });
            return this.prisma.usersRatings.create({
                data: {
                    userId,
                    qualifierId,
                    rating,
                },
            });
        }
    }
    async rating(user) {
        const ratings = await this.prisma.usersRatings.findMany({
            where: { userId: user.id },
        });
        if ((ratings === null || ratings === void 0 ? void 0 : ratings.length) === 0)
            return 0;
        const arr = ratings.map((r) => r.rating);
        const avg = arr.reduce((a, b) => a + b, 0) / arr.length;
        return avg;
    }
    async followUnfollow(followerId, userId) {
        const followRecord = await this.prisma.followers.findFirst({
            where: { followerId, userId },
        });
        if (followRecord) {
            return this.prisma.followers.delete({
                where: { id: followRecord.id },
            });
        }
        else {
            const follower = await this.prisma.users.findUnique({
                where: { id: followerId },
            });
            await this.notificationsService.create({
                userId,
                title: 'Alguien te ha empezado a seguir',
                content: `${follower.firstName} ${follower.lastName} ahora es tu seguidor`,
            });
            return this.prisma.followers.create({
                data: {
                    createdDate: new Date(),
                    followerId,
                    userId,
                },
            });
        }
    }
    async followers(user) {
        const result = await this.prisma.followers.findMany({
            where: { userId: user.id },
            include: { users: true },
        });
        const followers = result.map((f) => (Object.assign(Object.assign({}, f), { follower: f.users })));
        return followers;
    }
    async followersCount(user) {
        return this.prisma.followers.count({
            where: { userId: user.id },
        });
    }
    async collections(user) {
        return this.prisma.collections.findMany({
            where: { userId: user.id },
        });
    }
};
UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        s3_service_1.S3Service,
        notifications_service_1.NotificationsService])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map