import { Injectable } from '@nestjs/common';
import { Project } from './project.entity';
import { InjectRepository } from '@nestjs/typeorm';
import {ProjectRegisterRequestDto} from './dto/project-register.req.dto';
//import {AppDataSource} from '../../config/app-data-source';
import { Repository } from 'typeorm';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project) private projectRepo: Repository<Project>,
  ) {}

  async createProject(
    projectRegister: ProjectRegisterRequestDto,
  ): Promise<Project> {
    return await this.projectRepo.create(projectRegister).save();
  }
  async getProjectById(id: number): Promise<Project | undefined> {

    return await this.projectRepo.findOne({where: {id}});
  }
  async deleteProject(id: number): Promise<any> {
      try{
        await this.projectRepo.delete(id);
    }catch(e){
      console.log("Project doesn't exist");
    }

  }
}
