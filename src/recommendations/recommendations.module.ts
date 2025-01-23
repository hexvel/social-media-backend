import { Module } from '@nestjs/common';
import { RecommendationsService } from './recommendations.service';
import { RecommendationsController } from './recommendations.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [RecommendationsController],
  providers: [RecommendationsService, PrismaService, JwtGuard, JwtService],
})
export class RecommendationsModule {}
