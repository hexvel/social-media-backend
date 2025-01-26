import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserInterestsService } from 'src/user-interests/user-interests.service';
import { PrismaService } from '../prisma/prisma.service';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  controllers: [UserController],
  providers: [UserService, PrismaService, JwtService, UserInterestsService],
})
export class UserModule {}
