import { IsInt, IsOptional, IsString } from 'class-validator';

export class UpdatePostDto {
  @IsInt()
  id: number;

  @IsOptional()
  @IsString()
  content?: string;
}
