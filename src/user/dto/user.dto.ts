import { IsNotEmpty, IsString, IsOptional } from "class-validator";

export class UserDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsOptional()
  displayName: string;

  @IsString()
  password: string
}