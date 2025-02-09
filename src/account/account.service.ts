import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { ApiResponse } from '../types/common.types';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class AccountService {
  constructor(private readonly prismaService: PrismaService) {}

  async deleteUser(id: number): Promise<ApiResponse<User>> {
    try {
      const user = await this.prismaService.user.delete({
        where: { id },
      });

      return {
        data: user,
        statusCode: 200,
        message: 'User successfully deleted',
      };
    } catch (error) {
      throw new NotFoundException('User not found');
    }
  }

  async updateUser(id: number, dto: UpdateUserDto): Promise<ApiResponse<User>> {
    const existingUser = await this.prismaService.user.findUnique({
      where: { id },
    });

    if (!existingUser) {
      throw new NotFoundException('User not found');
    }

    const updatedUser = await this.prismaService.user.update({
      where: { id },
      data: dto,
    });

    return {
      data: updatedUser,
      statusCode: 200,
      message: 'User data updated',
    };
  }
}
