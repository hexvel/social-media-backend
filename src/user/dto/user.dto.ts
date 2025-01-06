import { IsNotEmpty, IsString, IsOptional, Length } from "class-validator";

export class UserDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsOptional()
  displayName: string;

  @IsString()
  @Length(8, 50, { message: 'Password must be between 8 and 50 characters' })
  password: string
}