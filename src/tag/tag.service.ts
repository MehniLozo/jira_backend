import { Injectable } from '@nestjs/common';
import { Tag } from './tag.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TagRegisterRequestDto } from './dto/tag-register.req.dto';
@Injectable()
export class TagService {
  constructor(@InjectRepository(Tag) private tagRepo: Repository<Tag>) {}

  async createTag(tagRegister: TagRegisterRequestDto | any): Promise<Tag> {
    return await this.tagRepo.save(tagRegister);
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
