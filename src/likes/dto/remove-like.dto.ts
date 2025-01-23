import { IsInt, IsNotEmpty } from 'class-validator';

export class RemoveLikeDto {
  @IsInt()
  @IsNotEmpty()
  post_id: number;
}
