import { IsInt, IsNotEmpty } from 'class-validator';

export class AddLikeDto {
  @IsInt()
  @IsNotEmpty()
  post_id: number;
}
