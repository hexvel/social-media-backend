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
exports.FriendsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
let FriendsService = class FriendsService {
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    async getFriends(id) {
        const userWithFriends = await this.prismaService.user.findUnique({
            where: { id },
            select: {
                friends: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                    },
                },
            },
        });
        return userWithFriends.friends;
    }
    async addFriend(userId, friendId) {
        const user = await this.prismaService.user.findUnique({
            where: { id: userId },
            include: { friends: { where: { id: friendId } } },
        });
        if (user.friends.length > 0) {
            throw new common_1.BadRequestException('User already has friends');
        }
        const updatedUser = await this.prismaService.user.update({
            where: { id: userId },
            data: {
                friends: {
                    connect: { id: friendId },
                },
            },
            include: { friends: true },
        });
        return updatedUser.friends;
    }
    async deleteFriend(userId, friendId) {
        const user = await this.prismaService.user.findUnique({
            where: { id: userId },
            include: { friends: { where: { id: friendId } } },
        });
        if (user.friends.length === 0) {
            throw new common_1.NotFoundException('Friend not found');
        }
        const updatedUser = await this.prismaService.user.update({
            where: { id: userId },
            data: {
                friends: {
                    disconnect: { id: friendId },
                },
            },
            include: { friends: true },
        });
        return updatedUser.friends;
    }
};
exports.FriendsService = FriendsService;
exports.FriendsService = FriendsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], FriendsService);
//# sourceMappingURL=friends.service.js.map