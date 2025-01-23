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
exports.LikesController = void 0;
const common_1 = require("@nestjs/common");
const likes_service_1 = require("./likes.service");
const jwt_guard_1 = require("../auth/guards/jwt.guard");
const add_like_dto_1 = require("./dto/add-like.dto");
const remove_like_dto_1 = require("./dto/remove-like.dto");
const is_liked_dto_1 = require("./dto/is-liked.dto");
const get_likes_list_dto_1 = require("./dto/get-likes-list.dto");
let LikesController = class LikesController {
    constructor(likesService) {
        this.likesService = likesService;
    }
    async likePost(addLikeDto, req) {
        const userId = req.user.sub.id;
        return this.likesService.addLike(userId, addLikeDto);
    }
    async unlikePost(removeLikeDto, req) {
        const userId = req.user.sub.id;
        return this.likesService.unlikePost(userId, removeLikeDto);
    }
    async isLiked(isLikedDto, req) {
        const userId = isLikedDto.user_id || req.user.sub.id;
        return this.likesService.isLiked(userId, isLikedDto);
    }
    async getLikesList(dto, req) {
        const currentUserId = req.user.id;
        return await this.likesService.getLikesList(dto, currentUserId);
    }
};
exports.LikesController = LikesController;
__decorate([
    (0, common_1.Post)('likes.add'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [add_like_dto_1.AddLikeDto, Object]),
    __metadata("design:returntype", Promise)
], LikesController.prototype, "likePost", null);
__decorate([
    (0, common_1.Delete)('likes.remove'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [remove_like_dto_1.RemoveLikeDto, Object]),
    __metadata("design:returntype", Promise)
], LikesController.prototype, "unlikePost", null);
__decorate([
    (0, common_1.Post)('likes.isLiked'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [is_liked_dto_1.IsLikedDto, Object]),
    __metadata("design:returntype", Promise)
], LikesController.prototype, "isLiked", null);
__decorate([
    (0, common_1.Post)('likes.getList'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_likes_list_dto_1.GetLikesListDto, Object]),
    __metadata("design:returntype", Promise)
], LikesController.prototype, "getLikesList", null);
exports.LikesController = LikesController = __decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [likes_service_1.LikesService])
], LikesController);
//# sourceMappingURL=likes.controller.js.map