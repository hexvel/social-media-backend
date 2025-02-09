import { Body, Controller, Delete, Patch, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { User } from 'src/common/decorators/user.decorator';
import { AccountService } from './account.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';

@ApiTags('Account')
@ApiBearerAuth()
@UseGuards(JwtGuard)
@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Delete()
  @ApiOperation({ summary: 'Удаление аккаунта' })
  @ApiResponse({
    status: 200,
    description: 'Аккаунт успешно удален',
    type: UserEntity,
  })
  async deleteAccount(@User('id') userId: number) {
    return this.accountService.deleteUser(userId);
  }

  @Patch()
  @ApiOperation({ summary: 'Обновление данных аккаунта' })
  @ApiResponse({
    status: 200,
    description: 'Данные успешно обновлены',
    type: UserEntity,
  })
  async updateAccount(
    @User('id') userId: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.accountService.updateUser(userId, updateUserDto);
  }
}
