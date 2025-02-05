import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AddInterests } from './entities/interests.entity';

@Injectable()
export class UserInterestsService {
  constructor(private readonly prisma: PrismaService) {}

  async addInterests(
    userId: number,
    interests: string[],
  ): Promise<AddInterests[]> {
    if (!interests || interests.length === 0) {
      return [];
    }

    const userInterests = await Promise.all(
      interests.map((interest) =>
        this.prisma.userInterest.upsert({
          where: {
            userId_interest: {
              userId,
              interest,
            },
          },
          update: {},
          create: {
            userId,
            interest,
          },
        }),
      ),
    );

    return userInterests;
  }
}
