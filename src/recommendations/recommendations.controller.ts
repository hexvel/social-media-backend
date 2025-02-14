import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { RecommendationsService } from './recommendations.service';

@UseGuards(JwtGuard)
@Controller('recommendations')
export class RecommendationsController {
  constructor(
    private readonly recommendationsService: RecommendationsService,
  ) {}

  @Get('/getPosts')
  async getRecommendedPosts(@Req() req) {
    return this.recommendationsService.recommendPosts(req.user.sub.id);
  }

  @Get('/getUsers')
  async getRecommendedUsers(@Req() req) {
    return this.recommendationsService.recommendUsers(req.user.sub.id);
  }
}
