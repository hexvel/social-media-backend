import { LikesService } from './likes.service';
import { AddLikeDto } from './dto/add-like.dto';
import { RemoveLikeDto } from './dto/remove-like.dto';
import { IsLikedDto } from './dto/is-liked.dto';
import { GetLikesListDto } from './dto/get-likes-list.dto';
export declare class LikesController {
    private readonly likesService;
    constructor(likesService: LikesService);
    likePost(addLikeDto: AddLikeDto, req: any): Promise<{
        post_id: number;
        user_id: number;
    }>;
    unlikePost(removeLikeDto: RemoveLikeDto, req: any): Promise<{
        message: string;
    }>;
    isLiked(isLikedDto: IsLikedDto, req: any): Promise<boolean>;
    getLikesList(dto: GetLikesListDto, req: any): Promise<any[]>;
}
