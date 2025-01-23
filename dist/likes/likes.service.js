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
exports.LikesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
let LikesService = class LikesService {
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    async addLike(userId, dto) {
        const { post_id: postId } = dto;
        const postWithLike = await this.prismaService.post.findUnique({
            where: { id: postId },
            include: {
                likes: {
                    where: { userId },
                },
            },
        });
        if (!postWithLike) {
            throw new common_1.NotFoundException(`Post with id ${postId} not found`);
        }
        if (postWithLike.likes.length > 0) {
            throw new common_1.ConflictException(`User has already liked the post with id ${postId}`);
        }
        await this.prismaService.like.create({
            data: {
                userId,
                postId,
            },
        });
        return { post_id: postId, user_id: userId };
    }
    async unlikePost(userId, removeLikeDto) {
        const { post_id: postId } = removeLikeDto;
        const like = await this.prismaService.like.findFirst({
            where: { userId, postId },
        });
        if (!like) {
            throw new common_1.NotFoundException(`Like not found for post id ${postId}`);
        }
        await this.prismaService.like.delete({
            where: { id: like.id },
        });
        return { message: 'Object successfully unliked' };
    }
    async isLiked(userId, isLikedDto) {
        const { post_id: postId } = isLikedDto;
        const like = await this.prismaService.like.findFirst({
            where: {
                userId,
                postId,
            },
        });
        return !!like;
    }
    async getLikesList(dto, currentUserId) {
        const { post_id, friends_only = 0, offset = 0, count = 100, extended = 0, } = dto;
        const likesQuery = {
            where: {
                postId: post_id,
                ...(friends_only === 1 && {
                    user: {
                        friends: {
                            some: { id: currentUserId },
                        },
                    },
                }),
            },
            skip: offset,
            take: friends_only === 1 ? Math.min(count, 100) : Math.min(count, 1000),
        };
        if (extended === 1) {
            likesQuery.include = {
                user: {
                    select: {
                        id: true,
                        username: true,
                        firstName: true,
                        lastName: true,
                        bio: true,
                        avatar: true,
                    },
                },
            };
        }
        else {
            likesQuery.select = {
                userId: true,
            };
        }
        const likes = await this.prismaService.like.findMany(likesQuery);
        if (likes.length === 0 &&
            !(await this.prismaService.post.count({ where: { id: post_id } }))) {
            throw new common_1.NotFoundException('Пост не найден');
        }
        if (extended === 1) {
            return likes.map((like) => like.user);
        }
        else {
            return likes.map((like) => like.userId);
        }
    }
};
exports.LikesService = LikesService;
exports.LikesService = LikesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], LikesService);
//# sourceMappingURL=likes.service.js.map