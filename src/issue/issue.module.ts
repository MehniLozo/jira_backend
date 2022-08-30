import { Module } from '@nestjs/common';
import { IssueController } from './issue.controller';
import { IssueService } from './issue.service';
import {Issue} from './issue.entity';
import { Repository } from 'typeorm';
import {TypeOrmModule} from '@nestjs/typeorm';

@Module({
  imports:[
    TypeOrmModule.forFeature([
      Issue
    ])
  ],
  // tslint:disable-next-line
  providers: [IssueService,Repository<Issue>],
  controllers: [IssueController],
  exports: [IssueService],
})
export class IssueModule {}
