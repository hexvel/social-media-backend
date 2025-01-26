import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { GetConversationById } from './dto/get-conversation-by-id.dto';
import { MessagesService } from './messages.service';

@UseGuards(JwtGuard)
@Controller()
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Post('messages.getConversations')
  async getConversations(@Req() req, @Body('extended') extended?: number) {
    return await this.messagesService.getConversations(
      req.user.sub.id,
      extended,
    );
  }

  @Post('messages.createConversation')
  async createConversation(
    @Req() req,
    @Body('title') title: string,
    @Body('participants') participants?: number[],
  ) {
    return await this.messagesService.createConversation(
      req.user.sub.id,
      title,
      participants,
    );
  }

  @Post('messages.getConversationById')
  async getConversationById(@Req() req, @Body() dto: GetConversationById) {
    return await this.messagesService.getConversationById(req.user.sub.id, dto);
  }
}
