import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
  Req,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { multerConfig } from '../config/multer-config';
import { CreatePostDto } from './dto/create-post.dto';
import { DeletePostDto } from './dto/delete-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostsService } from './posts.service';

@UseGuards(JwtGuard)
@Controller()
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get('posts.get')
  async getAllPosts(@Req() req, @Query('owner') owner?: string) {
    const authorId = req.user.sub.id;
    return await this.postsService.getAllPosts(authorId, owner);
  }

  @Get('posts.getById')
  async getPostById(@Query('id') id: string) {
    return await this.postsService.getPostById(id);
  }

  @Post('posts.create')
  @UseInterceptors(
    FileFieldsInterceptor([{ name: 'photos', maxCount: 4 }], multerConfig),
  )
  async createPost(
    @Body() createPostDto: CreatePostDto,
    @Req() req,
    @UploadedFiles() files: { photos?: Express.Multer.File[] },
  ) {
    const authorId = req.user.sub.id;
    const photoUrls = files?.photos?.map((file) => file.path) || [];

    const post = await this.postsService.createPost(
      { ...createPostDto, photos: photoUrls },
      authorId,
    );

    return { message: 'Post created successfully', ...post };
  }

  @Put('posts.update')
  async updatePost(@Body() updatePostDto: UpdatePostDto, @Req() req) {
    const authorId = req.user.sub.id;
    const post = await this.postsService.updatePost(updatePostDto, authorId);
    return { message: 'Post updated successfully', post };
  }

  @Delete('posts.delete')
  async deletePost(@Body() deletePostDto: DeletePostDto, @Req() req) {
    const authorId = req.user.sub.id;
    await this.postsService.deletePost(deletePostDto.id, authorId);
    return { message: 'Post deleted successfully' };
  }
}
