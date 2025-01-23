import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { FriendsService } from 'src/friends/friends.service';
import { UserInterestsService } from 'src/user-interests/user-interests.service';

@Module({
  controllers: [UserController],
  providers: [UserService, PrismaService, JwtService, UserInterestsService],
})
export class UserModule {}
