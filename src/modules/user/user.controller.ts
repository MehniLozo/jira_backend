import { Body, Controller, Post,Get,Delete,Put,Req,Res } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiTags,
} from '@nestjs/swagger';
import { User } from './user.entity';
import { UserService } from './user.service';
import { Request, Response } from 'express';

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
    @Req() req:Request, @Res() res: Response
  ): Promise<any> {
    const resultUser =  await this.userService.createUser(req.body);
    return res.status(resultUser instanceof User? 201:405).json(resultUser)
  }

  @Get('')
  @ApiCreatedResponse({
    description: 'List all registered users',
    type: User,
  })
  @ApiBadRequestResponse({ description: 'Something wrong. Try again!' })
  async findUsers(
    @Req() req:Request, @Res() res: Response
  ): Promise<any> {
    return res.status(200).json(await this.userService.getUsers());
  }


  @Get('/:userId')
  @ApiCreatedResponse({
    description: 'Get informations about a certain user',
    type: User,
  })
  @ApiBadRequestResponse({ description: 'Something wrong. Try again!' })
  async findUserById(
    @Req() req:Request, @Res() res: Response
  ): Promise<any> {
    const resultUser = await this.userService.getUserById(parseInt(req.params.userId));
    return res.status(resultUser instanceof User? 201:405).json(resultUser)
  }


  @Put('/:userId')
  @ApiCreatedResponse({
    description: 'Modify a user by id',
    type: User,
  })
  @ApiBadRequestResponse({ description: 'Something wrong. Try again!' })
  async updateUser(
    @Req() req:Request, @Res() res: Response
  ): Promise<any> {
    return res.status(201).json(await this.userService.modifyUser(parseInt(req.params.userId),req.body))
  }


  @Delete('/:userId')
  @ApiCreatedResponse({
    description: 'Delete a user by id',
    type: User,
  })
  @ApiBadRequestResponse({ description: 'Something wrong. Try again!' })
  async deleteUser(
    @Req() req:Request, @Res() res: Response
  ): Promise<any> {
    const resultUser = await this.userService.deleteUser(parseInt(req.params.userId));
    return res.status(resultUser.deleted == true? 201:405).json(resultUser);
  }



}
