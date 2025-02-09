import { IsIn, IsNumber, IsOptional } from 'class-validator';

export class GetConversationById {
  @IsNumber()
  conversation_id: number;

  @IsOptional()
  @IsNumber()
  @IsIn([0, 1])
  extended: number;
}
