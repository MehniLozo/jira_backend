import { Injectable } from '@nestjs/common';
import { Project } from './project.entity';
import {ProjectRegisterRequestDto} from './dto/project-register.req.dto';
@Injectable()
export class ProjectService {
  async createProject(
    projectRegister: ProjectRegisterRequestDto,
  ): Promise<Project> {
    const project = new Project();
    project.name = projectRegister.name;
    project.url = projectRegister.url;
    project.description = projectRegister.description;
    project.category = projectRegister.category;

    return await project.save();
  }
  async getProjectById(id: number): Promise<Project | undefined> {
    //can be used for board retrieval aswell aswell
    return await Project.findOne({ where: { id } });
  }
    /*
  async modifyProject(user: Project): Promise<Project | undefined> {

  }*/
  async deleteProject(id: number): Promise<any> {
      try{
        const targetProject = await Project.findOne({where:{id}});
        //ops here for deleting
    }catch(e){
      console.log("Project doesn't exist");
    }

  }
}
