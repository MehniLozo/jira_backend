import { Body, Controller, Post,Get,Delete } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Issue } from './issue.entity';
import { IssueService } from './issue.service';

@ApiTags('Issue')
@Controller('issue')
export class IssueController {
  constructor(private issueService: IssueService) {}

  @Post('/issue/register')
  @ApiCreatedResponse({
    description: 'Created issue object as response',
    type: Issue,
  })
  @ApiBadRequestResponse({ description: 'Issue cannot register. Try again!' })
  async doCreateIssue(
    issueRegister: Issue,
  ): Promise<Issue> {
    return await this.issueService.createIssue(issueRegister);
  }

  @Get('/project/issues')
  @ApiCreatedResponse({
    description: 'List all registered issues',
    type: Issue,
  })
  @ApiBadRequestResponse({ description: 'Something wrong. Try again!' })
  async findIssuesByProject(
    id:number,
  ): Promise<Issue[]> {
    return await this.issueService.getIssuesByProject(id);
  }

  @Get('/issue')
  @ApiCreatedResponse({
    description: 'List all registered issues',
    type: Issue,
  })
  @ApiBadRequestResponse({ description: 'Something wrong. Try again!' })
  async findIssueById(
    id:number,
  ): Promise<Issue> {
    return await this.issueService.getIssueById(id);
  }


  @Delete('/issue') //with id param
  @ApiCreatedResponse({
    description: 'Delete a specified issue by id',
    type: Boolean,
  })
  @ApiBadRequestResponse({ description: 'Something wrong. Try again!' })
  async deleteIssue(
    id:number,
  ): Promise<Boolean> {
    return await this.issueService.deleteIssue(id);
  }}
