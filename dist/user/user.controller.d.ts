import { UserService } from './user.service';
import { FriendsService } from 'src/friends/friends.service';
export declare class UserController {
    private readonly userService;
    private readonly friendsService;
    constructor(userService: UserService, friendsService: FriendsService);
    getUser(id: number): Promise<{
        id: number;
        username: string;
        firstName: string;
        lastName: string;
        avatar: string;
        bio: string;
    }>;
    deleteAccount(req: any): Promise<{
        message: string;
    }>;
}
