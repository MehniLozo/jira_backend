import { Module } from '@nestjs/common';
import { ProjectController } from './project.controller';
import { ProjectService } from './project.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import {Project} from './project.entity';
import appDataSource from '../../config/app-data-source';
@Module({
  imports: [TypeOrmModule.forFeature([Project],appDataSource)],
  providers: [ProjectService],
  controllers: [ProjectController],
  //exports: [ProjectService],
  exports: [TypeOrmModule]
})
export class ProjectModule {}
