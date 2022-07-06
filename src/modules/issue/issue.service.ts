import { Injectable } from '@nestjs/common';
import { Issue } from './issue.entity';
import { Repository } from 'typeorm';
import {IssueRegisterRequestDto} from './dto/issue-register.req.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { IssueUpdateRequestDto } from './dto/issue-update.req.dto';

@Injectable()
export class IssueService {
  constructor(
    @InjectRepository(Issue) private issueRepo: Repository<Issue>,
  ){}
  async createIssue(
    issueRegister: IssueRegisterRequestDto,
  ): Promise<Issue> {
    return await this.issueRepo.save(issueRegister)
    };

  async getIssuesByProject(projectId:number): Promise<Issue[] | string> {
    try{
      return this.issueRepo.find({
        where : {projectId}
      });
    }catch(err){
      console.log(err);
      return "Project doesnt exist"
    }
  }

  async getIssueById(id: number): Promise<Issue| string> {
    try{
      return this.issueRepo.findOne({ where: { id },relations:["users","comments"] });
    }catch(err){
      console.log(err);
      return "Issue doesn't exist";
    }
  }

  async modifyIssue(id:number,body: IssueUpdateRequestDto): Promise<any> {
    try{
      return await this.issueRepo.update(id,body);
    }catch(err){
      return "Couldnt update the given issue"
      console.log(err.message)
    }
  }
  async deleteIssue(issueId: number): Promise<{deleted: Boolean; message?:string}> {
      try{
        await this.issueRepo.delete({id:issueId});
        return {deleted: true};
    }catch(err){
        return {deleted: false, message: err.message};
    }
  }
}
