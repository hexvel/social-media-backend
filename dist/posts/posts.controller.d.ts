import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { DeletePostDto } from './dto/delete-post.dto';
export declare class PostsController {
    private readonly postsService;
    constructor(postsService: PostsService);
    getAllPosts(req: any): Promise<({
        author: {
            id: number;
            username: string;
            firstName: string;
            lastName: string;
        };
        photos: {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            url: string;
            postId: number;
        }[];
    } & {
        id: number;
        content: string;
        authorId: number;
        createdAt: Date;
        updatedAt: Date;
    })[]>;
    createPost(createPostDto: CreatePostDto, req: any, files: {
        photos?: Express.Multer.File[];
    }): Promise<{
        message: string;
        post: {
            photos: {
                id: number;
                createdAt: Date;
                updatedAt: Date;
                url: string;
                postId: number;
            }[];
        } & {
            id: number;
            content: string;
            authorId: number;
            createdAt: Date;
            updatedAt: Date;
        };
    }>;
    updatePost(updatePostDto: UpdatePostDto, req: any): Promise<{
        message: string;
        post: {
            id: number;
            content: string;
            authorId: number;
            createdAt: Date;
            updatedAt: Date;
        };
    }>;
    deletePost(deletePostDto: DeletePostDto, req: any): Promise<{
        message: string;
    }>;
}
