import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { selectUserData } from 'src/config/queties.config';
import { PrismaService } from 'src/prisma/prisma.service';
import { LikeResponseItemsType, LikesQueryWhere } from 'src/types/like.types';
import { UserDataType } from 'src/types/user.types';
import { AddLikeDto } from './dto/add-like.dto';
import { GetLikesListDto } from './dto/get-likes-list.dto';
import { IsLikedDto } from './dto/is-liked.dto';
import { RemoveLikeDto } from './dto/remove-like.dto';

@Injectable()
export class LikesService {
  constructor(private readonly prismaService: PrismaService) {}

  async addLike(userId: number, dto: AddLikeDto) {
    const { post_id: postId } = dto;

    const postWithLike = await this.prismaService.post.findUnique({
      where: { id: postId },
      include: {
        likes: {
          where: { userId },
        },
      },
    });

    if (!postWithLike) {
      throw new NotFoundException(`Post with id ${postId} not found`);
    }

    if (postWithLike.likes.length > 0) {
      throw new ConflictException(
        `User has already liked the post with id ${postId}`,
      );
    }

    await this.prismaService.like.create({
      data: {
        userId,
        postId,
      },
    });

    return { post_id: postId, user_id: userId };
  }

  async unlikePost(userId: number, removeLikeDto: RemoveLikeDto) {
    const { post_id: postId } = removeLikeDto;

    const like = await this.prismaService.like.findFirst({
      where: { userId, postId },
    });

    if (!like) {
      throw new NotFoundException(`Like not found for post id ${postId}`);
    }

    await this.prismaService.like.delete({
      where: { id: like.id },
    });

    return { message: 'Object successfully unliked' };
  }

  async isLiked(userId: number, isLikedDto: IsLikedDto) {
    const { post_id: postId } = isLikedDto;

    const like = await this.prismaService.like.findFirst({
      where: {
        userId,
        postId,
      },
    });
    return !!like;
  }

  async getLikesList(dto: GetLikesListDto, currentUserId: number) {
    const {
      post_id,
      friends_only = 0,
      offset = 0,
      count = 100,
      extended = 0,
    } = dto;

    const where: LikesQueryWhere = {
      postId: post_id,
      ...(friends_only === 1 && {
        user: {
          friends: {
            some: { id: currentUserId },
          },
        },
      }),
    };

    const take =
      friends_only === 1 ? Math.min(count, 100) : Math.min(count, 1000);

    const likes = await this.prismaService.like.findMany({
      where,
      skip: offset,
      take,
      ...(extended === 1
        ? {
            select: {
              user: {
                select: selectUserData,
              },
            },
          }
        : {
            select: {
              userId: true,
            },
          }),
      select: {
        user: {
          select: selectUserData,
        },
      },
    });

    if (
      likes.length === 0 &&
      !(await this.prismaService.post.count({ where: { id: post_id } }))
    ) {
      throw new NotFoundException('Post not found');
    }

    const totalLikes = await this.prismaService.like.count({ where });

    const isLiked = await this.isLiked(currentUserId, {
      post_id,
      user_id: currentUserId,
    });

    const response: LikeResponseItemsType<UserDataType> = {
      items:
        extended === 1
          ? likes.map((like) => like.user)
          : likes.map((like) => like.user.id),
      count: totalLikes,
      isLiked,
    };

    return response;
  }

  async getIsLikedByPostId(postIds: number[], userId: number) {
    const like = await this.prismaService.like.findFirst({
      where: { postId: { in: postIds }, userId },
    });

    return !!like;
  }
}
