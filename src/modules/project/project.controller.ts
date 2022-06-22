import { Body, Controller, Post,Get,Delete,Put } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Project } from './project.entity';
import { ProjectService } from './project.service';
import {ProjectRegisterRequestDto} from './dto/project-register.req.dto';


@ApiTags('Project')
@Controller('projects')
export class ProjectController {
  constructor(private projectService: ProjectService) {}

  @Post('/project')
  @ApiCreatedResponse({
    description: 'Created project object as response',
    type: Project,
  })
  @ApiBadRequestResponse({ description: 'Project cannot register. Try again!' })
  async createProject(
    projectRegister: ProjectRegisterRequestDto,
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
  ): Promise<Project | undefined> {
    return await this.projectService.getProjectById(id);
  }

  @Put('/:projectId')
  @ApiCreatedResponse({
    description: 'Update a specific project by ID',
    type: Project,
  })
  @ApiBadRequestResponse({ description: 'Something wrong. Try again!' })
  async updateProjectById(
    id:number,
    body:ProjectRegisterRequestDto
  ): Promise<Project | undefined> {
    return await this.projectService.updateProjectById(id,body);
  }

  @Delete('/:projectId') //with id param
  @ApiCreatedResponse({
    description: 'Delete a specified project',
    type: Boolean,
  })
  @ApiBadRequestResponse({ description: 'Something wrong. Try again!' })
  async deleteProject(
    id:number,
  ): Promise<{deleted: boolean; message?:string}> {
    return await this.projectService.deleteProject(id);
  }}
