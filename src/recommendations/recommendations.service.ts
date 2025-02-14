import { Injectable } from '@nestjs/common';
import { selectUserData } from 'src/config/queties.config';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RecommendationsService {
  constructor(private readonly prismaService: PrismaService) {}

  private calculateSimilarity(tags1: string[], tags2: string[]): number {
    const allTags = Array.from(new Set([...tags1, ...tags2]));

    const vector1 = allTags.map((tag) => (tags1.includes(tag) ? 1 : 0));
    const vector2 = allTags.map((tag) => (tags2.includes(tag) ? 1 : 0));

    const dotProduct = vector1.reduce(
      (sum, val, index) => sum + val * vector2[index],
      0,
    );
    const magnitude1 = Math.sqrt(
      vector1.reduce((sum, val) => sum + val * val, 0),
    );
    const magnitude2 = Math.sqrt(
      vector2.reduce((sum, val) => sum + val * val, 0),
    );

    return magnitude1 && magnitude2
      ? dotProduct / (magnitude1 * magnitude2)
      : 0;
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
        author: { select: { ...selectUserData } },
      },
    });

    const similarityThreshold = 0.3;

    const sortedPosts = allPosts
      .map((post) => {
        const postTags = post.tags.map((pt) => pt.tag.name);
        const similarity = this.calculateSimilarity(
          userInterestsTags,
          postTags,
        );
        return { post, similarity };
      })
      .filter(({ similarity }) => similarity >= similarityThreshold)
      .sort((a, b) => b.similarity - a.similarity);

    return sortedPosts
      .slice(0, 10)
      .map(({ post, similarity }) => ({ ...post, similarity }));
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
        ...selectUserData,
        interests: { select: { interest: true } },
      },
    });

    return users;
  }
}
