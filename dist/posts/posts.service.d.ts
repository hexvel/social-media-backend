import { PrismaService } from 'src/prisma.service';
import { UpdatePostDto } from './dto/update-post.dto';
export declare class PostsService {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    getAllPosts(userId: number): Promise<({
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
    createPost(data: {
        content: string;
        authorId: number;
        photos?: string[];
    }): Promise<{
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
    }>;
    updatePost(dto: UpdatePostDto, authorId: number): Promise<{
        id: number;
        content: string;
        authorId: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
    deletePost(id: number, authorId: number): Promise<void>;
}
