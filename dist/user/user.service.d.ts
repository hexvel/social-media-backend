import { PrismaService } from '../prisma.service';
import { UserDto } from './dto/user.dto';
export declare class UserService {
    readonly prismaService: PrismaService;
    constructor(prismaService: PrismaService);
    register(dto: UserDto): Promise<{
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
    getUsers(): Promise<{
        username: string;
        firstName: string;
        lastName: string;
        id: number;
    }[]>;
    findByUsername(username: string): Promise<{
        username: string;
        email: string;
        firstName: string;
        lastName: string;
        bio: string | null;
        password: string;
        avatar: string | null;
        id: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findById(id: number): Promise<{
        username: string;
        firstName: string;
        lastName: string;
        bio: string;
        avatar: string;
        id: number;
    }>;
    deleteUser(id: number): Promise<{
        message: string;
    }>;
}
