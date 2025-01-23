import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { FriendsService } from 'src/friends/friends.service';

@UseGuards(JwtGuard)
@Controller()
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly friendsService: FriendsService,
  ) {}

  @Get('users.getById')
  async getUser(@Query('id') id: number) {
    return await this.userService.findById(id);
  }

  @Delete('account.delete')
  async deleteAccount(@Req() req) {
    return await this.userService.deleteUser(req.user.sub.id);
  }
}
