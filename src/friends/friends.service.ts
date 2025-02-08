import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { selectUserData } from 'src/config/queties.config';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FriendsService {
  constructor(private readonly prismaService: PrismaService) {}

  async getFriends(id: number) {
    const userWithFriends = await this.prismaService.user.findUnique({
      where: { id },
      select: {
        friends: {
          select: selectUserData,
        },
      },
    });

    return userWithFriends.friends;
  }

  async addFriend(userId: number, friendId: number) {
    if (userId === friendId) {
      throw new BadRequestException('Cannot add self as a friend');
    }

    const friend = await this.prismaService.user.findUnique({
      where: { id: friendId },
    });

    if (!friend) {
      throw new NotFoundException('Friend not found');
    }

    const user = await this.prismaService.user.findUnique({
      where: { id: userId },
      include: { friends: true },
    });

    if (user.friends.some((f) => f.id === friendId)) {
      throw new BadRequestException('User already has this friend');
    }

    const updatedUser = await this.prismaService.user.update({
      where: { id: userId },
      data: {
        friends: {
          connect: { id: friendId },
        },
      },
      include: {
        friends: {
          select: selectUserData,
        },
      },
    });

    return updatedUser.friends;
  }

  async deleteFriend(userId: number, friendId: number) {
    const user = await this.prismaService.user.findUnique({
      where: { id: userId },
      include: { friends: { where: { id: friendId } } },
    });

    if (user.friends.length === 0) {
      throw new NotFoundException('Friend not found');
    }

    const updatedUser = await this.prismaService.user.update({
      where: { id: userId },
      data: {
        friends: {
          disconnect: { id: friendId },
        },
      },
      include: { friends: true },
    });

    return updatedUser.friends;
  }

  async getFollowers(userId: number) {
    const user = await this.prismaService.user.findUnique({
      where: { id: userId },
      select: {
        friendsOf: {
          select: selectUserData,
        },
      },
    });

    return user.friendsOf;
  }

  async getFollowing(userId: number) {
    const user = await this.prismaService.user.findUnique({
      where: { id: userId },
      select: {
        friends: {
          select: selectUserData,
        },
      },
    });

    return user.friends;
  }
}
