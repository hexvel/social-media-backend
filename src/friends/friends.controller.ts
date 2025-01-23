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
} from '@nestjs/common';
import { FriendsService } from './friends.service';
import { JwtGuard } from 'src/auth/guards/jwt.guard';

@UseGuards(JwtGuard)
@Controller()
export class FriendsController {
  constructor(private readonly friendsService: FriendsService) {}

  @Get('friends.get')
  async getFriends(@Req() req) {
    return await this.friendsService.getFriends(req.user.sub.id);
  }

  @Post('friends.add')
  async addFriend(@Body('user_id') friendId: number, @Req() req) {
    return await this.friendsService.addFriend(req.user.sub.id, friendId);
  }

  @Delete('friends.delete')
  async deleteFriend(@Body('user_id') friendId: number, @Req() req) {
    return await this.friendsService.deleteFriend(req.user.sub.id, friendId);
  }
}
