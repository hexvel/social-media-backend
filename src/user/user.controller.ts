import { Body, Controller, Get, Post } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserDto } from "./dto/user.dto";

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async register(@Body() dto: UserDto) {
    return this.userService.register(dto);
  }

  @Get('users')
  async getUsers() {
    return this.userService.getUsers();
  }
}
