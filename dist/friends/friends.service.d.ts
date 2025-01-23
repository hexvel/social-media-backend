import { PrismaService } from 'src/prisma.service';
export declare class FriendsService {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    getFriends(id: number): Promise<{
        id: number;
        firstName: string;
        lastName: string;
    }[]>;
    addFriend(userId: number, friendId: number): Promise<{
        id: number;
        username: string;
        email: string;
        firstName: string;
        lastName: string;
        avatar: string | null;
        bio: string | null;
        password: string;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    deleteFriend(userId: number, friendId: number): Promise<{
        id: number;
        username: string;
        email: string;
        firstName: string;
        lastName: string;
        avatar: string | null;
        bio: string | null;
        password: string;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
}
