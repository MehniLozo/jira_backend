import {
  Controller,
  Post,
  Get,
  Delete,
  Put,
  Body,
  Param,
  Query,
  CacheInterceptor,
  UseInterceptors,
  CacheTTL,
  Inject,
  CACHE_MANAGER,
} from '@nestjs/common';
import { Cache } from 'cache-manager';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Project } from './project.entity';
import { ProjectService } from './project.service';
import { TagService } from '../tag/tag.service';
import { ProjectRegisterRequestDto } from './dto/project-register.req.dto';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { PoliciesGuard } from 'src/auth/guards/PoliciesGuard';
import { AppAbility } from '../casl/casl-ability.factory';
import { Action } from '../casl/actions';
import { CheckPolicies } from '../auth/guards/PolicyHandler';

@UseGuards(JwtAuthGuard)
@ApiTags('Project')
@Controller('projects')
export class ProjectController {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private readonly projectService: ProjectService,
    private readonly tagService: TagService,
  ) {}

  @Post('/project')
  @ApiCreatedResponse({
    description: 'Created project object as response',
    type: Project,
  })
  @ApiBadRequestResponse({ description: 'Project cannot register. Try again!' })
  async createProject(
    @Body() projectRegisterRequestDto: ProjectRegisterRequestDto,
  ): Promise<any> {
    return await this.projectService.createProject(projectRegisterRequestDto);
  }

  @UseInterceptors(CacheInterceptor)
  @CacheTTL(30)
  @Get('/:projectId')
  @ApiCreatedResponse({
    description: 'Get a specific project by ID',
    type: Project,
  })
  @UseGuards(PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Read, Project))
  @ApiBadRequestResponse({ description: 'Something wrong. Try again!' })
  async findProjectById(@Param('projectId') projectId: string) {
    return await this.projectService.getProjectById(parseInt(projectId));
  }

  @UseInterceptors(CacheInterceptor)
  @CacheTTL(30)
  @Get('/user/:userId')
  @ApiCreatedResponse({
    description: 'Get projects from a certain user; Pagination purpose',
    type: Project,
  })
  @ApiBadRequestResponse({ description: 'Something wrong. Try again!' })
  @UseGuards(PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Read, Project))
  async getProjectsByUser(
    @Param('userId') userId: string,
    @Query('skip') skip = 0,
    @Query('take') take = 10,
  ): Promise<Project[]> {
    take = take > 15 ? 15 : take;
    return await this.projectService.getProjectsByUser(
      parseInt(userId),
      skip,
      take,
    );
  }

  @Put('/:projectId')
  @ApiCreatedResponse({
    description: 'Update a specific project by ID',
    type: Project,
  })
  @ApiBadRequestResponse({ description: 'Something wrong. Try again!' })
  async updateProjectById(
    @Param('projectId') projectId: string,
    @Body() projectUpdate: ProjectRegisterRequestDto,
  ) {
    const update = await this.projectService.updateProjectById(
      parseInt(projectId),
      projectUpdate,
    );
    if (update) {
      const updatedProject = await this.projectService.getProjectById(
        parseInt(projectId),
      );
      await this.cacheManager.set(`api/projects/${projectId}`, updatedProject);
    }
    return update;
  }

  @Delete('/:projectId')
  @ApiCreatedResponse({
    description: 'Delete a specified project',
    type: Boolean,
  })
  @ApiBadRequestResponse({ description: 'Something wrong. Try again!' })
  async deleteProject(@Param('projectId') projectId: string) {
    await this.cacheManager.del(`api/projects/${projectId}`);
    return await this.projectService.deleteProject(parseInt(projectId));
  }
}
