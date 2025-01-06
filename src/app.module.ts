import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PrismaService } from "./prisma.service";
import { ConfigModule } from "@nestjs/config";
import { UserModule } from './user/user.module';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [ConfigModule.forRoot(), UserModule, AuthModule],
  controllers: [AppController],
  providers: [PrismaService],
})
export class AppModule {}
