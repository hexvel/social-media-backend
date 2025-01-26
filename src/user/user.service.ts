import {
  ConflictException,
  HttpException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { hash } from 'bcrypt';
import { selectUserData } from 'src/config/queties.config';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(readonly prismaService: PrismaService) {}

  async register(dto: CreateUserDto) {
    const user = await this.prismaService.user.findUnique({
      where: {
        email: dto.email,
      },
    });

    if (user && user.username === dto.username) {
      throw new ConflictException('User already exists');
    }

    const newUser = await this.prismaService.user.create({
      data: {
        ...dto,
        password: await hash(dto.password, 10),
      },
    });

    const { password, ...rest } = newUser;
    return rest;
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

  async findByUsername(username: string) {
    return this.prismaService.user.findUnique({
      where: { username },
    });
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
