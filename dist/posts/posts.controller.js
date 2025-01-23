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
exports.PostsController = void 0;
const common_1 = require("@nestjs/common");
const posts_service_1 = require("./posts.service");
const jwt_guard_1 = require("../auth/guards/jwt.guard");
const create_post_dto_1 = require("./dto/create-post.dto");
const update_post_dto_1 = require("./dto/update-post.dto");
const delete_post_dto_1 = require("./dto/delete-post.dto");
const multer_config_1 = require("../config/multer-config");
const platform_express_1 = require("@nestjs/platform-express");
let PostsController = class PostsController {
    constructor(postsService) {
        this.postsService = postsService;
    }
    async getAllPosts(req) {
        const authorId = req.user.sub.id;
        return await this.postsService.getAllPosts(authorId);
    }
    async createPost(createPostDto, req, files) {
        const authorId = req.user.sub.id;
        const photoUrls = files?.photos?.map((file) => file.path) || [];
        const post = await this.postsService.createPost({
            ...createPostDto,
            authorId,
            photos: photoUrls,
        });
        return { message: 'Post created successfully', post };
    }
    async updatePost(updatePostDto, req) {
        const authorId = req.user.sub.id;
        const post = await this.postsService.updatePost(updatePostDto, authorId);
        return { message: 'Post updated successfully', post };
    }
    async deletePost(deletePostDto, req) {
        const authorId = req.user.sub.id;
        await this.postsService.deletePost(deletePostDto.id, authorId);
        return { message: 'Post deleted successfully' };
    }
};
exports.PostsController = PostsController;
__decorate([
    (0, common_1.Get)('posts.get'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PostsController.prototype, "getAllPosts", null);
__decorate([
    (0, common_1.Post)('posts.create'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileFieldsInterceptor)([{ name: 'photos', maxCount: 4 }], multer_config_1.multerConfig)),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_post_dto_1.CreatePostDto, Object, Object]),
    __metadata("design:returntype", Promise)
], PostsController.prototype, "createPost", null);
__decorate([
    (0, common_1.Put)('posts.update'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_post_dto_1.UpdatePostDto, Object]),
    __metadata("design:returntype", Promise)
], PostsController.prototype, "updatePost", null);
__decorate([
    (0, common_1.Delete)('posts.delete'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [delete_post_dto_1.DeletePostDto, Object]),
    __metadata("design:returntype", Promise)
], PostsController.prototype, "deletePost", null);
exports.PostsController = PostsController = __decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [posts_service_1.PostsService])
], PostsController);
//# sourceMappingURL=posts.controller.js.map