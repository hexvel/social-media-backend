import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { FriendsService } from './friends.service';

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

  @Get('friends.getFollowers')
  async getFollowers(@Req() req) {
    return this.friendsService.getFollowers(req.user.sub.id);
  }

  @Get('friends.getFollowing')
  async getFollowing(@Req() req) {
    return this.friendsService.getFollowing(req.user.sub.id);
  }

  @Get('friends.getStats')
  async getStats(@Req() req) {
    return this.friendsService.getStats(req.user.sub.id);
  }
}
