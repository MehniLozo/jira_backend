import { Injectable } from '@nestjs/common';
import { Project } from './project.entity';

@Injectable()
export class ProjectService {
  async createProject(
    projectRegister: Project,
  ): Promise<Project> {
    const project = new Project();
    project.name = projectRegister.name;
    project.url = projectRegister.url;
    project.description = projectRegister.description;

    return await project.save();
  }
  async getProjects(): Promise<Project[] | undefined> {
    //ops here for returning all the projects
    return undefined;
  }

  async getProjectById(id: number): Promise<Project | undefined> {
    return Project.findOne({ where: { id } });
  }
    /*
  async modifyProject(user: Project): Promise<Project | undefined> {

  }*/
  async deleteProject(id: number): Promise<any> {
      try{
        const targetProject = Project.findOne({where:{id}});
        //ops here for deleting
    }catch(e){
      console.log("Project doesn't exist");
    }

  }
}
