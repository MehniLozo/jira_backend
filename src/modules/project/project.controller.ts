import { Body, Controller, Post,Get,Delete } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Project } from './project.entity';
import { ProjectService } from './project.service';

@ApiTags('Project')
@Controller('projects')
export class ProjectController {
  constructor(private projectService: ProjectService) {}

  @Post('/register')
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

  @Get('/:projectId')
  @ApiCreatedResponse({
    description: 'Get a specific project by ID',
    type: Project,
  })
  @ApiBadRequestResponse({ description: 'Something wrong. Try again!' })
  async findProjectById(
    id:number,
  ): Promise<Project> {
    return await this.projectService.getProjectById(id);
  }

  @Delete('/:projectId') //with id param
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
