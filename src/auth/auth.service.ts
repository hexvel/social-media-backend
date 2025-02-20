import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { verify } from 'argon2';
import { selectUserData } from 'src/config/queties.config';
import { PrismaService } from '../prisma/prisma.service';
import { UserService } from '../user/user.service';
import { AuthResponse, LoginDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  private readonly ACCESS_TOKEN_EXPIRES = '1h';
  private readonly REFRESH_TOKEN_EXPIRES = '7d';

  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
  ) {}

  private async generateTokens(
    userId: number,
    payload?: Record<string, any>,
  ): Promise<Omit<AuthResponse, 'user'>> {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        { sub: { id: userId, ...payload } },
        {
          expiresIn: this.ACCESS_TOKEN_EXPIRES,
          secret: process.env.JWT_SECRET_KEY,
        },
      ),

      this.jwtService.signAsync(
        { sub: { id: userId, ...payload } },
        {
          expiresIn: this.REFRESH_TOKEN_EXPIRES,
          secret: process.env.JWT_REFRESH_TOKEN,
        },
      ),
    ]);

    return { accessToken, refreshToken };
  }

  async login(dto: LoginDto): Promise<AuthResponse> {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
      select: {
        ...selectUserData,
        email: true,
        password: true,
      },
    });

    if (!user || !(await verify(user.password, dto.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const tokens = await this.generateTokens(user.id);
    const { password, ...userData } = user;

    return {
      ...tokens,
      user: userData,
    };
  }

  async validateUser(dto: LoginDto) {
    const user = await this.userService.findByEmail(dto.email);

    if (!user) throw new NotFoundException('User not found');

    const comparedPassword = await verify(user.password, dto.password);

    if (user && comparedPassword) {
      const { password, ...rest } = user;
      return rest;
    }

    throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
  }

  async refreshToken(user: any) {
    const payload = {
      username: user.username,
      sub: user.sub,
    };

    const tokens = await this.generateTokens(user.id, payload);
    return tokens;
  }
}
