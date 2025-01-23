import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { NotFoundError } from 'rxjs';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class FriendsService {
  constructor(private readonly prismaService: PrismaService) {}

  async getFriends(id: number) {
    const userWithFriends = await this.prismaService.user.findUnique({
      where: { id },
      select: {
        friends: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
          },
        },
      },
    });

    return userWithFriends.friends;
  }

  async addFriend(userId: number, friendId: number) {
    const user = await this.prismaService.user.findUnique({
      where: { id: userId },
      include: { friends: { where: { id: friendId } } },
    });

    if (user.friends.length > 0) {
      throw new BadRequestException('User already has friends');
    }

    const updatedUser = await this.prismaService.user.update({
      where: { id: userId },
      data: {
        friends: {
          connect: { id: friendId },
        },
      },
      include: { friends: true },
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
}
