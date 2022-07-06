import { Controller, Post, Get, Delete, Put, Res, Req } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Project } from './project.entity';
import { ProjectService } from './project.service';
import { Request, Response } from 'express';

@ApiTags('Project')
@Controller('projects')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post('/project')
  @ApiCreatedResponse({
    description: 'Created project object as response',
    type: Project,
  })
  @ApiBadRequestResponse({ description: 'Project cannot register. Try again!' })
  async createProject(@Req() req: Request, @Res() res: Response): Promise<any> {
    const resultProject = await this.projectService.createProject(req.body);
    return res
      .status(resultProject instanceof Project ? 201 : 405)
      .json(resultProject);
  }

  @Get('/:projectId')
  @ApiCreatedResponse({
    description: 'Get a specific project by ID',
    type: Project,
  })
  @ApiBadRequestResponse({ description: 'Something wrong. Try again!' })
  async findProjectById(@Req() req: Request, @Res() res: Response) {
    const resultProject = await this.projectService.getProjectById(
      parseInt(req.params.projectId),
    );
    res
      .status(resultProject instanceof Project ? 200 : 404)
      .json(resultProject);
  }

  @Put('/:projectId')
  @ApiCreatedResponse({
    description: 'Update a specific project by ID',
    type: Project,
  })
  @ApiBadRequestResponse({ description: 'Something wrong. Try again!' })
  async updateProjectById(@Req() req: Request, @Res() res: Response) {
    const resultProject = await this.projectService.updateProjectById(
      parseInt(req.params.projectId),
      req.body,
    );
    res
      .status(typeof resultProject === 'string' ? 405 : 200)
      .json(resultProject);
  }

  @Delete('/:projectId') //with id param
  @ApiCreatedResponse({
    description: 'Delete a specified project',
    type: Boolean,
  })
  @ApiBadRequestResponse({ description: 'Something wrong. Try again!' })
  async deleteProject(@Req() req: Request, @Res() res: Response) {
    const resultProject = await this.projectService.deleteProject(
      parseInt(req.params.projectId),
    );
    res.status(resultProject.deleted == true ? 200 : 400).json(resultProject);
  }
}
