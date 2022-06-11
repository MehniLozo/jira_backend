import { Injectable } from '@nestjs/common';
import { Issue } from './issue.entity';

@Injectable()
export class IssueService {
  async createIssue(
    issueRegister: Issue,
  ): Promise<Issue> {
    const issue = new Issue();
    Object.keys(issueRegister).forEach(key=>{
      if(issueRegister !== undefined)
      issue[key]=issueRegister[key]
    });

    return await issue.save();
  }
  async getIssuesByProject(id:number): Promise<Issue[] | undefined> {
    //ops here for returning all the issues
    return undefined;
  }

  async getIssueById(id: number): Promise<Issue | undefined> {
    return Issue.findOne({ where: { id } });
  }
    /*
  async modifyIssue(user: Issue): Promise<Issue | undefined> {

  }*/
  async deleteIssue(id: number): Promise<any> {
      try{
        const targetIssue = Issue.findOne({where:{id}});
        //ops here for deleting
    }catch(e){
      console.log("Issue doesn't exist");
    }
  }
  //Comments operations are gonna be below
}
