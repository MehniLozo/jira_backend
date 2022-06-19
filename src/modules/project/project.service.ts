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
    /*const project = new Project();
    project.name = projectRegister.name;
    project.url = projectRegister.url;
    project.description = projectRegister.description;
    project.category = projectRegister.category;

    return await project.save();*/
    return await this.projectRepo.create(projectRegister).save();
    //return await AppDataSource.manager.save(project);
  }
  async getProjectById(id: number): Promise<Project | undefined> {
    //can be used for board retrieval aswell aswell
    //return await Project.findOne({ where: { id } });
    return await this.projectRepo.findOne({where: {id}});
  }
    /*
  async modifyProject(user: Project): Promise<Project | undefined> {

  }*/
  async deleteProject(id: number): Promise<any> {
      try{
        await this.projectRepo.delete(id);
    }catch(e){
      console.log("Project doesn't exist");
    }

  }
}
