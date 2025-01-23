import { PrismaService } from 'src/prisma.service';
export declare class PostsService {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    getAllPosts(userId: number): Promise<({
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
    createPost(data: {
        content: string;
        authorId: number;
        photos?: string[];
    }): Promise<{
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
    }>;
    updatePost(id: number, data: {
        title?: string;
        content?: string;
    }, authorId: number): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        content: string;
        authorId: number;
    }>;
    deletePost(id: number, authorId: number): Promise<void>;
}
