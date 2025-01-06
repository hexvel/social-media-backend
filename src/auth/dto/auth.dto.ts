import { IsNotEmpty, IsString, Length } from "class-validator";

export class LoginDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  password: string;
}
