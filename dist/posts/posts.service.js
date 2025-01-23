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
exports.PostsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
let PostsService = class PostsService {
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    async getAllPosts(userId) {
        return await this.prismaService.post.findMany({
            where: { authorId: userId },
            include: {
                photos: true,
                author: {
                    select: { id: true, username: true, firstName: true, lastName: true },
                },
            },
        });
    }
    async createPost(data) {
        const { content, authorId, photos } = data;
        const post = await this.prismaService.post.create({
            data: {
                content,
                authorId,
            },
        });
        if (photos.length > 0) {
            await this.prismaService.photo.createMany({
                data: photos.map((url) => ({
                    url,
                    postId: post.id,
                })),
            });
        }
        return this.prismaService.post.findUnique({
            where: { id: post.id },
            include: { photos: true },
        });
    }
    async updatePost(dto, authorId) {
        const post = await this.prismaService.post.findUnique({
            where: { id: dto.id },
        });
        if (!post) {
            throw new common_1.NotFoundException('Post not found');
        }
        if (post.authorId !== authorId) {
            throw new common_1.ForbiddenException('You can only update your own posts');
        }
        return this.prismaService.post.update({
            where: { id: dto.id },
            data: { ...dto },
        });
    }
    async deletePost(id, authorId) {
        const post = await this.prismaService.post.findUnique({ where: { id } });
        if (!post) {
            throw new common_1.NotFoundException('Post not found');
        }
        if (post.authorId !== authorId) {
            throw new common_1.ForbiddenException('You can only delete your own posts');
        }
        await this.prismaService.post.delete({ where: { id } });
    }
};
exports.PostsService = PostsService;
exports.PostsService = PostsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PostsService);
//# sourceMappingURL=posts.service.js.map