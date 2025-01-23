import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PrismaService } from './prisma.service';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { FriendsService } from './friends/friends.service';
import { PostsModule } from './posts/posts.module';
import { LikesService } from './likes/likes.service';
import { LikesController } from './likes/likes.controller';
import { LikesModule } from './likes/likes.module';
import * as path from 'path';
import { JwtService } from '@nestjs/jwt';
import { FriendsModule } from './friends/friends.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    UserModule,
    AuthModule,
    PostsModule,
    LikesModule,
    ServeStaticModule.forRoot({
      rootPath: path.join(__dirname, '..', 'uploads'),
      serveRoot: '/uploads',
    }),
    FriendsModule,
  ],
  controllers: [AppController, LikesController],
  providers: [PrismaService, FriendsService, LikesService, JwtService],
})
export class AppModule {}
