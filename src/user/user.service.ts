import { ConflictException, HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { UserDto } from './dto/user.dto';
import { hash } from 'bcrypt';

@Injectable()
export class UserService {
  constructor(readonly prismaService: PrismaService) {}

  async register(dto: UserDto) {
    const user = await this.prismaService.user.findUnique({
      where: { username: dto.username },
    });

    if (user) throw new ConflictException('User already exists');

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
      select: {
        id: true,
        username: true,
        firstName: true,
        lastName: true,
      },
    });
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
      select: {
        id: true,
        username: true,
        firstName: true,
        lastName: true,
        bio: true,
        avatar: true,
      },
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
