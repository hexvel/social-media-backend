import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AccountService {
  constructor(private readonly prismaService: PrismaService) {}

  async deleteUser(id: number) {
    return await this.prismaService.user.delete({ where: { id } });
  }
}
