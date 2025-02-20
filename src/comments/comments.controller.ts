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
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';

@UseGuards(JwtGuard)
@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post('/create')
  async createComment(@Body() createCommentDto: CreateCommentDto, @Req() req) {
    const userId = req.user.sub.id;
    return this.commentsService.createComment(createCommentDto, userId);
  }

  @Get('/get')
  async getComments(@Query('post_id') post_id: string) {
    return this.commentsService.getComments(parseInt(post_id));
  }

  @Delete('/delete/:id')
  async deleteComment(@Param('id') id: string, @Req() req) {
    const userId = req.user.sub.id;
    return this.commentsService.deleteComment(parseInt(id), userId);
  }
}
