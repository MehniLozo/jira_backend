import { Module } from '@nestjs/common';
import { IssueController } from './issue.controller';
import { IssueService } from './issue.service';

@Module({
  providers: [IssueService],
  controllers: [IssueController],
  exports: [IssueService],
})
export class IssueModule {}
