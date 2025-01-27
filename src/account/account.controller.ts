import { Body, Controller, Delete, Post, Req, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { UpdateUserDto } from 'src/user/dto/update-user.dto';
import { UserService } from 'src/user/user.service';
import { AccountService } from './account.service';

@UseGuards(JwtGuard)
@Controller('account')
export class AccountController {
  constructor(
    private readonly accountService: AccountService,
    private readonly userService: UserService,
  ) {}

  @Delete('account.delete')
  async deleteAccount(@Req() req) {
    return await this.accountService.deleteUser(req.user.sub.id);
  }

  @Post('account.update')
  async updateAccount(@Req() req, @Body() updateAccountDto: UpdateUserDto) {
    return await this.userService.updateUser(req.user.sub.id, updateAccountDto);
  }
}
