import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PostsService } from 'src/posts/posts.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';

@Module({
  controllers: [CommentsController],
  providers: [CommentsService, PrismaService, JwtService, PostsService],
})
export class CommentsModule {}
