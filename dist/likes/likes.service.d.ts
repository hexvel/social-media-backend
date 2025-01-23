import { PrismaService } from 'src/prisma.service';
import { AddLikeDto } from './dto/add-like.dto';
import { RemoveLikeDto } from './dto/remove-like.dto';
import { IsLikedDto } from './dto/is-liked.dto';
import { GetLikesListDto } from './dto/get-likes-list.dto';
export declare class LikesService {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    addLike(userId: number, dto: AddLikeDto): Promise<{
        post_id: number;
        user_id: number;
    }>;
    unlikePost(userId: number, removeLikeDto: RemoveLikeDto): Promise<{
        message: string;
    }>;
    isLiked(userId: number, isLikedDto: IsLikedDto): Promise<boolean>;
    getLikesList(dto: GetLikesListDto, currentUserId: number): Promise<any[]>;
}
