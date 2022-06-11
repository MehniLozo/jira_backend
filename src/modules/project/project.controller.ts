import { Body, Controller, Post,Get,Delete } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Project } from './project.entity';
import { ProjectService } from './project.service';

@ApiTags('Project')
@Controller('project')
export class ProjectController {
  constructor(private projectService: ProjectService) {}

  @Post('/project/register')
  @ApiCreatedResponse({
    description: 'Created project object as response',
    type: Project,
  })
  @ApiBadRequestResponse({ description: 'Project cannot register. Try again!' })
  async doCreateProject(
    projectRegister: Project,
  ): Promise<Project> {
    return await this.projectService.createProject(projectRegister);
  }

  @Get('/projects')
  @ApiCreatedResponse({
    description: 'List all registered projects',
    type: Project,
  })
  @ApiBadRequestResponse({ description: 'Something wrong. Try again!' })
  async findProjects(
    id:number,
  ): Promise<Project[]> {
    return await this.projectService.getProjects();
  }

  @Delete('/project/:id') //with id param
  @ApiCreatedResponse({
    description: 'Delete a specified project',
    type: Boolean,
  })
  @ApiBadRequestResponse({ description: 'Something wrong. Try again!' })
  async deleteProject(
    id:number,
  ): Promise<Boolean> {
    return await this.projectService.deleteProject(id);
  }}
