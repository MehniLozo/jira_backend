import { Injectable } from '@nestjs/common';
import { Tag } from './tag.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TagRegisterRequestDto } from './dto/tag-register.req.dto';
import { Project } from 'src/project/project.entity';
@Injectable()
export class TagService {
  constructor(
    @InjectRepository(Tag) private tagRepo: Repository<Tag>,
    @InjectRepository(Project) private projectRepo: Repository<Project>,
  ) {}

  async createTag(tagRegister: TagRegisterRequestDto | any): Promise<Tag> {
    const existingTag = await this.tagRepo.findOne({
      where: { name: tagRegister.name },
    });
    const project = await this.projectRepo.findOne({
      where: { id: tagRegister.projectId },
    });
    if (existingTag) {
      await this.tagRepo
        .createQueryBuilder()
        .relation(Tag, 'projects')
        .of(existingTag)
        .add(project);
      return;
    }

    tagRegister.projects = [project];
    const tag = await this.tagRepo.save(tagRegister);
    return tag;
  }

  async findAllTags(): Promise<Tag[]> {
    return await this.tagRepo.find({
      select: { name: true },
    });
  }
  async deleteTag(tagId: number): Promise<any> {
    return await this.tagRepo.delete({
      id: tagId,
    });
  }
}
