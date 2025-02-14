import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { UserInterestsService } from 'src/user-interests/user-interests.service';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly userInterestsService: UserInterestsService,
  ) {}

  @UseGuards(JwtGuard)
  @Get('/get')
  async getUser(@Query('owner') owner: string, @Req() req) {
    return await this.userService.get(req.user.sub.id, owner);
  }

  @Get('/activate/:activationLink')
  async activateUser(
    @Param('activationLink') activationLink: string,
    @Res() res: Response,
  ) {
    return await this.userService.activateUser(res, activationLink);
  }

  @UseGuards(JwtGuard)
  @Get('/me')
  async getMe(@Req() req) {
    return await this.userService.get(req.user.sub.id, req.user.sub.id);
  }

  @UseGuards(JwtGuard)
  @Post('/updateInterests')
  async addInterests(@Req() req, @Body('interests') interests: string[]) {
    return await this.userInterestsService.addInterests(
      req.user.sub.id,
      interests,
    );
  }
}
