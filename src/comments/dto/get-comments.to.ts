import { IsNotEmpty, IsNumber } from 'class-validator';

export class GetCommentsDto {
  @IsNotEmpty()
  @IsNumber()
  post_id: number;
}
