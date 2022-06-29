import {IsNotEmpty} from 'class-validator';
import {IssueType,IssueStatus,IssuePriority} from '../issues.constants';
import {User} from '../../user/user.entity';

export interface IssueRegisterRequestDto{
  description: string,
  priority: IssuePriority,
  projectId: number,
  reporterId: number,
  status: IssueStatus,
  //@IsNotEmpty()
  title:string,
  //@IsNotEmpty()
  type: IssueType,
  userIds: number[],
  users: User[]
}
