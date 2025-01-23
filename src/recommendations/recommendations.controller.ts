import { Controller, Get, Param, Req, UseGuards } from '@nestjs/common';
import { RecommendationsService } from './recommendations.service';
import { JwtGuard } from 'src/auth/guards/jwt.guard';

@UseGuards(JwtGuard)
@Controller()
export class RecommendationsController {
  constructor(
    private readonly recommendationsService: RecommendationsService,
  ) {}

  @Get('recommendations.getPosts')
  async getRecommendedPosts(@Req() req) {
    return this.recommendationsService.recommendPosts(req.user.sub.id);
  }

  @Get('recommendations.getUsers')
  async getRecommendedUsers(@Req() req) {
    return this.recommendationsService.recommendUsers(req.user.sub.id);
  }
}
