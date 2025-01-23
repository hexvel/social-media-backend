import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RecommendationsService {
  constructor(private readonly prismaService: PrismaService) {}

  private calculateSimilarity(tags1: string[], tags2: string[]): number {
    const union = new Set([...tags1, ...tags2]);
    const intersection = tags1.filter((tag) => tags2.includes(tag)).length;
    return intersection / union.size;
  }

  async recommendPosts(userId: number) {
    const userInterests = await this.prismaService.userInterest.findMany({
      where: { userId },
      select: { interest: true },
    });

    const userInterestsTags = userInterests.map(
      (interest) => interest.interest,
    );

    const allPosts = await this.prismaService.post.findMany({
      include: {
        tags: { include: { tag: true } },
      },
    });

    return allPosts
      .map((post) => {
        const postTags = post.tags.map((pt) => pt.tag.name);
        const similarity = this.calculateSimilarity(
          userInterestsTags,
          postTags,
        );
        return { post, similarity };
      })
      .sort((a, b) => b.similarity - a.similarity);
  }

  async recommendUsers(userId: number) {
    const userInterests = await this.prismaService.userInterest.findMany({
      where: { userId },
      select: { interest: true },
    });

    const userInterestsTags = userInterests.map(
      (interest) => interest.interest,
    );

    const users = await this.prismaService.user.findMany({
      where: {
        id: { not: userId },
        interests: {
          some: {
            interest: { in: userInterestsTags },
          },
        },
      },
      select: {
        id: true,
        username: true,
        firstName: true,
        lastName: true,
        bio: true,
        avatar: true,
        interests: { select: { interest: true } },
      },
    });

    return users;
  }
}
