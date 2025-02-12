import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as path from 'path';
import { AccountModule } from './account/account.module';
import { AuthModule } from './auth/auth.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { FriendsModule } from './friends/friends.module';
import { FriendsService } from './friends/friends.service';
import { LikesController } from './likes/likes.controller';
import { LikesModule } from './likes/likes.module';
import { LikesService } from './likes/likes.service';
import { MessagesModule } from './messages/messages.module';
import { PostsModule } from './posts/posts.module';
import { PrismaModule } from './prisma/prisma.module';
import { PrismaService } from './prisma/prisma.service';
import { RecommendationsModule } from './recommendations/recommendations.module';
import { UserInterestsService } from './user-interests/user-interests.service';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    MailerModule.forRoot({
      transport: {
        pool: true,
        service: 'Gmail',
        auth: {
          type: 'OAuth2',
          user: process.env.EMAIL_USER,
          accessToken: process.env.EMAIL_ACCESS_TOKEN,
          refreshToken: process.env.EMAIL_REFRESH_TOKEN,
        },
      },
    }),
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
    PrismaModule,
  ],
  controllers: [LikesController],
  providers: [
    PrismaService,
    FriendsService,
    LikesService,
    JwtService,
    UserInterestsService,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
