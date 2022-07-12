import {
  Controller,
  Post,
  Get,
  Delete,
  Put,
  Body,
  Param,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Project } from './project.entity';
import { ProjectService } from './project.service';
import { ProjectRegisterRequestDto } from './dto/project-register.req.dto';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
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
  async createProject(
    @Body() projectRegisterRequestDto: ProjectRegisterRequestDto,
  ): Promise<any> {
    return await this.projectService.createProject(projectRegisterRequestDto);
  }

  @Get('/:projectId')
  @ApiCreatedResponse({
    description: 'Get a specific project by ID',
    type: Project,
  })
  @ApiBadRequestResponse({ description: 'Something wrong. Try again!' })
  async findProjectById(@Param('projectId') projectId: string) {
    return await this.projectService.getProjectById(parseInt(projectId));
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
    return await this.projectService.updateProjectById(
      parseInt(projectId),
      projectUpdate,
    );
  }

  @Delete('/:projectId') //with id param
  @ApiCreatedResponse({
    description: 'Delete a specified project',
    type: Boolean,
  })
  @ApiBadRequestResponse({ description: 'Something wrong. Try again!' })
  async deleteProject(@Param('projectId') projectId: string) {
    return await this.projectService.deleteProject(parseInt(projectId));
  }
}
