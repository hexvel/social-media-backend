import { Body, Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/auth.dto';
import { RefreshJwtGuard } from './guards/refresh.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Post('/register')
  async register(@Body() registerDto: CreateUserDto) {
    return await this.userService.register(registerDto);
  }

  @Post('/login')
  async login(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const data = await this.authService.login(loginDto);

    res.cookie('refreshToken', data.refreshToken, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 30,
    });

    return {
      user: data.user,
      accessToken: data.accessToken,
    };
  }

  @UseGuards(RefreshJwtGuard)
  @Post('/refresh')
  async refreshToken(
    @Req() req,
    @Res({ passthrough: true }) res: Response,
    @Body('refreshToken') refreshToken?: string,
  ) {
    const data = await this.authService.refreshToken(req.user);

    res.cookie('refreshToken', data.refreshToken, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 30,
    });

    return data;
  }

  @UseGuards(RefreshJwtGuard)
  @Post('/logout')
  async logout(@Req() req, @Res({ passthrough: true }) res: Response) {
    res.clearCookie('refreshToken');
    return true;
  }
}
