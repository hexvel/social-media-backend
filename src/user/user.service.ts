import { ConflictException, Injectable } from '@nestjs/common';
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
        displayName: true,
      },
    });
  }

  async findByUsername(username: string) {
    return this.prismaService.user.findUnique({
      where: { username },
    });
  }
}
