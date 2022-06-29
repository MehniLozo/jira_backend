import {IsNotEmpty,isObject,IsOptional} from 'class-validator';
import {IssueType,IssueStatus,IssuePriority} from '../issues.constants';
import {User} from '../../user/user.entity';


export class IssueUpdateRequestDto{
  @IsOptional()
  description?: string;

  @IsOptional()
  priority?: IssuePriority;

  @IsOptional()
  projectId?: number;

  @IsOptional()
  reporterId?: number;

  @IsOptional()
  status?: IssueStatus;

  @IsOptional()
  title?:string;

  @IsOptional()
  type?: IssueType;

  @IsOptional()
  userIds?: number[];

  @IsOptional()
  users?: User[]

  @IsOptional()
  listPosition?: number;

  @IsOptional()
  estimate?: number | null;

  @IsOptional()
  timeRemaining?: number | null;
}
