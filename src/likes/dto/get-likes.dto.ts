import { IsNumber } from 'class-validator';

import { IsOptional } from 'class-validator';

export class GetLikesDto {
  @IsNumber()
  @IsOptional()
  post_id?: number;
}
