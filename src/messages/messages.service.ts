import { HttpException, Injectable } from '@nestjs/common';
import { Conversation } from '@prisma/client';
import { selectUserData } from 'src/config/queties.config';
import { PrismaService } from 'src/prisma/prisma.service';
import { GetConversationById } from './dto/get-conversation-by-id.dto';

@Injectable()
export class MessagesService {
  constructor(private readonly prismaService: PrismaService) {}

  async getConversations(userId: number, extended?: number) {
    return await this.prismaService.conversation.findMany({
      where: {
        participants: {
          some: {
            id: userId,
          },
        },
      },
      include: extended && {
        participants: {
          select: selectUserData,
        },
      },
    });
  }

  async createConversation(
    userId: number,
    title: string,
    participants?: number[],
  ) {
    if (!participants) {
      participants = [userId];
    }

    if (!participants.includes(userId)) {
      participants.push(userId);
    }

    const existingUsers = await this.prismaService.user.findMany({
      where: {
        id: { in: participants },
      },
    });

    if (existingUsers.length !== participants.length) {
      throw new HttpException('One or more participants do not exist.', 404);
    }

    return await this.prismaService.conversation.create({
      data: {
        title: title,
        creatorId: userId,
        participants: {
          connect: participants.map((participantId) => ({ id: participantId })),
        },
      },
    });
  }

  async getConversationById(
    userId: number,
    dto: GetConversationById,
  ): Promise<Conversation> {
    return await this.prismaService.conversation.findUnique({
      where: {
        id: dto.conversation_id,
        participants: {
          some: {
            id: userId,
          },
        },
      },
      include: dto.extended && {
        participants: {
          select: selectUserData,
        },
      },
    });
  }
}
