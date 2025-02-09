import { MailerService } from '@nestjs-modules/mailer';
import {
  ConflictException,
  HttpException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { hash } from 'bcrypt';
import { Response } from 'express';
import { activationLinkTemplate } from 'src/config/mail.config';
import { selectUserData } from 'src/config/queties.config';
import * as uuid from 'uuid';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserType } from './entities/user.entity';

@Injectable()
export class UserService {
  private readonly ERROR_MESSAGES = {
    EMAIL_EXISTS: 'Email already exists',
    USER_NOT_FOUND: 'User not found',
    INVALID_USER_ID: 'Invalid user id',
    INVALID_ACTIVATION: 'Activation link not valid',
  } as const;

  constructor(
    private readonly prismaService: PrismaService,
    private readonly mailerService: MailerService,
  ) {}

  private async validateUserExists(id: number): Promise<void> {
    const user = await this.prismaService.user.findUnique({
      where: { id },
    });
    if (!user) throw new NotFoundException(this.ERROR_MESSAGES.USER_NOT_FOUND);
  }

  private async findUserOrThrow(id: number): Promise<User> {
    if (!id) throw new HttpException(this.ERROR_MESSAGES.INVALID_USER_ID, 400);

    const user = await this.prismaService.user.findUnique({
      where: { id },
    });

    if (!user) throw new NotFoundException(this.ERROR_MESSAGES.USER_NOT_FOUND);
    return user;
  }

  async register(dto: CreateUserDto) {
    const { username, ...rest } = dto;

    const existingUser = await this.prismaService.user.findUnique({
      where: { email: dto.email },
    });

    if (existingUser) {
      throw new ConflictException(this.ERROR_MESSAGES.EMAIL_EXISTS);
    }

    const activationLink = uuid.v4();
    await this.sendActivationEmail(dto.email, activationLink);

    const user = await this.prismaService.user.create({
      data: {
        ...rest,
        password: await hash(dto.password, 10),
        username: username || null,
        activationLink,
      },
    });

    if (!username) {
      return this.prismaService.user.update({
        where: { id: user.id },
        data: { username: `id${user.id}` },
      });
    }

    return user;
  }

  private async sendActivationEmail(
    email: string,
    activationLink: string,
  ): Promise<void> {
    await this.mailerService.sendMail({
      to: email,
      subject: 'Activation link',
      html: activationLinkTemplate(activationLink),
    });
  }

  async get(userId: number, owner: string) {
    let user: UserType | null = null;

    if (!owner) {
      user = await this.prismaService.user.findFirst({
        where: { id: userId },
        select: selectUserData,
      });
    } else {
      const isNumeric = /^\d+$/.test(owner);

      user = await this.prismaService.user.findFirst({
        where: isNumeric ? { id: +owner } : { username: owner },
        select: selectUserData,
      });
    }

    if (user) return user;
    throw new NotFoundException(this.ERROR_MESSAGES.USER_NOT_FOUND);
  }

  async activateUser(res: Response, activationLink: string) {
    const user = await this.prismaService.user.findFirst({
      where: { activationLink },
    });

    if (!user)
      throw new HttpException(this.ERROR_MESSAGES.INVALID_ACTIVATION, 400);

    await this.prismaService.user.update({
      where: { id: user.id },
      data: { isActive: true },
    });

    return res.redirect(process.env.FRONTEND_URL);
  }

  async getUsers() {
    return this.prismaService.user.findMany({
      select: selectUserData,
    });
  }

  async updateUser(id: number, dto: UpdateUserDto) {
    await this.validateUserExists(id);

    const updatedUser = await this.prismaService.user.update({
      where: { id },
      data: dto,
    });

    const { password, ...rest } = updatedUser;
    return rest;
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.prismaService.user.findUnique({
      where: { email },
    });

    if (!user) throw new NotFoundException(this.ERROR_MESSAGES.USER_NOT_FOUND);
    return user;
  }

  async findById(id: number) {
    await this.validateUserExists(id);

    return this.prismaService.user.findUnique({
      where: { id },
      select: selectUserData,
    });
  }

  async deleteUser(id: number) {
    await this.findUserOrThrow(id);

    await this.prismaService.user.delete({
      where: { id },
    });

    return { message: 'User deleted successfully' };
  }
}
