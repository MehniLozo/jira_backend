import { Injectable } from '@nestjs/common';
import { Project } from './project.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ProjectRegisterRequestDto } from './dto/project-register.req.dto';
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
  async getProjectById(id: number): Promise<Project | string> {
    return await this.projectRepo.findOne({
      where: { id },
      relations: ['issues', 'users',"lead","tags"],
    });
  }
  async updateProjectById(
    id: number,
    body: ProjectRegisterRequestDto,
  ): Promise<any> {
    console.log("insidde service duude")
    console.log(body)
    return await this.projectRepo.update(id, body);
  }
  async deleteProject(id: number): Promise<any> {
    return await this.projectRepo.delete({ id });
  }
}
