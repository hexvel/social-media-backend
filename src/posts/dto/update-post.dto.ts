import { IsOptional, IsString, IsInt } from 'class-validator';

export class UpdatePostDto {
  @IsInt()
  id: number;

  @IsOptional()
  @IsString()
  content?: string;
}
