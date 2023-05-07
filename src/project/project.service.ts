import { Injectable } from '@nestjs/common';
import { Project } from './project.entity';
import { User } from '../user/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ProjectRegisterRequestDto } from './dto/project-register.req.dto';
import { Repository } from 'typeorm';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project) private projectRepo: Repository<Project>,
    @InjectRepository(User) private userRepo: Repository<User>,
  ) {}

  async createProject(
    projectRegister: ProjectRegisterRequestDto,
  ): Promise<Project> {
    const pro = await this.projectRepo.save(projectRegister);
    // console.log(await this.projectRepo.findOne({ where: { id: pro.id } }));
    return pro;
  }
  async getProjectById(id: number): Promise<Project | string> {
    return await this.projectRepo.findOne({
      where: { id },
      relations: ['issues', 'users', 'lead', 'tags'],
    });
  }
  async getProjectsByUser(
    id: number,
    skip: number,
    take: number,
  ): Promise<Project[]> {
    return await this.projectRepo
      .createQueryBuilder('project')
      .leftJoinAndSelect('project.users', 'user')
      .where(`user.id = ${id}`)
      .leftJoinAndSelect('project.tags', 'tag')
      .skip(skip)
      .take(take)
      .getMany();
  }
  async updateProjectById(
    id: number,
    body: ProjectRegisterRequestDto,
  ): Promise<any> {
    return await this.projectRepo.update(id, body);
  }
  async deleteProject(id: number): Promise<any> {
    return await this.projectRepo.delete({ id });
  }
}
