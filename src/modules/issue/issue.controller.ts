import { Body, Controller, Post,Get,Delete,Res,Req,Put } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Issue } from './issue.entity';
import { IssueService } from './issue.service';
import {IssueRegisterRequestDto} from './dto/issue-register.req.dto';
import { Request, Response } from 'express';

@ApiTags('Issue')
@Controller('projects/:projectId')
export class IssueController {
  constructor(private readonly issueService: IssueService) {}

  @Post('/issues')
  @ApiCreatedResponse({
    description: 'Created issue object as response',
    type: Issue,
  })
  @ApiBadRequestResponse({ description: 'Issue cannot register. Try again!' })
  async doCreateIssue(@Req() req:Request, @Res() res: Response ){

      const resultIssue = await this.issueService.createIssue(req.body);

      res.status(typeof resultIssue === "string"? 404 : 200).json(resultIssue);
  }

  @Get('/issues')
  @ApiCreatedResponse({
    description: 'List all registered issues',
    type: Issue,
  })
  @ApiBadRequestResponse({ description: 'Something wrong. Try again!' })
  async findIssuesByProject(
    @Req() req:Request, @Res() res: Response
  ){
    const resultIssue =  await this.issueService.getIssuesByProject(parseInt(req.params.projectId));

      res.status(typeof resultIssue === "string"? 404 : 200).json(resultIssue);
    }

  @Get('/issues/:issueId')
  @ApiCreatedResponse({
    description: 'List specified registered issue',
    type: Issue,
  })
  @ApiBadRequestResponse({ description: 'Something wrong. Try again!' })
  async findIssueById(
    @Req() req:Request, @Res() res: Response
  ){

      const resultIssue = await this.issueService.getIssueById(parseInt(req.params.issueId));
      res.status(typeof resultIssue === "string"? 404 : 200).json(resultIssue)
  }

  @Put('/issues/:issueId')
  @ApiCreatedResponse({
    description: 'Modify a specific target issue',
    type: Issue,
  })
  async modifyIssue(
    @Req() req:Request, @Res() res: Response
  ){
      const resultIssue = await this.issueService.modifyIssue(parseInt(req.params.issueId),req.body);
      res.status(typeof resultIssue === "string"? 400 : 201).json(resultIssue)
  }

  @Delete('/issues/:issueId') //with id param
  @ApiCreatedResponse({
    description: 'Delete a specified issue by id',
    type: Boolean,
  })
  @ApiBadRequestResponse({ description: 'Something wrong. Try again!' })
  async deleteIssue(
      @Req() req:Request, @Res() res: Response
  ){
    const resultIssue =  await this.issueService.deleteIssue(Number(req.params.issueId));
      res.status(resultIssue.deleted == true? 200: 405).json(resultIssue)
  }}
