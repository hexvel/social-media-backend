import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { DeletePostDto } from './dto/delete-post.dto';
export declare class PostsController {
    private readonly postsService;
    constructor(postsService: PostsService);
    getAllPosts(req: any): Promise<({
        author: {
            username: string;
            firstName: string;
            lastName: string;
            id: number;
        };
        photos: {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            postId: number;
            url: string;
        }[];
    } & {
        id: number;
        createdAt: Date;
        updatedAt: Date;
        content: string;
        authorId: number;
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
                postId: number;
                url: string;
            }[];
        } & {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            content: string;
            authorId: number;
        };
    }>;
    updatePost(updatePostDto: UpdatePostDto, req: any): Promise<{
        message: string;
        post: {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            content: string;
            authorId: number;
        };
    }>;
    deletePost(deletePostDto: DeletePostDto, req: any): Promise<{
        message: string;
    }>;
}
