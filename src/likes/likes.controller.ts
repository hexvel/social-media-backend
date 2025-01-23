import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  Query,
} from '@nestjs/common';
import { LikesService } from './likes.service';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { AddLikeDto } from './dto/add-like.dto';
import { RemoveLikeDto } from './dto/remove-like.dto';
import { IsLikedDto } from './dto/is-liked.dto';
import { GetLikesListDto } from './dto/get-likes-list.dto';

@UseGuards(JwtGuard)
@Controller()
export class LikesController {
  constructor(private readonly likesService: LikesService) {}

  @Post('likes.add')
  async likePost(@Body() addLikeDto: AddLikeDto, @Req() req) {
    const userId = req.user.sub.id;
    return this.likesService.addLike(userId, addLikeDto);
  }

  @Delete('likes.remove')
  async unlikePost(@Body() removeLikeDto: RemoveLikeDto, @Req() req) {
    const userId = req.user.sub.id;
    return this.likesService.unlikePost(userId, removeLikeDto);
  }

  @Post('likes.isLiked')
  async isLiked(@Body() isLikedDto: IsLikedDto, @Req() req) {
    const userId = isLikedDto.user_id || req.user.sub.id;
    return this.likesService.isLiked(userId, isLikedDto);
  }

  @Post('likes.getList')
  async getLikesList(@Body() dto: GetLikesListDto, @Req() req: any) {
    const currentUserId = req.user.id;
    return await this.likesService.getLikesList(dto, currentUserId);
  }
}
