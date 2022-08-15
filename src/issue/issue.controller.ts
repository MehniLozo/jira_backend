/* eslint-disable @typescript-eslint/no-inferrable-types */
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Issue } from './issue.entity';
import { IssueService } from './issue.service';
import {
  Controller,
  Post,
  Get,
  Delete,
  Put,
  Body,
  Param,
  UseGuards,
  Query,
  // DefaultValuePipe,
  // ParseIntPipe,
} from '@nestjs/common';
import { IssueRegisterRequestDto } from './dto/issue-register.req.dto';
import { IssueUpdateRequestDto } from './dto/issue-update.req.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@ApiTags('Issue')
@Controller('issues')
export class IssueController {
  constructor(private readonly issueService: IssueService) {}

  @Post('')
  @ApiCreatedResponse({
    description: 'Created issue object as response',
    type: Issue,
  })
  @ApiBadRequestResponse({ description: 'Issue cannot register. Try again!' })
  async doCreateIssue(
    @Body() issueRegisterRequestDto: IssueRegisterRequestDto,
  ) {
    return await this.issueService.createIssue(issueRegisterRequestDto);
  }

  @Get('/:issueId')
  @ApiCreatedResponse({
    description: 'List specified registered issue',
    type: Issue,
  })
  @ApiBadRequestResponse({ description: 'Something wrong. Try again!' })
  async findIssueById(@Param('issueId') issueId: string) {
    return await this.issueService.getIssueById(parseInt(issueId));
  }
  /*
  @Get('')
  @ApiCreatedResponse({
    description:
      'List registered issue by some requested search terms.These terms could exist anywhere within the issue dataframe : title,body,type .. ',
    type: Issue,
  })
   async findIssuesBySearchTerm(
    // eslint-disable-next-line @typescript-eslint/no-inferrable-types
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 10,
    @Query('searchTerm') searchTerm?: string,
  ): Promise<Pagination<Issue>> {
    limit = limit > 100 ? 100 : limit;
    return this.issueService.paginate({
      page,
      limit,
    });
  }
  */
  @Get('')
  @ApiCreatedResponse({
    description:
      'List registered issue by some requested search terms.These terms could exist anywhere within the issue dataframe : title,body,type .. ',
    type: Issue,
  })
  async findIssuesBySearchTerm(@Query() query?: any) {
    return await this.issueService.getIssuesBySearchTerm(query.searchTerm);
  }
  @Put('/:issueId')
  @ApiCreatedResponse({
    description: 'Modify a specific target issue',
    type: Issue,
  })
  async modifyIssue(
    @Param('issueId') issueId: string,
    @Body() issueUpdateRequestDto: IssueUpdateRequestDto,
  ) {
    return await this.issueService.modifyIssue(
      parseInt(issueId),
      issueUpdateRequestDto,
    );
  }

  @Delete('/:issueId')
  @ApiCreatedResponse({
    description: 'Delete a specified issue by id',
    type: Boolean,
  })
  @ApiBadRequestResponse({ description: 'Something wrong. Try again!' })
  async deleteIssue(@Param('issueId') issueId: string) {
    return await this.issueService.deleteIssue(parseInt(issueId));
  }
}
