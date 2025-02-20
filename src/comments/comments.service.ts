import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { selectUserData } from 'src/config/queties.config';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCommentDto } from './dto/create-comment.dto';

@Injectable()
export class CommentsService {
  constructor(private readonly prismaService: PrismaService) {}

  async createComment(createCommentDto: CreateCommentDto, authorId: number) {
    const post = await this.prismaService.post.findUnique({
      where: { id: createCommentDto.post_id },
    });

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    const comment = await this.prismaService.postComment.create({
      data: {
        content: createCommentDto.content,
        authorId,
        postId: createCommentDto.post_id,
      },
    });

    return comment;
  }

  async getComments(postId: number) {
    const comments = await this.prismaService.postComment.findMany({
      where: { postId },
      include: {
        author: {
          select: selectUserData,
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    return comments;
  }

  async deleteComment(commentId: number, userId: number) {
    const comment = await this.prismaService.postComment.findUnique({
      where: { id: commentId },
    });

    if (!comment) {
      throw new NotFoundException('Comment not found');
    }

    if (comment.authorId !== userId) {
      throw new ForbiddenException(
        'You are not allowed to delete this comment',
      );
    }

    await this.prismaService.postComment.delete({
      where: { id: commentId },
    });

    return { message: 'Comment deleted successfully' };
  }
}
