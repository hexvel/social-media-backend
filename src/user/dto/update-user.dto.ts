import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsString()
  @IsOptional()
  bio?: string;
  @IsString()
  @Length(8, 50, { message: 'Password must be between 8 and 50 characters' })
  password: string;

  @IsString()
  @IsOptional()
  avatar?: string;
}
