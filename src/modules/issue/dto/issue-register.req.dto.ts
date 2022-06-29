import {IsNotEmpty,isObject,IsOptional} from 'class-validator';
import {IssueType,IssueStatus,IssuePriority} from '../issues.constants';
import {User} from '../../user/user.entity';

export class IssueRegisterRequestDto{
  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  priority: IssuePriority;

  @IsNotEmpty()
  projectId: number;

  @IsNotEmpty()
  reporterId: number;

  @IsNotEmpty()
  status: IssueStatus;

  @IsNotEmpty()
  title:string;

  @IsNotEmpty()
  type: IssueType;

  @IsOptional()
  userIds: number[];

  users: User[]
}
