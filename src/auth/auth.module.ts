import { Module } from '@nestjs/common';
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { PrismaService } from "../prisma.service";
import { JwtService } from "@nestjs/jwt";
import { UserModule } from "../user/user.module";

@Module({
  imports: [UserModule, JwtService],
  controllers: [AuthController],
  providers: [AuthService, PrismaService]
})
export class AuthModule {}
