import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { selectUserData } from 'src/config/queties.config';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostsService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAllPosts(userId: number, owner?: string) {
    if (owner) {
      const ownerId = +owner;
      return await this.prismaService.post.findMany({
        where: { authorId: ownerId },
        include: {
          photos: true,
          author: { select: selectUserData },
        },
      });
    }

    return await this.prismaService.post.findMany({
      where: { authorId: userId },
      include: {
        photos: true,
        author: { select: selectUserData },
      },
    });
  }

  async getPostById(id: string) {
    if (!id) {
      throw new BadRequestException('Post id is required');
    }

    return await this.prismaService.post.findUnique({
      where: { id: +id },
      include: { photos: true, author: { select: selectUserData } },
    });
  }

  async createPost(data: CreatePostDto, authorId: number) {
    const { content, tags, photos } = data;

    const post = await this.prismaService.post.create({
      data: {
        content,
        authorId,
        tags: {
          create: [
            ...tags.map((tag) => ({
              tag: {
                connectOrCreate: {
                  where: { name: tag },
                  create: { name: tag },
                },
              },
            })),
          ],
        },
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

    await this.prismaService.like.deleteMany({ where: { postId: id } });
    await this.prismaService.photo.deleteMany({ where: { postId: id } });
    await this.prismaService.postTag.deleteMany({ where: { postId: id } });
    await this.prismaService.post.delete({
      where: { id },
    });
  }
}
