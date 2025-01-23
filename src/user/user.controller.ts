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
import { UserInterestsService } from 'src/user-interests/user-interests.service';

@UseGuards(JwtGuard)
@Controller()
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly userInterestsService: UserInterestsService,
  ) {}

  @Get('users.getById')
  async getUser(@Query('id') id: number) {
    return await this.userService.findById(id);
  }

  @Delete('account.delete')
  async deleteAccount(@Req() req) {
    return await this.userService.deleteUser(req.user.sub.id);
  }

  @Post('users.updateInterest')
  async addInterests(@Body('interests') interests: string[], @Req() req) {
    return await this.userInterestsService.addInterests(
      req.user.sub.id,
      interests,
    );
  }
}
