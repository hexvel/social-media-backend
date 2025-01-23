import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PrismaService } from '../prisma.service';
import { JwtService } from '@nestjs/jwt';
import { FriendsService } from 'src/friends/friends.service';

@Module({
  controllers: [UserController],
  providers: [UserService, PrismaService, JwtService, FriendsService],
})
export class UserModule {}
