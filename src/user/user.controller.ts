import {
  Controller,
  Post,
  Get,
  Delete,
  Put,
  Param,
  Body,
  // UseGuards,
  Req,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiTags,
} from '@nestjs/swagger';
import { User } from './user.entity';
import { UserService } from './user.service';
import { UserRegisterRequestDto } from './dto/user-register.req.dto';
// import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

//@UseGuards(JwtAuthGuard)
@ApiTags('User')
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('/register')
  @ApiCreatedResponse({
    description: 'Created user object as response',
    type: User,
  })
  @ApiBadRequestResponse({ description: 'User cannot register. Try again!' })
  async doCreateUser(
    @Body() userRegisterRequestDto: UserRegisterRequestDto,
  ): Promise<User> {
    return await this.userService.createUser(userRegisterRequestDto);
  }
  @Get('/currentUser')
  @ApiCreatedResponse({
    description: 'Get current user',
    type: User,
  })
  getCurrentUser(@Req() req): any {
    return { currentUser: req.currentUser };
  }
  @Get('')
  @ApiCreatedResponse({
    description: 'List all registered users',
    type: User,
  })
  @ApiBadRequestResponse({ description: 'Something wrong. Try again!' })
  async findUsers(): Promise<User[]> {
    return await this.userService.getUsers();
  }

  @Get('/:userId')
  @ApiCreatedResponse({
    description: 'Get informations about a certain user',
    type: User,
  })
  @ApiBadRequestResponse({ description: 'Something wrong. Try again!' })
  async findUserById(@Param('userId') userId: string): Promise<User> {
    return await this.userService.getUserById(parseInt(userId));
  }

  @Put('/:userId')
  @ApiCreatedResponse({
    description: 'Modify a user by id',
    type: User,
  })
  @ApiBadRequestResponse({ description: 'Something wrong. Try again!' })
  async updateUser(
    @Param('userId') userId: string,
    @Body() updateUser: UserRegisterRequestDto,
  ): Promise<any> {
    return await this.userService.modifyUser(parseInt(userId), updateUser);
  }

  @Delete('/:userId')
  @ApiCreatedResponse({
    description: 'Delete a user by id',
    type: User,
  })
  @ApiBadRequestResponse({ description: 'Something wrong. Try again!' })
  async deleteUser(@Param('userId') userId: string): Promise<any> {
    return await this.userService.deleteUser(parseInt(userId));
  }
}
