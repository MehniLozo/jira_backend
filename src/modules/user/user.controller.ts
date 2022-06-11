import { Body, Controller, Post,Get,Delete } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiTags,
} from '@nestjs/swagger';
import { User } from './user.entity';
import { UserService } from './user.service';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('/register')
  @ApiCreatedResponse({
    description: 'Created user object as response',
    type: User,
  })
  @ApiBadRequestResponse({ description: 'User cannot register. Try again!' })
  async doCreateUser(
    userRegister: User,
  ): Promise<User> {
    return await this.userService.createUser(userRegister);
  }

  @Get('/users')
  @ApiCreatedResponse({
    description: 'List all registered users',
    type: User,
  })
  @ApiBadRequestResponse({ description: 'Something wrong. Try again!' })
  async findUsers(
    userRegister: User,
  ): Promise<User[]> {
    return await this.userService.getUsers();
  }
}
