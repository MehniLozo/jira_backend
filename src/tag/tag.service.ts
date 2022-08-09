import { Injectable } from '@nestjs/common';
import { Tag } from './tag.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TagRegisterRequestDto } from './dto/tag-register.req.dto';
@Injectable()
export class TagService {
  constructor(
    @InjectRepository(Tag) private tagRepo: Repository<Tag>,
  ) {}

  async createTag(
    tagRegister: TagRegisterRequestDto,
  ): Promise<Tag> {
    return await this.tagRepo.save(tagRegister);
  }

  async findAllTags(): Promise <Tag[]>{
    return await this.tagRepo.find({
      select: { id: true , name: true}
    });
  }
}
