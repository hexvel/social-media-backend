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
@Controller('friends')
export class FriendsController {
  constructor(private readonly friendsService: FriendsService) {}

  @Get('/get')
  async getFriends(@Req() req) {
    return await this.friendsService.getFriends(req.user.sub.id);
  }

  @Post('/add')
  async addFriend(@Body('user_id') friendId: number, @Req() req) {
    return await this.friendsService.addFriend(req.user.sub.id, friendId);
  }

  @Delete('/delete')
  async deleteFriend(@Body('user_id') friendId: number, @Req() req) {
    return await this.friendsService.deleteFriend(req.user.sub.id, friendId);
  }

  @Get('/getFollowers')
  async getFollowers(@Req() req) {
    return this.friendsService.getFollowers(req.user.sub.id);
  }

  @Get('/getFollowing')
  async getFollowing(@Req() req) {
    return this.friendsService.getFollowing(req.user.sub.id);
  }

  @Get('/getStats')
  async getStats(@Req() req) {
    return this.friendsService.getStats(req.user.sub.id);
  }
}
