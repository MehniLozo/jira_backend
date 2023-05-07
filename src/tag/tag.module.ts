import { Module } from '@nestjs/common';
import { TagController } from './tag.controller';
import { TagService } from './tag.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tag } from './tag.entity';
import { Project } from '../project/project.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Tag, Project])],
  providers: [TagService],
  controllers: [TagController],
  exports: [TypeOrmModule],
})
export class TagModule {}
