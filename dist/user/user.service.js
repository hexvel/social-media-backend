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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
const bcrypt_1 = require("bcrypt");
let UserService = class UserService {
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    async register(dto) {
        const user = await this.prismaService.user.findUnique({
            where: { username: dto.username },
        });
        if (user)
            throw new common_1.ConflictException('User already exists');
        const newUser = await this.prismaService.user.create({
            data: {
                ...dto,
                password: await (0, bcrypt_1.hash)(dto.password, 10),
            },
        });
        const { password, ...rest } = newUser;
        return rest;
    }
    async getUsers() {
        return this.prismaService.user.findMany({
            select: {
                id: true,
                username: true,
                firstName: true,
                lastName: true,
            },
        });
    }
    async findByUsername(username) {
        return this.prismaService.user.findUnique({
            where: { username },
        });
    }
    async findById(id) {
        if (!id)
            throw new common_1.HttpException('Invalid user id', 400);
        const user = await this.prismaService.user.findUnique({
            where: { id },
            select: {
                id: true,
                username: true,
                firstName: true,
                lastName: true,
                bio: true,
                avatar: true,
            },
        });
        if (!user)
            throw new common_1.HttpException('User not found', 404);
        return user;
    }
    async deleteUser(id) {
        if (!id)
            throw new common_1.HttpException('Invalid user id', 400);
        const user = await this.prismaService.user.findUnique({
            where: { id },
        });
        if (!user)
            throw new common_1.HttpException('User not found', 404);
        await this.prismaService.user.delete({
            where: { id },
        });
        return { message: 'User deleted successfully' };
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UserService);
//# sourceMappingURL=user.service.js.map