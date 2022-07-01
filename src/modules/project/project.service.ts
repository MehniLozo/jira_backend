import { Injectable } from '@nestjs/common';
import { Project } from './project.entity';
import { InjectRepository } from '@nestjs/typeorm';
import {ProjectRegisterRequestDto} from './dto/project-register.req.dto';
import { Repository } from 'typeorm';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project) private projectRepo: Repository<Project>,
  ) {}

  async createProject(
    projectRegister: ProjectRegisterRequestDto,
  ): Promise<Project> {
    return await this.projectRepo.save(projectRegister);
  }
  async getProjectById(id: number): Promise<Project|string> {
    try{
      return await this.projectRepo.findOne({where: {id}});
    }catch(err){
      console.log(err);
      return "Project doesnt exist"
    }
  }
  async updateProjectById(id:number,body: ProjectRegisterRequestDto): Promise<string | any> {
    try{
      return await this.projectRepo.update(id,body);
    }catch(e){
      console.log('Something occured or the project doesn\'t exist')
      return "Project doesnt exist";
    }
  }
  async deleteProject(id: number):Promise<{ deleted: boolean; message?: string }> {
      try{
        await this.projectRepo.delete({id});
        return {deleted: true};
    }catch(err){
      return {deleted:false,message: err.message};
    }

  }
}
