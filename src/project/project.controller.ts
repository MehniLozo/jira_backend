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
import { TagService } from '../tag/tag.service';
import { ProjectRegisterRequestDto } from './dto/project-register.req.dto';
// import { TagRegisterRequestDto } from '../tag/dto/tag-register.req.dto';
// import { UseGuards } from '@nestjs/common';
// import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

//@UseGuards(JwtAuthGuard)
@ApiTags('Project')
@Controller('projects')
export class ProjectController {
  constructor(
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
    // console.log("projectRegisterRequestDto.newTags")
    // console.log(projectRegisterRequestDto.newTags)
    /* if(projectRegisterRequestDto.newTags.length > 0)
    {
       const newTagsDTOS  = projectRegisterRequestDto.newTags.map((projectName) => ({name: projectName, creatorId: projectRegisterRequestDto.leadId}))
       const newTagsIds = await newTagsDTOS.map(async(tagRegister) => {
        const newTag = await this.tagService.createTag(tagRegister);
        console.log("IDS Inside")
        console.log(newTag.id);
        return newTag.id;
      })
       console.log("new tag ids?")
      // const newTagsIds = [1,2,3];
      // projectRegisterRequestDto.tagIds = [...projectRegisterRequestDto.tagIds,...newTagsIds]
    }
    console.log(projectRegisterRequestDto.tagIds);*/
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

  @Delete('/:projectId')
  @ApiCreatedResponse({
    description: 'Delete a specified project',
    type: Boolean,
  })
  @ApiBadRequestResponse({ description: 'Something wrong. Try again!' })
  async deleteProject(@Param('projectId') projectId: string) {
    return await this.projectService.deleteProject(parseInt(projectId));
  }
}
