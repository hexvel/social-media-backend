import { IsInt, IsNotEmpty, IsOptional } from 'class-validator';

export class IsLikedDto {
  @IsOptional()
  @IsInt()
  user_id: number;

  @IsInt()
  @IsNotEmpty()
  post_id: number;
}
