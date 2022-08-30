import { Injectable } from '@nestjs/common';
import { Issue } from './issue.entity';
import { Repository } from 'typeorm';
import { IssueRegisterRequestDto } from './dto/issue-register.req.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { IssueUpdateRequestDto } from './dto/issue-update.req.dto';

@Injectable()
export class IssueService {
  constructor(@InjectRepository(Issue) private issueRepo: Repository<Issue>) {}
  async createIssue(issueRegister: IssueRegisterRequestDto): Promise<Issue> {
    return await this.issueRepo.save(issueRegister);
  }

  async getIssueById(id: number): Promise<Issue> {
    return this.issueRepo.findOne({
      where: { id },
      relations: ['users', 'comments', 'comments.user'],
    });
  }

  async getIssuesBySearchTerm(
    searchTerm: string,
    skip: number,
    take: number,
  ): Promise<any> {
    const issues = await this.issueRepo
      .createQueryBuilder()
      .select()
      .where(`MATCH(title) AGAINST ('${searchTerm}*' IN BOOLEAN MODE)`)
      .orWhere(`MATCH(description) AGAINST ('${searchTerm}*' IN BOOLEAN MODE)`)
      .orderBy('updatedAt', 'DESC')
      .skip(skip)
      .take(take)
      .getMany();
    return { issues };
  }

  async modifyIssue(id: number, body: IssueUpdateRequestDto): Promise<any> {
    if (body.userIds) {
      // still facing a misfunctioning when i update the assignees
      const issue: IssueRegisterRequestDto = await this.getIssueById(id);
      issue.userIds = body.userIds;
      return await this.issueRepo.save(issue);
    }
    return await this.issueRepo.update(id, body);
  }
  async deleteIssue(issueId: number): Promise<any> {
    return await this.issueRepo.delete({ id: issueId });
  }
}
