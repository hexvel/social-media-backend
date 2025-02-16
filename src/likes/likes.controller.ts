import { Body, Controller, Delete, Post, Req, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { AddLikeDto } from './dto/add-like.dto';
import { GetLikesListDto } from './dto/get-likes-list.dto';
import { IsLikedDto } from './dto/is-liked.dto';
import { RemoveLikeDto } from './dto/remove-like.dto';
import { LikesService } from './likes.service';

@UseGuards(JwtGuard)
@Controller('likes')
export class LikesController {
  constructor(private readonly likesService: LikesService) {}

  @Post('/add')
  async likePost(@Body() addLikeDto: AddLikeDto, @Req() req) {
    const userId = req.user.sub.id;
    return this.likesService.addLike(userId, addLikeDto);
  }

  @Delete('/remove')
  async unlikePost(@Body() removeLikeDto: RemoveLikeDto, @Req() req) {
    const userId = req.user.sub.id;
    return this.likesService.unlikePost(userId, removeLikeDto);
  }

  @Post('/isLiked')
  async isLiked(@Body() isLikedDto: IsLikedDto, @Req() req) {
    const userId = isLikedDto.user_id || req.user.sub.id;
    return this.likesService.isLiked(userId, isLikedDto);
  }

  @Post('/get')
  async getLikesList(@Body() dto: GetLikesListDto, @Req() req) {
    const currentUserId = req.user.sub.id;
    return await this.likesService.getLikesList(dto, currentUserId);
  }
}
