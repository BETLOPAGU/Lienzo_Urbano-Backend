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
exports.CommentsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
let CommentsService = class CommentsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(commentatorId, createCommentInput) {
        const { userId, artworkId, commentId } = createCommentInput;
        return this.prisma.comments.create({
            data: Object.assign(Object.assign(Object.assign({ createdDate: new Date(), commentatorId, comment: createCommentInput.comment }, (userId ? { userId } : {})), (artworkId ? { artworkId } : {})), (commentId ? { commentId } : {})),
        });
    }
    async findAll(payload) {
        const { userId, artworkId, commentId } = payload;
        return this.prisma.comments.findMany({
            where: Object.assign(Object.assign(Object.assign({}, (userId ? { userId } : {})), (artworkId ? { artworkId } : {})), (commentId ? { commentId } : {})),
        });
    }
    async update(id, comment) {
        return this.prisma.comments.update({ where: { id }, data: { comment } });
    }
    async remove(id) {
        return this.prisma.comments.delete({ where: { id } });
    }
};
CommentsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CommentsService);
exports.CommentsService = CommentsService;
//# sourceMappingURL=comments.service.js.map