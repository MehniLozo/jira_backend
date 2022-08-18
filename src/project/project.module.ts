import { Module } from '@nestjs/common';
import { ProjectController } from './project.controller';
import { ProjectService } from './project.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './project.entity';
import { TagService } from '../tag/tag.service';
import { Tag } from '../tag/tag.entity';
import { User } from 'src/user/user.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Project, Tag, User])],
  providers: [ProjectService, TagService],
  controllers: [ProjectController],
  exports: [TypeOrmModule],
})
export class ProjectModule {}
