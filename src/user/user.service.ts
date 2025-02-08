import {
  ConflictException,
  HttpException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { hash } from 'bcrypt';
import { selectUserData } from 'src/config/queties.config';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserType } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(readonly prismaService: PrismaService) {}

  async register(dto: CreateUserDto) {
    const { username, ...rest } = dto;

    const existingUser = await this.prismaService.user.findUnique({
      where: { email: dto.email },
    });

    if (existingUser) {
      throw new ConflictException('Email already exists');
    }

    const user = await this.prismaService.user.create({
      data: {
        ...rest,
        password: await hash(dto.password, 10),
        username: username || null,
      },
    });

    if (!username) {
      const updatedUser = await this.prismaService.user.update({
        where: { id: user.id },
        data: {
          username: `id${user.id}`,
        },
      });

      return updatedUser;
    }

    return user;
  }

  async get(userId: number, owner: string) {
    let user: UserType | null = null;

    if (!owner) {
      user = await this.prismaService.user.findUnique({
        where: { id: userId },
        select: selectUserData,
      });
    } else {
      const isNumeric = /^\d+$/.test(owner);

      user = await this.prismaService.user.findUnique({
        where: isNumeric ? { id: +owner } : { username: owner },
        select: selectUserData,
      });
    }

    if (user) return user;
    throw new NotFoundException('User not found');
  }

  async getUsers() {
    return this.prismaService.user.findMany({
      select: selectUserData,
    });
  }

  async updateUser(id: number, dto: UpdateUserDto) {
    const user = await this.prismaService.user.findUnique({
      where: { id },
    });

    if (!user) throw new NotFoundException('User not found');

    const newUser = await this.prismaService.user.update({
      where: { id },
      data: {
        ...dto,
      },
    });

    const { password, ...rest } = newUser;
    return rest;
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.prismaService.user.findUnique({
      where: { email },
    });

    if (!user) throw new NotFoundException('User not found');

    return user;
  }

  async findById(id: number) {
    if (!id) throw new HttpException('Invalid user id', 400);

    const user = await this.prismaService.user.findUnique({
      where: { id },
      select: selectUserData,
    });

    if (!user) throw new HttpException('User not found', 404);

    return user;
  }

  async deleteUser(id: number) {
    if (!id) throw new HttpException('Invalid user id', 400);

    const user = await this.prismaService.user.findUnique({
      where: { id },
    });

    if (!user) throw new HttpException('User not found', 404);

    await this.prismaService.user.delete({
      where: { id },
    });

    return { message: 'User deleted successfully' };
  }
}
