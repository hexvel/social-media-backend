import { UserDto } from '../user/dto/user.dto';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { LoginDto } from './dto/auth.dto';
export declare class AuthController {
    private readonly userService;
    private readonly authService;
    constructor(userService: UserService, authService: AuthService);
    register(registerDto: UserDto): Promise<{
        username: string;
        email: string;
        firstName: string;
        lastName: string;
        bio: string | null;
        avatar: string | null;
        id: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
    login(loginDto: LoginDto): Promise<{
        user: {
            username: string;
            email: string;
            firstName: string;
            lastName: string;
            bio: string | null;
            avatar: string | null;
            id: number;
            createdAt: Date;
            updatedAt: Date;
        };
        tokens: {
            accessToken: string;
            refreshToken: string;
            expiresIn: number;
        };
    }>;
    refreshToken(req: any): Promise<{
        accessToken: string;
        refreshToken: string;
        expiresIn: number;
    }>;
}
