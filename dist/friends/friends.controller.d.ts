import { FriendsService } from './friends.service';
export declare class FriendsController {
    private readonly friendsService;
    constructor(friendsService: FriendsService);
    getFriends(req: any): Promise<{
        id: number;
        firstName: string;
        lastName: string;
    }[]>;
    addFriend(friendId: number, req: any): Promise<{
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
    deleteFriend(friendId: number, req: any): Promise<{
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
