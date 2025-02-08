import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UserInterestsService } from 'src/user-interests/user-interests.service';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { UserService } from './user.service';

@UseGuards(JwtGuard)
@Controller()
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly userInterestsService: UserInterestsService,
  ) {}

  @Get('users.get')
  async getUser(@Query('owner') owner: string, @Req() req) {
    return await this.userService.get(req.user.sub.id, owner);
  }

  @Get('users.me')
  async getMe(@Req() req) {
    return await this.userService.get(req.user.sub.id, req.user.sub.id);
  }

  @Post('users.updateInterest')
  async addInterests(@Req() req, @Body('interests') interests: string[]) {
    return await this.userInterestsService.addInterests(
      req.user.sub.id,
      interests,
    );
  }
}
