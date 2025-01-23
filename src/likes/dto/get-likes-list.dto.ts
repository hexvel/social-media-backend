import { IsInt, IsNotEmpty, IsNumber, IsOptional, IsIn } from 'class-validator';

export class GetLikesListDto {
  @IsNumber()
  @IsNotEmpty()
  post_id: number;

  @IsInt()
  @IsOptional()
  @IsIn([0, 1])
  friends_only?: number;

  @IsInt()
  @IsOptional()
  offset?: number;

  @IsInt()
  @IsOptional()
  count?: number;

  @IsInt()
  @IsOptional()
  @IsIn([0, 1])
  extended?: number;
}
