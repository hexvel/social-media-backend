import {
  Injectable,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostsService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAllPosts(userId: number) {
    return await this.prismaService.post.findMany({
      where: { authorId: userId },
      include: {
        photos: true,
        author: {
          select: { id: true, username: true, firstName: true, lastName: true },
        },
      },
    });
  }

  async createPost(data: {
    content: string;
    authorId: number;
    photos?: string[];
  }) {
    const { content, authorId, photos } = data;

    const post = await this.prismaService.post.create({
      data: {
        content,
        authorId,
      },
    });

    if (photos.length > 0) {
      await this.prismaService.photo.createMany({
        data: photos.map((url) => ({
          url,
          postId: post.id,
        })),
      });
    }

    return this.prismaService.post.findUnique({
      where: { id: post.id },
      include: { photos: true },
    });
  }

  async updatePost(dto: UpdatePostDto, authorId: number) {
    const post = await this.prismaService.post.findUnique({
      where: { id: dto.id },
    });

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    if (post.authorId !== authorId) {
      throw new ForbiddenException('You can only update your own posts');
    }

    return this.prismaService.post.update({
      where: { id: dto.id },
      data: { ...dto },
    });
  }

  async deletePost(id: number, authorId: number) {
    const post = await this.prismaService.post.findUnique({ where: { id } });

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    if (post.authorId !== authorId) {
      throw new ForbiddenException('You can only delete your own posts');
    }

    await this.prismaService.post.delete({ where: { id } });
  }
}
