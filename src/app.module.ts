import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as path from 'path';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { FriendsModule } from './friends/friends.module';
import { FriendsService } from './friends/friends.service';
import { LikesController } from './likes/likes.controller';
import { LikesModule } from './likes/likes.module';
import { LikesService } from './likes/likes.service';
import { MessagesModule } from './messages/messages.module';
import { PostsModule } from './posts/posts.module';
import { PrismaService } from './prisma/prisma.service';
import { RecommendationsModule } from './recommendations/recommendations.module';
import { UserInterestsService } from './user-interests/user-interests.service';
import { UserModule } from './user/user.module';
import { AccountModule } from './account/account.module';

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
    RecommendationsModule,
    MessagesModule,
    AccountModule,
  ],
  controllers: [AppController, LikesController],
  providers: [
    PrismaService,
    FriendsService,
    LikesService,
    JwtService,
    UserInterestsService,
  ],
})
export class AppModule {}
